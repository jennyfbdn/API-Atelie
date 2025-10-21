package br.itb.projeto.pizzaria3e.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.pizzaria3e.model.entity.Servico;
import br.itb.projeto.pizzaria3e.rest.exception.ResourceNotFoundException;
import br.itb.projeto.pizzaria3e.service.ServicoService;

@RestController
@RequestMapping("/servico")
public class ServicoController {

	private ServicoService servicoService;
	//Source -> Generate Constructor using Fields...
	
	public ServicoController(ServicoService servicoService) {
		super();
		this.servicoService = servicoService;
	}
	
	@GetMapping("/test")
	public String getTest() {
		return "Olá, Servico!";
	}
	
	@GetMapping("/findById/{id}")
	public ResponseEntity<Servico> findById(@PathVariable long id){
		
		Servico servico = servicoService.findById(id);
		
		if(servico != null) {
			return new ResponseEntity<Servico>(servico, HttpStatus.OK);
		} else {
			throw new ResourceNotFoundException("Serviço não encontrado!");
		}
	}
	
	@GetMapping("/findAll")
	public ResponseEntity<List<Servico>> findAll(){
		
		List<Servico> servicos = servicoService.findAll();
		
		return new ResponseEntity<List<Servico>>(servicos, HttpStatus.OK);
	}
	
}
