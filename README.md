# Ateliê Pano Fino - Sistema Mobile

## 📱 Sobre o Projeto

Sistema mobile desenvolvido em Flutter para gerenciamento de ateliê de costura, permitindo agendamentos, encomendas e feedback de clientes.

## 🚀 Tecnologias Utilizadas

### Frontend (Mobile)
- **Flutter** - Framework para desenvolvimento mobile
- **Dart** - Linguagem de programação
- **HTTP** - Comunicação com API
- **SharedPreferences** - Armazenamento local

### Backend
- **Spring Boot** - Framework Java
- **SQL Server** - Banco de dados (Somee)
- **JPA/Hibernate** - ORM
- **Maven** - Gerenciador de dependências

## 📋 Funcionalidades

### 👤 Usuário
- ✅ Cadastro e Login
- ✅ Perfil do usuário
- ✅ Recuperação de senha

### 🛍️ Produtos
- ✅ Catálogo feminino e masculino
- ✅ Visualização de produtos
- ✅ Sistema de encomendas

### 📅 Agendamentos
- ✅ Agendamento de personalizações
- ✅ Seleção de data e horário
- ✅ Cálculo automático de orçamento

### 💬 Feedback
- ✅ Sistema de avaliações
- ✅ Comentários dos clientes
- ✅ Categorização de feedback

### 🔔 Notificações
- ✅ Notificações de agendamentos
- ✅ Contador de não lidas

## 🛠️ Instalação

### Pré-requisitos
- Flutter SDK
- Java 17+
- SQL Server

### Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run
```

### Backend (Spring Boot)
```bash
cd Atelie3e
./mvnw spring-boot:run
```

## 🗄️ Banco de Dados

**Servidor:** bd_atelie.mssql.somee.com
**Banco:** bd_atelie

### Principais Tabelas
- `Usuario` - Dados dos usuários
- `Agendamento` - Agendamentos de serviços
- `Encomenda` - Pedidos de produtos
- `Mensagem` - Feedbacks dos clientes

## 📱 Telas Principais

1. **Login/Cadastro** - Autenticação
2. **Home** - Página principal com carrossel
3. **Catálogo** - Produtos femininos e masculinos
4. **Agendamento** - Personalização de peças
5. **Perfil** - Dados do usuário
6. **Feedback** - Avaliações

## 🎯 Arquitetura

```
mobile/
├── lib/
│   ├── config/          # Configurações
│   ├── models/          # Modelos de dados
│   ├── services/        # Serviços e APIs
│   └── *.dart          # Páginas da aplicação
└── assets/             # Imagens e recursos

Atelie3e/
├── src/main/java/
│   └── br/itb/projeto/pizzaria3e/
│       ├── model/       # Entidades e repositórios
│       ├── rest/        # Controllers
│       └── service/     # Lógica de negócio
└── resources/          # Configurações
```

## 👥 Equipe

Projeto de TCC desenvolvido para curso de Desenvolvimento de Sistemas.

## 📄 Licença

Este projeto é acadêmico e desenvolvido para fins educacionais.