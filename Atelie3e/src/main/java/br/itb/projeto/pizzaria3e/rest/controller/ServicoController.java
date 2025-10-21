package br.itb.projeto.pizzaria3e.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.pizzaria3e.model.entity.Servico;
import br.itb.projeto.pizzaria3e.rest.exception.ResourceNotFoundException;
import br.itb.projeto.pizzaria3e.service.ServicoService;

@RestController
@RequestMapping("/servico")
@CrossOrigin(origins = "*")
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
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Servico servico) {
		Servico _servico = servicoService.save(servico);
		
		if(_servico != null) {
			return ResponseEntity.ok().body("Serviço cadastrado com sucesso!");
		}
		
		throw new ResourceNotFoundException("Erro ao cadastrar serviço!");
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> update(@PathVariable long id, @RequestBody Servico servico) {
		Servico _servico = servicoService.update(id, servico);
		
		if(_servico != null) {
			return ResponseEntity.ok().body("Serviço atualizado com sucesso!");
		}
		
		throw new ResourceNotFoundException("Erro ao atualizar serviço!");
	}
	
}
