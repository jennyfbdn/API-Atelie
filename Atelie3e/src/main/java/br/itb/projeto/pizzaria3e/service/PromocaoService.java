package br.itb.projeto.pizzaria3e.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.pizzaria3e.model.entity.Promocao;
import br.itb.projeto.pizzaria3e.model.repository.PromocaoRepository;
import br.itb.projeto.pizzaria3e.model.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class PromocaoService {
	
	private PromocaoRepository promocaoRepository;
	private UsuarioRepository usuarioRepository;
		
	public PromocaoService(PromocaoRepository promocaoRepository, UsuarioRepository usuarioRepository) {
		super();
		this.promocaoRepository = promocaoRepository;
		this.usuarioRepository = usuarioRepository;
	}

	public Promocao findById(long id) {
		Optional<Promocao> promocao = promocaoRepository.findById(id);

		if (promocao.isPresent()) {
			return promocao.get();
		}
		return null;
	}
	
	public List<Promocao> findAll(){
		List<Promocao> promocoes = promocaoRepository.findAll();
		return promocoes;
	}
	
	@Transactional
	public Promocao createComFoto(MultipartFile file, Promocao promocao) {
		
		if (file != null && file.getSize() > 0) {
			try {
				promocao.setFoto(file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			promocao.setFoto(null);
		}
		promocao.setDataCadastro(LocalDateTime.now());
		promocao.setStatusPromocao("ATIVO");
		
		return promocaoRepository.save(promocao);
	}
}
