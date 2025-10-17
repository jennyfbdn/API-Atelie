package br.itb.projeto.pizzaria3e.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Encomenda")
public class Encomenda {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "usuario_id")
    private Long usuarioId;
    
    @Column(name = "usuario_nome")
    private String usuarioNome;
    
    private String produto;
    private Integer quantidade;
    private String altura;
    private String largura;
    private String busto;
    private String personalizacao;
    
    @Column(name = "data_retirada")
    private String dataRetirada;
    
    @Column(name = "hora_retirada")
    private String horaRetirada;
    
    private Double preco;
    private String status;
    
    private String localizacao;
    
    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUsuarioId() {
        return usuarioId;
    }
    
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
    
    public String getUsuarioNome() {
        return usuarioNome;
    }
    
    public void setUsuarioNome(String usuarioNome) {
        this.usuarioNome = usuarioNome;
    }
    
    public String getProduto() {
        return produto;
    }
    
    public void setProduto(String produto) {
        this.produto = produto;
    }
    
    public Integer getQuantidade() {
        return quantidade;
    }
    
    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
    
    public String getAltura() {
        return altura;
    }
    
    public void setAltura(String altura) {
        this.altura = altura;
    }
    
    public String getLargura() {
        return largura;
    }
    
    public void setLargura(String largura) {
        this.largura = largura;
    }
    
    public String getBusto() {
        return busto;
    }
    
    public void setBusto(String busto) {
        this.busto = busto;
    }
    
    public String getPersonalizacao() {
        return personalizacao;
    }
    
    public void setPersonalizacao(String personalizacao) {
        this.personalizacao = personalizacao;
    }
    
    public String getDataRetirada() {
        return dataRetirada;
    }
    
    public void setDataRetirada(String dataRetirada) {
        this.dataRetirada = dataRetirada;
    }
    
    public String getHoraRetirada() {
        return horaRetirada;
    }
    
    public void setHoraRetirada(String horaRetirada) {
        this.horaRetirada = horaRetirada;
    }
    
    public Double getPreco() {
        return preco;
    }
    
    public void setPreco(Double preco) {
        this.preco = preco;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
    
    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
    
    public String getLocalizacao() {
        return localizacao;
    }
    
    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }
}