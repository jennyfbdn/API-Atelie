package br.itb.projeto.pizzaria3e.rest.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.pizzaria3e.model.entity.Usuario;
import br.itb.projeto.pizzaria3e.rest.exception.ResourceNotFoundException;
import br.itb.projeto.pizzaria3e.service.UsuarioService;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	private UsuarioService usuarioService;
	//Source -> Generate Constructor using Fields...
	
	public UsuarioController(UsuarioService usuarioService) {
		super();
		this.usuarioService = usuarioService;
	}
	
	@GetMapping("/test")
	public String getTest() {
		return "Olá, Usuario!";
	}
	
	@PostMapping("/testCreate")
	public ResponseEntity<?> testCreate(@RequestBody Usuario usuario) {
		System.out.println("=== TESTE CADASTRO ===");
		System.out.println("Nome: " + usuario.getNome());
		System.out.println("Email: " + usuario.getEmail());
		System.out.println("Telefone: " + usuario.getTelefone());
		
		Usuario _usuario = usuarioService.save(usuario);
		
		if(_usuario != null) {
			System.out.println("Usuário salvo com ID: " + _usuario.getId());
			return ResponseEntity.ok().body("Usuário cadastrado com sucesso! ID: " + _usuario.getId());
		}
		
		System.out.println("Falha ao salvar usuário");
		return ResponseEntity.badRequest().body("Erro ao cadastrar usuário");
	}
	
	@GetMapping("/findById/{id}")
	public ResponseEntity<Usuario> findById(@PathVariable long id){
		
		Usuario usuario = usuarioService.findById(id);
		
		if(usuario != null) {
			return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
		} else {
			throw new ResourceNotFoundException("Usuário não encontrado!");
		}
	}
	
	@GetMapping("/findAll")
	public ResponseEntity<List<Usuario>> findAll(){
		
		List<Usuario> usuarios = usuarioService.findAll();
		
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
		
	}
	
	
	@PostMapping("/create")
	public ResponseEntity<?> save(@RequestBody Usuario usuario) {

		Usuario _usuario = usuarioService.save(usuario);
		
		if(_usuario != null) {
			return ResponseEntity.ok().body("Usuário cadastrado com sucesso!");
		}
		
		throw new ResourceNotFoundException("Usuário já cadastrado!");
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Usuario usuario) {
		
		Usuario _usuario = usuarioService.login(usuario.getEmail(), usuario.getSenha());
		
		if(_usuario != null) {
			return ResponseEntity.ok().body(_usuario);
		}
		
		throw new ResourceNotFoundException("Dados Incorretos!");
	}
	
	@PutMapping("/alterarSenha/{id}")
	public ResponseEntity<?> alterarSenha(@PathVariable long id, @RequestBody Usuario usuario) {
		
		Usuario _usuario = usuarioService.alterarSenha(id, usuario);
		
		if(_usuario != null) {
			return ResponseEntity.ok().body("Senha alterada com sucesso!");
		}
		
		throw new ResourceNotFoundException("Erro ao alterar a senha!");
	}
	
	@PutMapping("/inativar/{id}")
	public ResponseEntity<?> inativar(@PathVariable long id) {
		
		Usuario _usuario = usuarioService.inativar(id);
		
		if(_usuario != null) {
			return ResponseEntity.ok().body("Conta de usuário inativada com sucesso!");
		}
		
		throw new ResourceNotFoundException("Erro ao inativar a conta de usuário!");
	}
	
	@PutMapping("/reativar/{id}")
	public ResponseEntity<?> reativar(@PathVariable long id) {
		
		Usuario _usuario = usuarioService.reativar(id);
		
		if(_usuario != null) {
			return ResponseEntity.ok().body("Conta de usuário ativada com sucesso!");
		}
		
		throw new ResourceNotFoundException("Erro ao ativar a conta de usuário!");
	}
	
	@PostMapping("/verificarPergunta")
	public ResponseEntity<?> verificarPergunta(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		
		Usuario usuario = usuarioService.findByEmail(email);
		
		if(usuario != null) {
			return ResponseEntity.ok().body(Map.of("pergunta", usuario.getPerguntaSeguranca() != null ? usuario.getPerguntaSeguranca() : "Qual o nome da sua mãe?"));
		}
		
		return ResponseEntity.badRequest().body("Email não encontrado");
	}
	
	@PostMapping("/validarResposta")
	public ResponseEntity<?> validarResposta(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String resposta = request.get("resposta");
		
		boolean valido = usuarioService.validarResposta(email, resposta);
		
		if(valido) {
			return ResponseEntity.ok().body("Resposta correta");
		}
		
		return ResponseEntity.badRequest().body("Resposta incorreta");
	}
	
	@PostMapping("/enviarCodigoSms")
	public ResponseEntity<?> enviarCodigoSms(@RequestBody Map<String, String> request) {
		String telefone = request.get("telefone");
		
		boolean enviado = usuarioService.enviarCodigoSms(telefone);
		
		if(enviado) {
			return ResponseEntity.ok().body("Código enviado por SMS");
		}
		
		return ResponseEntity.badRequest().body("Telefone não encontrado");
	}
	
	@PostMapping("/validarCodigoSms")
	public ResponseEntity<?> validarCodigoSms(@RequestBody Map<String, String> request) {
		String telefone = request.get("telefone");
		String codigo = request.get("codigo");
		
		boolean valido = usuarioService.validarCodigoSms(telefone, codigo);
		
		if(valido) {
			return ResponseEntity.ok().body("Código válido");
		}
		
		return ResponseEntity.badRequest().body("Código inválido");
	}
	
	@PostMapping("/resetSenhaSms")
	public ResponseEntity<?> resetSenhaSms(@RequestBody Map<String, String> request) {
		String telefone = request.get("telefone");
		String codigo = request.get("codigo");
		String novaSenha = request.get("novaSenha");
		
		Usuario usuario = usuarioService.resetSenhaSms(telefone, codigo, novaSenha);
		
		if(usuario != null) {
			return ResponseEntity.ok().body("Senha alterada com sucesso!");
		}
		
		throw new ResourceNotFoundException("Erro ao alterar senha!");
	}
	
	@PostMapping("/enviarCodigo")
	public ResponseEntity<?> enviarCodigo(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		
		boolean enviado = usuarioService.enviarCodigoRecuperacao(email);
		
		if(enviado) {
			return ResponseEntity.ok().body("Código enviado para o e-mail");
		}
		
		return ResponseEntity.badRequest().body("Erro ao enviar código");
	}
	
	@PostMapping("/validarCodigo")
	public ResponseEntity<?> validarCodigo(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String codigo = request.get("codigo");
		
		boolean valido = usuarioService.validarCodigo(email, codigo);
		
		if(valido) {
			return ResponseEntity.ok().body("Código válido");
		}
		
		return ResponseEntity.badRequest().body("Código inválido ou expirado");
	}
	
	@PostMapping("/resetSenha")
	public ResponseEntity<?> resetSenha(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String codigo = request.get("codigo");
		String novaSenha = request.get("novaSenha");
		
		Usuario usuario = usuarioService.resetSenha(email, codigo, novaSenha);
		
		if(usuario != null) {
			return ResponseEntity.ok().body("Senha redefinida com sucesso!");
		}
		
		throw new ResourceNotFoundException("Erro ao redefinir senha!");
	}
	
	
	@PostMapping("/testeEmail")
	public ResponseEntity<?> testeEmail(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		
		if (email == null || email.isEmpty()) {
			return ResponseEntity.badRequest().body("Email é obrigatório");
		}
		
		boolean enviado = usuarioService.enviarCodigoRecuperacao(email);
		
		if (enviado) {
			return ResponseEntity.ok().body("Email de teste enviado com sucesso!");
		}
		
		return ResponseEntity.badRequest().body("Erro ao enviar email de teste");
	}

}




