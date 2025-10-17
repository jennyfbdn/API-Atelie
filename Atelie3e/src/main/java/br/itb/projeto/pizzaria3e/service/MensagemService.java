package br.itb.projeto.pizzaria3e.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria3e.model.entity.Categoria;
import br.itb.projeto.pizzaria3e.model.entity.Mensagem;
import br.itb.projeto.pizzaria3e.model.repository.MensagemRepository;
import jakarta.transaction.Transactional;

@Service
public class MensagemService {

	private MensagemRepository mensagemRepository;
	// Source -> Generate Constructor using Fields...

	public MensagemService(MensagemRepository mensagemRepository) {
		super();
		this.mensagemRepository = mensagemRepository;
	}

	public Mensagem findById(long id) {
		Optional<Mensagem> mensagem = mensagemRepository.findById(id);

		if (mensagem.isPresent()) {
			return mensagem.get();
		}
		return null;
	}

	public List<Mensagem> findAll() {
		List<Mensagem> mensagens = mensagemRepository.findAll();
		return mensagens;
	}
	
	@Transactional
	public Mensagem save(Mensagem mensagem) {
		
		mensagem.setDataMensagem(LocalDateTime.now());
		mensagem.setStatusMensagem("ATIVO");
		
		return mensagemRepository.save(mensagem); 
	}
	

}













