package br.itb.projeto.pizzaria3e.service;

import java.util.List;
import org.springframework.stereotype.Service;
import br.itb.projeto.pizzaria3e.model.entity.Agendamento;
import br.itb.projeto.pizzaria3e.model.repository.AgendamentoRepository;

@Service
public class AgendamentoService {
    
    private AgendamentoRepository agendamentoRepository;
    
    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }
    
    public Agendamento save(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }
    
    public Agendamento confirmarAgendamento(Long agendamentoId) {
        Agendamento agendamento = agendamentoRepository.findById(agendamentoId).orElse(null);
        if (agendamento != null) {
            agendamento.setStatus("CONFIRMADO");
            agendamento = agendamentoRepository.save(agendamento);
        }
        return agendamento;
    }
    
    public List<Agendamento> findAll() {
        return agendamentoRepository.findAll();
    }
    
    public List<Agendamento> findByUsuarioId(Long usuarioId) {
        return agendamentoRepository.findByUsuarioId(usuarioId);
    }
}