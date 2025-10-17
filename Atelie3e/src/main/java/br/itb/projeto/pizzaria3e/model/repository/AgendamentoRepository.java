package br.itb.projeto.pizzaria3e.model.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import br.itb.projeto.pizzaria3e.model.entity.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByUsuarioId(Long usuarioId);
}