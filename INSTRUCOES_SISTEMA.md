# Sistema Ateliê Pano Fino - Instruções

## Correções Implementadas

### Backend (Spring Boot)
1. **Adicionado endpoint `/createComFoto`** no ProdutoController
2. **Adicionado endpoint `/findByCategoria/{id}`** para filtrar produtos por categoria
3. **Adicionado método `findByCategoriaId`** no ProdutoRepository
4. **Configurado CORS** para permitir requisições do frontend

### Frontend Web (React)
1. **Corrigido URL da API** para usar `127.0.0.1:8080`
2. **Mantido endpoint `createComFoto`** no ProdutoService.js

### Mobile (Flutter)
1. **Adicionado sistema de categorias** completo
2. **Criado modelo Categoria** e serviço
3. **Integrado categorias na HomePage** 
4. **Corrigido URL da API** para usar `127.0.0.1:8080`

## Como Iniciar o Sistema

### 1. Backend
```bash
# Opção 1: Usar o script
start-backend.bat

# Opção 2: Manual
cd Atelie3e
mvnw.cmd spring-boot:run
```

### 2. Frontend Web (Admin)
```bash
cd Site-Atelie-main
npm install
npm start
```

### 3. Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run -d chrome
```

## Fluxo do Sistema

### Web (Admin)
- Admin adiciona produtos com fotos
- Gerencia categorias
- Visualiza encomendas

### Mobile (Cliente)
- Visualiza produtos por categoria
- Faz encomendas
- Agenda serviços
- Envia feedback

## Endpoints Principais

- `GET /produto/findAll` - Lista todos produtos
- `GET /produto/findByCategoria/{id}` - Produtos por categoria
- `POST /produto/createComFoto` - Criar produto com foto
- `GET /categoria` - Lista categorias
- `POST /encomenda/create` - Criar encomenda

## URLs de Acesso

- **Backend API**: http://127.0.0.1:8080
- **Frontend Web**: http://localhost:3000
- **Mobile Web**: http://localhost:8080 (Flutter web)

## Banco de Dados

Conectado ao SQL Server na Somee:
- **Servidor**: bd_atelie.mssql.somee.com
- **Banco**: bd_atelie