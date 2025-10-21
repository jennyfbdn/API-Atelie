package br.itb.projeto.pizzaria3e.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.pizzaria3e.model.entity.Encomenda;
import br.itb.projeto.pizzaria3e.service.EncomendaService;

@RestController
@RequestMapping("/encomenda")
public class EncomendaController {
    
    private EncomendaService encomendaService;
    
    public EncomendaController(EncomendaService encomendaService) {
        this.encomendaService = encomendaService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> criar(@RequestBody Encomenda encomenda) {
        System.out.println("=== NOVA ENCOMENDA ===");
        System.out.println("Usuario ID: " + encomenda.getUsuarioId());
        System.out.println("Usuario Nome: " + encomenda.getUsuarioNome());
        System.out.println("Produto: " + encomenda.getProduto());
        System.out.println("Quantidade: " + encomenda.getQuantidade());
        System.out.println("Preco: " + encomenda.getPreco());
        System.out.println("=====================");
        
        Encomenda salva = encomendaService.save(encomenda);
        if(salva != null) {
            return ResponseEntity.ok().body("Encomenda criada com sucesso!");
        }
        return new ResponseEntity<>("Erro ao criar encomenda", HttpStatus.BAD_REQUEST);
    }
    
    @GetMapping("/findAll")
    public ResponseEntity<List<Encomenda>> findAll() {
        List<Encomenda> encomendas = encomendaService.findAll();
        return new ResponseEntity<List<Encomenda>>(encomendas, HttpStatus.OK);
    }
    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Encomenda>> findByUsuarioId(@PathVariable Long usuarioId) {
        List<Encomenda> encomendas = encomendaService.findByUsuarioId(usuarioId);
        return new ResponseEntity<List<Encomenda>>(encomendas, HttpStatus.OK);
    }
    
    @PutMapping("/{id}/pronta")
    public ResponseEntity<?> marcarComoPronta(@PathVariable Long id) {
        System.out.println("=== MARCANDO ENCOMENDA COMO PRONTA ===");
        System.out.println("Encomenda ID: " + id);
        
        Encomenda encomenda = encomendaService.marcarComoPronta(id);
        
        if (encomenda != null) {
            System.out.println("Encomenda marcada como pronta e notificação enviada!");
            return ResponseEntity.ok().body("Encomenda marcada como pronta e cliente notificado!");
        } else {
            return ResponseEntity.badRequest().body("Encomenda não encontrada");
        }
    }
}