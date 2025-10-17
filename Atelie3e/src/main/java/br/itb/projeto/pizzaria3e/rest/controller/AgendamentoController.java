package br.itb.projeto.pizzaria3e.rest.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.itb.projeto.pizzaria3e.model.entity.Agendamento;
import br.itb.projeto.pizzaria3e.service.AgendamentoService;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {
    
    private AgendamentoService agendamentoService;
    
    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }
    
    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Agendamento agendamento) {
        Agendamento salvo = agendamentoService.save(agendamento);
        if(salvo != null) {
            return new ResponseEntity<>(salvo, HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Erro ao criar agendamento", HttpStatus.BAD_REQUEST);
    }
    
    @GetMapping("/findAll")
    public ResponseEntity<List<Agendamento>> findAll() {
        List<Agendamento> agendamentos = agendamentoService.findAll();
        return new ResponseEntity<List<Agendamento>>(agendamentos, HttpStatus.OK);
    }
    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Agendamento>> findByUsuarioId(@PathVariable Long usuarioId) {
        List<Agendamento> agendamentos = agendamentoService.findByUsuarioId(usuarioId);
        return new ResponseEntity<List<Agendamento>>(agendamentos, HttpStatus.OK);
    }
}