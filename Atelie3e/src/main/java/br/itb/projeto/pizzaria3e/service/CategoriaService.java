package br.itb.projeto.pizzaria3e.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria3e.model.entity.Categoria;
import br.itb.projeto.pizzaria3e.model.repository.CategoriaRepository;
import jakarta.transaction.Transactional;

@Service
public class CategoriaService {
	
	private CategoriaRepository categoriaRepository;
	//Source -> Generate Constructor using Fields...

	public CategoriaService(CategoriaRepository categoriaRepository) {
		super();
		this.categoriaRepository = categoriaRepository;
	}
	
	public Categoria findById(long id) {
		
		Optional<Categoria> categoria = categoriaRepository.findById(id);
		
		if(categoria.isPresent()) {
			return categoria.get();
		}
		return null;
	}
	
	public List<Categoria> findAll(){
		List<Categoria> categorias = categoriaRepository.findAll();
		return categorias;
	}
	
	@Transactional
	public Categoria save(Categoria categoria) {
		Categoria _categoria = categoriaRepository.save(categoria);
		return _categoria;
	}
	
	@Transactional
	public void initDefaultCategorias() {
		if (categoriaRepository.count() == 0) {
			Categoria geral = new Categoria();
			geral.setNome("Geral");
			geral.setIcone("📦");
			categoriaRepository.save(geral);
			
			Categoria feminino = new Categoria();
			feminino.setNome("Feminino");
			feminino.setIcone("👗");
			categoriaRepository.save(feminino);
			
			Categoria masculino = new Categoria();
			masculino.setNome("Masculino");
			masculino.setIcone("👔");
			categoriaRepository.save(masculino);
		}
	}

}







