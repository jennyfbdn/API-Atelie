package br.itb.projeto.pizzaria3e.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.pizzaria3e.model.entity.Categoria;
import br.itb.projeto.pizzaria3e.model.entity.Produto;
import br.itb.projeto.pizzaria3e.model.repository.CategoriaRepository;
import br.itb.projeto.pizzaria3e.model.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

@Service
public class ProdutoService {
	
	private ProdutoRepository produtoRepository;
	private CategoriaRepository categoriaRepository;
		
	public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository) {
		super();
		this.produtoRepository = produtoRepository;
		this.categoriaRepository = categoriaRepository;
	}

	public Produto findById(long id) {
		Optional<Produto> produto = produtoRepository.findById(id);

		if (produto.isPresent()) {
			return produto.get();
		}
		return null;
	}
	
	public List<Produto> findAll(){
		List<Produto> produtos = produtoRepository.findAll();
		return produtos;
	}
	
	public List<Produto> findByTipo(String tipo){
		
		List<Produto> produtos = produtoRepository.findByTipo(tipo);
		
		return produtos;
	}
	
	@Transactional
	public Produto save(Produto produto) {
		produto.setStatusProduto("ATIVO");
		return produtoRepository.save(produto);
	}
	
	@Transactional
	public Produto createComFoto(MultipartFile file, Produto produto) {
		
		if (file != null && file.getSize() > 0) {
			try {
				produto.setFoto(file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			produto.setFoto(null);
		}
		produto.setStatusProduto("ATIVO");
		
		return produtoRepository.save(produto);
	}
}
