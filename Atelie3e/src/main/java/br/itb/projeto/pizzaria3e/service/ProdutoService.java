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
		
		// Se não tem categoria, cria uma padrão
		if (produto.getCategoria() == null) {
			try {
				Optional<Categoria> categoriaDefault = categoriaRepository.findById(1L);
				if (categoriaDefault.isPresent()) {
					produto.setCategoria(categoriaDefault.get());
				} else {
					// Cria categoria padrão se não existir
					Categoria novaCategoria = new Categoria();
					novaCategoria.setNome("Geral");
					novaCategoria.setIcone("📦");
					Categoria categoriaSalva = categoriaRepository.save(novaCategoria);
					produto.setCategoria(categoriaSalva);
				}
			} catch (Exception e) {
				// Se falhar, deixa sem categoria por enquanto
				e.printStackTrace();
			}
		}
		
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
		
		// Se não tem categoria, define uma padrão
		if (produto.getCategoria() == null) {
			Optional<Categoria> categoriaDefault = categoriaRepository.findById(1L);
			if (categoriaDefault.isPresent()) {
				produto.setCategoria(categoriaDefault.get());
			}
		}
		
		return produtoRepository.save(produto);
	}
	
	@Transactional
	public Produto update(long id, Produto produtoAtualizado) {
		Optional<Produto> produtoExistente = produtoRepository.findById(id);
		
		if (produtoExistente.isPresent()) {
			Produto produto = produtoExistente.get();
			produto.setNome(produtoAtualizado.getNome());
			produto.setTipo(produtoAtualizado.getTipo());
			produto.setDescricao(produtoAtualizado.getDescricao());
			produto.setCodigoBarras(produtoAtualizado.getCodigoBarras());
			produto.setPreco(produtoAtualizado.getPreco());
			
			if (produtoAtualizado.getCategoria() != null) {
				produto.setCategoria(produtoAtualizado.getCategoria());
			}
			
			return produtoRepository.save(produto);
		}
		
		return null;
	}
	
	@Transactional
	public Produto updateComFoto(long id, MultipartFile file, Produto produtoAtualizado) {
		Optional<Produto> produtoExistente = produtoRepository.findById(id);
		
		if (produtoExistente.isPresent()) {
			Produto produto = produtoExistente.get();
			produto.setNome(produtoAtualizado.getNome());
			produto.setTipo(produtoAtualizado.getTipo());
			produto.setDescricao(produtoAtualizado.getDescricao());
			produto.setCodigoBarras(produtoAtualizado.getCodigoBarras());
			produto.setPreco(produtoAtualizado.getPreco());
			
			if (produtoAtualizado.getCategoria() != null) {
				produto.setCategoria(produtoAtualizado.getCategoria());
			} else if (produto.getCategoria() == null) {
				// Se não tem categoria, define uma padrão
				Optional<Categoria> categoriaDefault = categoriaRepository.findById(1L);
				if (categoriaDefault.isPresent()) {
					produto.setCategoria(categoriaDefault.get());
				}
			}
			
			// Atualiza foto se fornecida
			if (file != null && file.getSize() > 0) {
				try {
					produto.setFoto(file.getBytes());
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
			return produtoRepository.save(produto);
		}
		
		return null;
	}
}
