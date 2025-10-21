package br.itb.projeto.pizzaria3e.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.pizzaria3e.model.entity.Servico;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {

}
