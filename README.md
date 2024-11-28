# Cupcake-Store
## Linguagens e componentes utilizadas no frontend
- Vite
- React


  ## Linguagens e componentes utilizadas no backend

  -Next.js
  -Express
  -SQL

  ## Para visualizar o projeto, siga os passos abaixo:

Instalação e Execução
1-Baixe o projeto para o seu computador.

2-Instale as dependências:

Dentro da pasta do projeto, instale as dependências com o comando:
npm install
3- Frontend:

Vá para a pasta front-end e inicie o servidor com o comando:
npm run dev
4- Backend:

Vá para a pasta Backend e inicie o servidor com:
npm start

## Configuração do Banco de Dados
Para configurar o banco de dados, execute o script a seguir para criar as tabelas necessárias.

Ajuste o arquivo .env com suas credenciais do banco de dados MySQL:

DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
Criação da Base de Dados:

O backend possui um script que cria a base de dados e as tabelas se elas não existirem. Para executar este script:

Navegue até a pasta Backend e execute o comando abaixo para criar as tabelas necessárias:
node createDatabase.js
O arquivo createDatabase.js será responsável por:
Criar a base de dados cupcake_store.
Criar a tabela productos com as colunas id, name, description, price e image.
A tabela compras com as colunas id, nombre_cliente, direccion_envio, total, fecha.
A tabela detalle_compras id, compra_id, producto_id, cantidad, precio.
______________________________________________________________________________________
Para poder visualizar o painel de administração após lançar o projeto, digite http://localhost:5173/login. usuário: diego@gmail.com
senha: Diego123

