package br.itb.projeto.pizzaria3e.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.pizzaria3e.model.entity.Produto;
import br.itb.projeto.pizzaria3e.rest.exception.ResourceNotFoundException;
import br.itb.projeto.pizzaria3e.rest.response.MessageResponse;
import br.itb.projeto.pizzaria3e.service.ProdutoService;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

	private ProdutoService produtoService;
	//Source -> Generate Constructor using Fields...
	
	public ProdutoController(ProdutoService produtoService) {
		super();
		this.produtoService = produtoService;
	}
	
	@GetMapping("/test")
	public String getTest() {
		return "Olá, Produto!";
	}
	
	@GetMapping("/findById/{id}")
	public ResponseEntity<Produto> findById(@PathVariable long id){
		
		Produto produto = produtoService.findById(id);
		
		if(produto != null) {
			return new ResponseEntity<Produto>(produto, HttpStatus.OK);
		} else {
			throw new ResourceNotFoundException("Produto não encontrado!");
		}
	}
	
	@GetMapping("/findAll")
	public ResponseEntity<List<Produto>> findAll(){
		
		List<Produto> produtos = produtoService.findAll();
		
		return new ResponseEntity<List<Produto>>(produtos, HttpStatus.OK);
	}
	
	@GetMapping("/findByTipo/{tipo}")
	public ResponseEntity<List<Produto>> findByTipo(@PathVariable String tipo){
		
		List<Produto> produtos = produtoService.findByTipo(tipo);
		
		return new ResponseEntity<List<Produto>>(produtos, HttpStatus.OK);
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Produto produto) {
		Produto _produto = produtoService.save(produto);
		
		if(_produto != null) {
			return ResponseEntity.ok().body("Produto cadastrado com sucesso!");
		}
		
		throw new ResourceNotFoundException("Erro ao cadastrar produto!");
	}
	
	@PostMapping("/createComFoto")
	public ResponseEntity<?> createComFoto(
			@RequestParam(required = false) MultipartFile file,
			@ModelAttribute Produto produto) {

		produtoService.createComFoto(file, produto);

		return ResponseEntity.ok()
				.body(new MessageResponse("Produto cadastrado com sucesso!"));
	}
}
