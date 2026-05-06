# BBTS Portal 🌐

O **BBTS Portal** é uma aplicação Full-Stack desenvolvida para a gestão e automação de processos corporativos, incluindo módulos de auditoria, curadoria e cadastro de fornecedores. O projeto utiliza uma arquitetura baseada em componentes reutilizáveis para garantir escalabilidade e fácil manutenção.

## 🚀 Tecnologias Utilizadas

- **Frontend:** [React](https://reactjs.org/) com [TypeScript](https://www.typescriptlang.org/)
- **UI/UX:** Componentes customizados e integração com Figma.
- **Backend/Database:** [MySQL](https://www.mysql.com/) (Scripts localizados em `backend/database/`).
- **Estilização:** CSS/SCSS (Pasta `styles/`).

## ✨ Funcionalidades do Sistema

O portal é composto por diversos módulos operacionais, incluindo:

*   **Gestão de Fornecedores:** Cadastro, consulta de informações e modais dedicados.
*   **Módulo de Auditoria:** Trilha de auditoria, testes de auditoria e relatórios.
*   **Curadoria e Validação:** Ferramentas para validação de dados e processos de curadoria.
*   **Gestão de Itens e Marcas:** Cadastro de categorias, classificações, marcas e itens.
*   **Painel Administrativo:** Dashboard centralizado (Painel.tsx) e gestão de perfil/configurações.
*   **Segurança:** Sistema de login e registro de usuários.

## 📂 Estrutura do Projeto

A estrutura de diretórios foi organizada para separar as responsabilidades de interface e persistência de dados:

```text
src/
├── app/
│   └── components/
│       ├── figma/             # Assets e referências de design
│       ├── ui/                # Componentes de interface base (botões, inputs, etc.)
│       ├── Auditoria.tsx      # Módulo de trilha e testes de auditoria
│       ├── CadastrarFornecedor.tsx # Gestão de parceiros e fornecedores
│       ├── Painel.tsx         # Dashboard principal
│       └── ...                # Demais módulos de negócio (Login, Perfil, Relatórios)
├── backend/
│   └── database/
│       └── bbts_database.sql  # Script de criação do banco de dados MySQL
├── styles/                    # Arquivos de estilização global e módulos
├── App.tsx                    # Componente raiz
└── main.tsx                   # Ponto de entrada da aplicação
```
### Instalação

1. Clone o repositório
```bash
git clone [https://github.com/Yaslly-dev/BBTS_Portal.git](https://github.com/Yaslly-dev/BBTS_Portal.git)
```
2. Entre no diretório do projeto
```bash
cd BBTS_Portal
```
3. Instale as dependências
```bash
npm install
```
4. Configure o banco de dados
- Localize o arquivo src/backend/database/bbts_database.sql.
- Execute o script no seu servidor MySQL para criar as tabelas e estruturas necessárias.
5. Inicie a aplicação
```bash
npm run dev
```
---

Desenvolvido por: SQUAD 11 - Universidade Católica de Brasília
