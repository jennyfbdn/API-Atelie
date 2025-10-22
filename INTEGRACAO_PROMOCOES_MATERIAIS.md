# Integração Promoções e Materiais - Web para Mobile

## 📱 Funcionalidades Implementadas

### 1. Serviço de Promoções (Mobile)
- **Arquivo**: `lib/services/promocao_service.dart`
- **Funcionalidades**:
  - Buscar promoções ativas do sistema web
  - Buscar promoção por ID
  - Calcular preço com desconto
  - Formatar preços para exibição

### 2. Modelo de Promoções
- **Arquivo**: `lib/models/promocao_model.dart`
- **Propriedades**:
  - ID, nome, descrição
  - Preço original e desconto
  - Foto (base64)
  - Status da promoção
  - Data de criação
  - Métodos para cálculo de preços

### 3. Página de Promoções
- **Arquivo**: `lib/promocoes_page.dart`
- **Características**:
  - Lista todas as promoções ativas
  - Exibe imagens, preços e descontos
  - Modal com detalhes completos
  - Pull-to-refresh para atualizar
  - Tratamento de erros

### 4. Integração na Home Page
- **Seção de promoções** com carrossel horizontal
- **Botão de promoções** no grid de serviços
- **Carregamento automático** das promoções ativas

### 5. Materiais Integrados
- **Atualização**: `lib/materiais_page.dart`
- **Funcionalidades**:
  - Carrega materiais do sistema web
  - Fallback para materiais locais
  - Suporte a imagens base64
  - Identificação da origem (web/local)

## 🔄 Fluxo de Integração

### Promoções
1. **Sistema Web**: Admin cadastra promoções com imagens
2. **API Backend**: Endpoint `/promocao/findAllAtivos`
3. **Mobile**: Consome API e exibe promoções
4. **Interface**: Cards com desconto, preços e detalhes

### Materiais
1. **Sistema Web**: Admin cadastra produtos tipo "Material"
2. **API Backend**: Endpoint `/produto` filtrado por tipo
3. **Mobile**: Integra com materiais locais
4. **Interface**: Grid com disponibilidade e agendamento

## 📋 Endpoints Utilizados

### Promoções
- `GET /promocao/findAllAtivos` - Lista promoções ativas
- `GET /promocao/findById/{id}` - Detalhes da promoção

### Materiais
- `GET /produto` - Lista produtos (filtrado por tipo Material)

## 🎨 Interface

### Home Page
- **Seção "Promoções Especiais"** com carrossel
- **Card de promoções** no grid de serviços
- **Integração visual** com tema do app

### Página de Promoções
- **Lista vertical** com cards elegantes
- **Badge de desconto** destacado
- **Preços** com riscado e valor promocional
- **Modal de detalhes** com imagem grande

### Página de Materiais
- **Grid 2x2** com cards de materiais
- **Suporte a imagens** do sistema web
- **Status de disponibilidade**
- **Agendamento de retirada**

## 🔧 Configuração

### API Config
```dart
static const String baseUrl = 'http://127.0.0.1:8080';
```

### Dependências
- `http: ^1.1.0` - Requisições HTTP
- `dart:convert` - Conversão JSON/Base64

## ✅ Benefícios

1. **Sincronização**: Promoções e materiais sempre atualizados
2. **Gestão Centralizada**: Admin gerencia tudo pelo sistema web
3. **Experiência Unificada**: Mesmo conteúdo em web e mobile
4. **Fallback**: Materiais locais quando API indisponível
5. **Performance**: Cache e carregamento otimizado

## 🚀 Como Usar

### Para Administradores
1. Acesse o sistema web
2. Cadastre promoções na seção "Promoções"
3. Cadastre materiais como produtos tipo "Material"
4. As informações aparecerão automaticamente no mobile

### Para Usuários Mobile
1. Abra o app
2. Veja promoções na home page
3. Acesse "Promoções" para ver todas
4. Acesse "Materiais" para agendar retirada
5. Conteúdo sempre sincronizado com o sistema web