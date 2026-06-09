# BBTS Portal 🌐

O **BBTS Portal** é uma aplicação Full-Stack desenvolvida para a gestão e automação de processos corporativos, incluindo módulos de auditoria, curadoria e cadastro de fornecedores. O projeto utiliza uma arquitetura baseada em componentes reutilizáveis para garantir escalabilidade e fácil manutenção.

## 🚀 Tecnologias Utilizadas

* **Frontend:** React com TypeScript
* **UI/UX:** Componentes customizados e integração com Figma
* **Backend/Database:** MySQL
* **Estilização:** CSS/SCSS

## ✨ Funcionalidades do Sistema

O portal é composto por diversos módulos operacionais, incluindo:

### Gestão de Fornecedores

* Cadastro, consulta e gerenciamento de fornecedores.
* Inclusão do campo **CNAE 2 (Opcional)** no cadastro de fornecedores.
* Remoção dos campos **Inscrição Estadual** e **Inscrição Municipal**.
* Modal dedicado para cadastro de fornecedores.

### Módulo de Auditoria

* Trilha de auditoria.
* Testes de auditoria.
* Relatórios e acompanhamento de atividades.

### Curadoria e Validação

* Ferramentas para validação de dados.
* Processos de curadoria de informações.
* Modal para justificativa de cancelamento de pesquisas.

### Gestão de Itens e Marcas

* Cadastro de categorias.
* Cadastro de classificações.
* Cadastro de marcas.
* Cadastro de itens.
* Tela dedicada para cadastro de itens.
* Modal para justificativa de cancelamento de itens.

### Pesquisa de Mercado

* Execução de pesquisas.
* Seleção e gerenciamento de itens de pesquisa.
* Consulta de resultados de busca.

### Painel Administrativo

* Dashboard centralizado.
* Gestão de perfil.
* Configurações do sistema.

### Segurança

* Sistema de login.
* Registro de usuários.
* Controle de acesso.

## 🔧 Correções Implementadas

### Cadastro de Fornecedores

* Correção do comportamento do modal de cadastro de fornecedor.
* Após o salvamento, o modal passa a ser exibido corretamente sobre a tela de fornecedores, sem remover ou substituir a tela principal.

### Item de Pesquisa

* Correção do campo de pesquisa que permitia a digitação de apenas um caractere.
* O campo agora aceita normalmente a digitação completa do nome do item.

## 📂 Estrutura do Projeto

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

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Yaslly-dev/BBTS_Portal.git
```

### 2. Entre no diretório do projeto

```bash
cd BBTS_Portal
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o banco de dados

* Localize o arquivo `src/backend/database/bbts_database.sql`.
* Execute o script em seu servidor MySQL para criar as tabelas e estruturas necessárias.

### 5. Inicie a aplicação

```bash
npm run dev
```

---

## 👨‍💻 Equipe de Desenvolvimento

**SQUAD 11 - Universidade Católica de Brasília**
