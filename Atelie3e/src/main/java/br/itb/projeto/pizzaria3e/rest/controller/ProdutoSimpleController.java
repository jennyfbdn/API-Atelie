package br.itb.projeto.pizzaria3e.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.pizzaria3e.model.entity.Produto;
import br.itb.projeto.pizzaria3e.service.ProdutoService;

@RestController
@RequestMapping("/simple")
@CrossOrigin(origins = "*")
public class ProdutoSimpleController {

    private final ProdutoService produtoService;

    public ProdutoSimpleController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping("/produto")
    public ResponseEntity<?> criar(@RequestBody Produto produto) {
        System.out.println("=== CRIANDO PRODUTO ===");
        System.out.println("Nome: " + produto.getNome());
        System.out.println("Tipo: " + produto.getTipo());
        System.out.println("Preço: " + produto.getPreco());
        
        try {
            Produto _produto = produtoService.save(produto);
            if (_produto != null) {
                System.out.println("Produto salvo com ID: " + _produto.getId());
                return ResponseEntity.ok("Produto criado com sucesso!");
            }
        } catch (Exception e) {
            System.out.println("ERRO: " + e.getMessage());
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Erro ao criar produto");
    }

    @PutMapping("/produto/{id}")
    public ResponseEntity<?> atualizar(@PathVariable long id, @RequestBody Produto produto) {
        System.out.println("=== ATUALIZANDO PRODUTO ID: " + id + " ===");
        System.out.println("Nome: " + produto.getNome());
        System.out.println("Preço: " + produto.getPreco());
        
        try {
            Produto _produto = produtoService.update(id, produto);
            if (_produto != null) {
                System.out.println("Produto atualizado com sucesso!");
                return ResponseEntity.ok("Produto atualizado com sucesso!");
            }
        } catch (Exception e) {
            System.out.println("ERRO: " + e.getMessage());
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("Erro ao atualizar produto");
    }
}