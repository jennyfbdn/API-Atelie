package br.itb.projeto.pizzaria3e.service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria3e.model.entity.Usuario;
import br.itb.projeto.pizzaria3e.model.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService {

	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private SmsService smsService;
	
	// Armazenar códigos temporariamente (em produção usar Redis)
	private Map<String, String> codigosRecuperacao = new HashMap<>();
	private Map<String, LocalDateTime> expiracaoCodigos = new HashMap<>();

	public UsuarioService(UsuarioRepository usuarioRepository) {
		super();
		this.usuarioRepository = usuarioRepository;
	}

	public Usuario findById(long id) {
		Optional<Usuario> usuario = usuarioRepository.findById(id);

		if (usuario.isPresent()) {
			return usuario.get();
		}
		return null;
	}

	public List<Usuario> findAll() {
		List<Usuario> usuarios = usuarioRepository.findAll();
		return usuarios;
	}

	@Transactional
	public Usuario save(Usuario usuario) {
		Usuario _usuario = usuarioRepository.findByEmail(usuario.getEmail());
		if (_usuario == null) {
			String senha = Base64.getEncoder().encodeToString(usuario.getSenha().getBytes());

			usuario.setSenha(senha);
			usuario.setDataCadastro(LocalDateTime.now());
			usuario.setNivelAcesso("USER");
			usuario.setStatusUsuario("ATIVO");
			// Define endereço padrão se não fornecido
			if (usuario.getEndereco() == null || usuario.getEndereco().isEmpty()) {
				usuario.setEndereco("Não informado");
			}
			return usuarioRepository.save(usuario);
		}
		return null;
	}

	@Transactional
	public Usuario login(String email, String senha) {
		Usuario _usuario = usuarioRepository.findByEmail(email);

		if (_usuario != null) {
			if (_usuario.getStatusUsuario().equals("ATIVO")) {
				byte[] decodedPass = Base64.getDecoder()
											.decode(_usuario.getSenha());
				
				if (new String(decodedPass).equals(senha)) {
					return _usuario;
				}
			}
		}
		return null;
	}
	
	@Transactional
	public Usuario alterarSenha(long id, Usuario usuario) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);
		
		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
			String senha = Base64.getEncoder()
					.encodeToString(usuario.getSenha().getBytes());
				
			usuarioAtualizado.setSenha(senha);
			usuarioAtualizado.setDataCadastro(LocalDateTime.now());
			usuarioAtualizado.setStatusUsuario("ATIVO");
			
			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}
	
	@Transactional
	public Usuario inativar(long id) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);
		
		String senhaPadrao = "12345678";
		
		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
			String senha = Base64.getEncoder()
					.encodeToString(senhaPadrao.getBytes());
				
			usuarioAtualizado.setSenha(senha);
			usuarioAtualizado.setDataCadastro(LocalDateTime.now());
			usuarioAtualizado.setStatusUsuario("INATIVO");
			
			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}
	
	@Transactional
	public Usuario reativar(long id) {
		Optional<Usuario> _usuario = usuarioRepository.findById(id);
		
		String senhaPadrao = "12345678";
		
		if (_usuario.isPresent()) {
			Usuario usuarioAtualizado = _usuario.get();
			String senha = Base64.getEncoder()
					.encodeToString(senhaPadrao.getBytes());
				
			usuarioAtualizado.setSenha(senha);
			usuarioAtualizado.setDataCadastro(LocalDateTime.now());
			usuarioAtualizado.setStatusUsuario("ATIVO");
			
			return usuarioRepository.save(usuarioAtualizado);
		}
		return null;
	}
	
	public Usuario findByEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}
	
	public boolean enviarCodigoRecuperacao(String email) {
		Usuario usuario = usuarioRepository.findByEmail(email);
		
		if (usuario != null) {
			String codigo = gerarCodigo();
			codigosRecuperacao.put(email, codigo);
			expiracaoCodigos.put(email, LocalDateTime.now().plusMinutes(10));
			
			try {
				emailService.enviarCodigoRecuperacao(email, codigo);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}
	
	public boolean enviarCodigoSms(String telefone) {
		Usuario usuario = usuarioRepository.findByTelefone(telefone);
		
		if (usuario != null) {
			String codigo = gerarCodigo();
			codigosRecuperacao.put(telefone, codigo);
			expiracaoCodigos.put(telefone, LocalDateTime.now().plusMinutes(10));
			
			try {
				smsService.enviarCodigoSms(telefone, codigo);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}
	
	public boolean validarCodigoSms(String telefone, String codigo) {
		String codigoArmazenado = codigosRecuperacao.get(telefone);
		LocalDateTime expiracao = expiracaoCodigos.get(telefone);
		
		if (codigoArmazenado != null && expiracao != null) {
			if (LocalDateTime.now().isBefore(expiracao) && codigoArmazenado.equals(codigo)) {
				return true;
			}
		}
		return false;
	}
	
	@Transactional
	public Usuario resetSenhaSms(String telefone, String codigo, String novaSenha) {
		if (validarCodigoSms(telefone, codigo)) {
			Usuario usuario = usuarioRepository.findByTelefone(telefone);
			
			if (usuario != null) {
				String senha = Base64.getEncoder().encodeToString(novaSenha.getBytes());
				usuario.setSenha(senha);
				usuario.setDataCadastro(LocalDateTime.now());
				
				codigosRecuperacao.remove(telefone);
				expiracaoCodigos.remove(telefone);
				
				return usuarioRepository.save(usuario);
			}
		}
		return null;
	}
	
	public boolean validarCodigo(String email, String codigo) {
		String codigoArmazenado = codigosRecuperacao.get(email);
		LocalDateTime expiracao = expiracaoCodigos.get(email);
		
		if (codigoArmazenado != null && expiracao != null) {
			if (LocalDateTime.now().isBefore(expiracao) && codigoArmazenado.equals(codigo)) {
				return true;
			}
		}
		return false;
	}
	
	@Transactional
	public Usuario resetSenha(String email, String codigo, String novaSenha) {
		if (validarCodigo(email, codigo)) {
			Usuario usuario = usuarioRepository.findByEmail(email);
			
			if (usuario != null) {
				String senha = Base64.getEncoder().encodeToString(novaSenha.getBytes());
				usuario.setSenha(senha);
				usuario.setDataCadastro(LocalDateTime.now());
				
				// Limpar código usado
				codigosRecuperacao.remove(email);
				expiracaoCodigos.remove(email);
				
				return usuarioRepository.save(usuario);
			}
		}
		return null;
	}
	
	public boolean validarResposta(String email, String resposta) {
		Usuario usuario = usuarioRepository.findByEmail(email);
		
		if (usuario != null && usuario.getRespostaSeguranca() != null) {
			return usuario.getRespostaSeguranca().equalsIgnoreCase(resposta.trim());
		}
		return false;
	}
	
	@Transactional
	public Usuario editarUsuario(long id, Usuario dadosAtualizados) {
		Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);

		if (optionalUsuario.isPresent()) {
			Usuario usuarioExistente = optionalUsuario.get();

			// Atualizar campos permitidos
			usuarioExistente.setNome(dadosAtualizados.getNome());
			usuarioExistente.setTelefone(dadosAtualizados.getTelefone());
			usuarioExistente.setEmail(dadosAtualizados.getEmail());
			usuarioExistente.setRespostaSeguranca(dadosAtualizados.getRespostaSeguranca());

			// Não atualizar senha ou status aqui!

			return usuarioRepository.save(usuarioExistente);
		}

		return null;
	}

	
	@Transactional
	public Usuario resetSenhaSimples(String email, String resposta, String novaSenha) {
		if (validarResposta(email, resposta)) {
			Usuario usuario = usuarioRepository.findByEmail(email);
			
			if (usuario != null) {
				String senha = Base64.getEncoder().encodeToString(novaSenha.getBytes());
				usuario.setSenha(senha);
				usuario.setDataCadastro(LocalDateTime.now());
				
				return usuarioRepository.save(usuario);
			}
		}
		return null;
	}
	
	private String gerarCodigo() {
		Random random = new Random();
		return String.format("%06d", random.nextInt(1000000));
	}

}

















