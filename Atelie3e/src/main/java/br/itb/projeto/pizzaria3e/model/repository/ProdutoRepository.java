package br.itb.projeto.pizzaria3e.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.pizzaria3e.model.entity.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	
	List<Produto> findByTipo(String tipo);
	List<Produto> findByCategoriaId(Long categoriaId);
}
