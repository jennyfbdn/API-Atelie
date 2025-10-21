# Integração Mobile-Web - Ateliê Pano Fino

## 📱➡️🌐 Sincronização de Dados

Este documento explica como os dados do aplicativo mobile agora aparecem no painel web administrativo.

## ✅ Funcionalidades Implementadas

### 1. **Agendamentos**
- **Mobile**: Clientes fazem agendamentos de personalizações
- **Web**: Administrador visualiza todos os agendamentos em `/admin/agendamentos`
- **API**: `GET /agendamentos/findAll` e `GET /agendamentos/usuario/{id}`

### 2. **Encomendas** 
- **Mobile**: Clientes fazem pedidos de produtos
- **Web**: Administrador visualiza e gerencia encomendas em `/admin/encomendas`
- **API**: `GET /encomenda/findAll`, `PUT /encomenda/{id}/pronta`

### 3. **Serviços**
- **Mobile**: Clientes solicitam serviços
- **Web**: Administrador visualiza serviços em `/admin/servicos`
- **API**: `GET /servico/findAll`

## 🛠️ Arquivos Criados/Modificados

### Novos Serviços (Frontend Web)
```
src/services/
├── AgendamentoService.js    # Consome API de agendamentos
├── EncomendaService.js      # Consome API de encomendas
└── ServicoService.js        # Atualizado para usar httpCommom
```

### Novas Páginas Administrativas
```
src/pages/
├── AdminAgendamentos.jsx    # Lista agendamentos do mobile
├── AdminEncomendas.jsx      # Lista e gerencia encomendas
└── AdminServicos.jsx        # Lista serviços disponíveis
```

### Componentes
```
src/components/
└── AdminNavigation.jsx      # Navegação do painel admin
```

## 🚀 Como Usar

### 1. **Acessar o Painel Web**
```bash
cd Site-Atelie-main
npm install
npm run dev
```

### 2. **Fazer Login como Admin**
- Acesse `http://localhost:5173/login`
- Use credenciais de administrador
- Será redirecionado para `/home`

### 3. **Visualizar Dados do Mobile**
No painel administrativo, você verá novos cards:
- **📅 Agendamentos**: Ver agendamentos feitos no mobile
- **🛍️ Encomendas**: Ver e gerenciar pedidos do mobile
- **⚙️ Serviços Admin**: Ver serviços cadastrados

### 4. **Funcionalidades Disponíveis**

#### Agendamentos
- Visualizar todos os agendamentos
- Ver detalhes: cliente, data, horário, serviço, valor
- Status: PENDENTE, CONFIRMADO, CANCELADO

#### Encomendas  
- Visualizar todos os pedidos
- Marcar encomenda como "PRONTA"
- Ver detalhes: cliente, produto, quantidade, preço
- Status: PENDENTE, EM_PRODUCAO, PRONTA

#### Serviços
- Visualizar serviços cadastrados
- Ver nome, descrição, preço
- Status: ATIVO, INATIVO

## 🔄 Fluxo de Dados

```
Mobile App → Backend API → Web Dashboard
     ↓            ↓            ↓
Agendamentos → /agendamentos → AdminAgendamentos.jsx
Encomendas   → /encomenda    → AdminEncomendas.jsx  
Serviços     → /servico      → AdminServicos.jsx
```

## 📊 APIs Utilizadas

### Agendamentos
- `GET /agendamentos/findAll` - Lista todos
- `GET /agendamentos/usuario/{id}` - Por usuário
- `POST /agendamentos` - Criar (mobile)

### Encomendas
- `GET /encomenda/findAll` - Lista todas
- `GET /encomenda/usuario/{id}` - Por usuário  
- `POST /encomenda/create` - Criar (mobile)
- `PUT /encomenda/{id}/pronta` - Marcar como pronta

### Serviços
- `GET /servico/findAll` - Lista todos
- `GET /servico/findById/{id}` - Por ID
- `POST /servico/create` - Criar
- `PUT /servico/update/{id}` - Atualizar

## 🎯 Próximos Passos

1. **Notificações**: Implementar notificações em tempo real
2. **Relatórios**: Adicionar relatórios de agendamentos/encomendas
3. **Status**: Permitir alterar status dos agendamentos
4. **Filtros**: Adicionar filtros por data, cliente, status
5. **Dashboard**: Adicionar gráficos e estatísticas

## 🔧 Configuração da API

Certifique-se que o backend está rodando:
```bash
cd Atelie3e
./mvnw spring-boot:run
```

A API deve estar disponível em `http://localhost:8080`

## ✨ Resultado

Agora quando um cliente:
- Faz um agendamento no mobile → Aparece no web admin
- Faz uma encomenda no mobile → Aparece no web admin  
- Solicita um serviço no mobile → Aparece no web admin

O administrador pode gerenciar tudo pelo painel web! 🎉