# Teste da API - Produto com Foto

## Problema
Erro: "No static resource produto/createComFoto"

## Soluções Implementadas

1. **Endpoint já existe** no ProdutoController:
   - `/produto/createComFoto` ✅

2. **Configuração WebConfig** atualizada:
   - Adicionado handler para recursos estáticos ✅

3. **Para testar**:
   ```bash
   # 1. Iniciar backend
   cd Atelie3e
   mvnw.cmd spring-boot:run
   
   # 2. Testar endpoint
   curl -X POST http://127.0.0.1:8081/produto/createComFoto \
     -F "nome=Teste" \
     -F "tipo=Roupa" \
     -F "descricao=Teste" \
     -F "codigoBarras=123" \
     -F "preco=50.00" \
     -F "file=@imagem.jpg"
   ```

## URLs Corretas
- **Backend**: http://127.0.0.1:8081
- **Frontend Web**: http://localhost:3000  
- **Mobile**: http://localhost:8080 (Flutter web)

## Verificar se backend está rodando
1. Abrir http://127.0.0.1:8081/produto/test
2. Deve retornar: "Olá, Produto!"