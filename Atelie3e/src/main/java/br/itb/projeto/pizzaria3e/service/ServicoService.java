package br.itb.projeto.pizzaria3e.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria3e.model.entity.Servico;
import br.itb.projeto.pizzaria3e.model.repository.ServicoRepository;
import br.itb.projeto.pizzaria3e.model.repository.UsuarioRepository;

@Service
public class ServicoService {
	
	private ServicoRepository servicoRepository;
	private UsuarioRepository usuarioRepository;
	
	public ServicoService(ServicoRepository servicoRepository, UsuarioRepository usuarioRepository) {
		super();
		this.servicoRepository = servicoRepository;
		this.usuarioRepository = usuarioRepository;
	}

	public Servico findById(long id) {
		Optional<Servico> servico = servicoRepository.findById(id);

		if (servico.isPresent()) {
			return servico.get();
		}
		return null;
	}
	
	public List<Servico> findAll(){
		List<Servico> servicos = servicoRepository.findAll();
		return servicos;
	}
	
	public Servico save(Servico servico) {
		servico.setStatusServico("ATIVO");
		return servicoRepository.save(servico);
	}
	
	public Servico update(long id, Servico servicoAtualizado) {
		Optional<Servico> servicoExistente = servicoRepository.findById(id);
		
		if (servicoExistente.isPresent()) {
			Servico servico = servicoExistente.get();
			servico.setNome(servicoAtualizado.getNome());
			servico.setDescricao(servicoAtualizado.getDescricao());
			servico.setPreco(servicoAtualizado.getPreco());
			
			return servicoRepository.save(servico);
		}
		
		return null;
	}
}
