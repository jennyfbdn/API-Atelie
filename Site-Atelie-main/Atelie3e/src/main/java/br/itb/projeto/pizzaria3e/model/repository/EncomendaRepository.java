package br.itb.projeto.pizzaria3e.model.repository;

import br.itb.projeto.pizzaria3e.model.entity.Encomenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EncomendaRepository extends JpaRepository<Encomenda, Long> {
    List<Encomenda> findByUsuarioId(Long usuarioId);
}