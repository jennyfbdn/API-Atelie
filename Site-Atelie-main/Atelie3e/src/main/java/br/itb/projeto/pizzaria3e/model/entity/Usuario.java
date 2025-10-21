package br.itb.projeto.pizzaria3e.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String nome;
	private String telefone;
	private String email;
	@Column(name = "endereço")
	private String endereco;
	private String senha;
	private String nivelAcesso; // ADMIN ou USER
	private String statusUsuario;
	private LocalDateTime dataCadastro;
	private String perguntaSeguranca;
	private String respostaSeguranca;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getNivelAcesso() {
		return nivelAcesso;
	}
	public void setNivelAcesso(String nivelAcesso) {
		this.nivelAcesso = nivelAcesso;
	}
	public String getStatusUsuario() {
		return statusUsuario;
	}
	public void setStatusUsuario(String statusUsuario) {
		this.statusUsuario = statusUsuario;
	}
	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}
	public void setDataCadastro(LocalDateTime dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
	public String getPerguntaSeguranca() {
		return perguntaSeguranca;
	}
	public void setPerguntaSeguranca(String perguntaSeguranca) {
		this.perguntaSeguranca = perguntaSeguranca;
	}
	public String getRespostaSeguranca() {
		return respostaSeguranca;
	}
	public void setRespostaSeguranca(String respostaSeguranca) {
		this.respostaSeguranca = respostaSeguranca;
	}
	@Override
	public String toString() {
		return "Usuario [nome=" + nome + ", telefone=" + telefone + ", email=" + email + ", senha=" + senha + "]";
	}
	
	
	
}