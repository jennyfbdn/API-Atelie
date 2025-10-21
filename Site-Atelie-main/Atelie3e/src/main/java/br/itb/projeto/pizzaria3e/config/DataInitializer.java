package br.itb.projeto.pizzaria3e.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import br.itb.projeto.pizzaria3e.model.entity.Usuario;
import br.itb.projeto.pizzaria3e.service.UsuarioService;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioService usuarioService;

    public DataInitializer(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Criar usuário admin padrão se não existir
        if (usuarioService.findByEmail("admin@atelie.com") == null) {
            Usuario admin = new Usuario();
            admin.setNome("Administrador");
            admin.setEmail("admin@atelie.com");
            admin.setSenha("admin123");
            admin.setTelefone("(11) 99999-9999");
            admin.setNivelAcesso("ADMIN");
            admin.setStatusUsuario("ATIVO");
            
            usuarioService.save(admin);
            System.out.println("Usuário admin criado: admin@atelie.com / admin123");
        }
    }
}