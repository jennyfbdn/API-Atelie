package br.itb.projeto.pizzaria3e.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria3e.model.entity.Encomenda;
import br.itb.projeto.pizzaria3e.model.repository.EncomendaRepository;

@Service
public class EncomendaService {
    
    private EncomendaRepository encomendaRepository;
    
    public EncomendaService(EncomendaRepository encomendaRepository) {
        this.encomendaRepository = encomendaRepository;
    }
    
    public Encomenda save(Encomenda encomenda) {
        return encomendaRepository.save(encomenda);
    }
    
    public Encomenda marcarComoPronta(Long encomendaId) {
        Encomenda encomenda = encomendaRepository.findById(encomendaId).orElse(null);
        if (encomenda != null) {
            encomenda.setStatus("PRONTA");
            encomenda = encomendaRepository.save(encomenda);
        }
        return encomenda;
    }
    
    public List<Encomenda> findAll() {
        return encomendaRepository.findAll();
    }
    
    public List<Encomenda> findByUsuarioId(Long usuarioId) {
        return encomendaRepository.findByUsuarioId(usuarioId);
    }
}