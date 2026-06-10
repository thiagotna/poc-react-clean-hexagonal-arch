# 🏗️ GitHub User Viewer - POC Clean/Hexagonal Architecture

Uma Prova de Conceito (POC) implementando **Clean Architecture** e **Hexagonal Architecture** (Ports & Adapters) em uma aplicação React + TypeScript, demonstrando boas práticas de separação de responsabilidades e inversão de controle.

## 🎯 Sobre o Projeto

Este projeto ilustra como estruturar uma aplicação React seguindo princípios de **Clean Architecture**, mantendo a lógica de negócio isolada da infraestrutura e apresentação. A aplicação permite buscar e visualizar informações de usuários do GitHub de forma dinâmica.

### ✨ Funcionalidades

- 🔍 **Busca Dinâmica** — Digite um username do GitHub e busque informações em tempo real
- ✅ **Validação de Input** — Validação client-side para usernames (apenas caracteres válidos)
- 📱 **Responsive UI** — Interface limpa e responsiva
- 🎨 **Exibição de Dados** — Mostra avatar, nome, repositórios, seguidores e data de criação
- ⚠️ **Tratamento de Erros** — Exibe mensagens de erro quando o usuário não é encontrado
- ⌨️ **Busca com Enter** — Pressione Enter ou clique no botão para buscar

---

## 🏛️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com camadas bem definidas:

```
┌─────────────────────────────────────────────────────────┐
│                PRESENTATION LAYER                        │
│  (Components, Controllers, Hooks)                        │
│  GitHubUserViewer.tsx, useAsyncController               │
└─────────────────────┬───────────────────────────────────┘
                      │ (Dependency Injection)
┌─────────────────────▼───────────────────────────────────┐
│                DOMAIN LAYER                              │
│  (Use Cases, DTOs, Interfaces)                           │
│  FetchGitHubUserUseCase, GitHubUserDTO, IUseCase        │
└─────────────────────┬───────────────────────────────────┘
                      │ (Interface IUserRepository)
┌─────────────────────▼───────────────────────────────────┐
│              INFRASTRUCTURE LAYER                        │
│  (HTTP Client, Repositories)                             │
│  GitHubUserRepository, API Integration                  │
└─────────────────────────────────────────────────────────┘
```

### 📁 Estrutura de Pastas

```
src/
├── core/                              # Core utilities
│   ├── controller/                    # Controller state interface
│   ├── factories/                     # Factory pattern
│   │   └── createFactoryController/   # Controller factory
│   ├── hooks/                         # React hooks
│   │   └── useAsyncController/        # Generic async controller hook
│   └── repositories/                  # Repository interfaces
│
├── domain/                            # Domain layer (business logic)
│   ├── dtos/                          # Data Transfer Objects
│   │   └── GitHubUserDTO.ts           # GitHub user data structure
│   └── usecases/                      # Use cases
│       └── FetchGitHubUserUseCase.ts  # Fetch user use case
│
├── infrastructure/                    # Infrastructure layer
│   └── http/                          # HTTP adapters
│       └── GitHubUserRepository.ts    # GitHub API integration
│
├── presentation/                      # Presentation layer
│   ├── components/                    # React components
│   │   └── GitHubUserViewer.tsx       # Main component
│   └── controllers/                   # Controller factories
│       └── createGitHubUserController.ts
│
├── App.tsx                            # Root component
├── main.tsx                           # Entry point
└── index.css                          # Global styles
```

---

## 🔄 Fluxo de Dados

```
User Input (Digite username)
    ↓
GitHubUserViewer Component
    ↓ (onClick/onKeyPress)
useAsyncController Hook (Gerencia estado)
    ↓ execute(username)
FetchGitHubUserUseCase (Execute)
    ↓
GitHubUserRepository (Adapter)
    ↓ HTTP GET
GitHub API (https://api.github.com/users/{username})
    ↓
GitHubUserDTO (Dados estruturados)
    ↓
Atualiza estado no Hook
    ↓
Re-render Component com dados
```

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** >= 16.x
- **npm** ou **yarn**

### Instalação

1. Clone o repositório:

```bash
git clone <seu-repositorio>
cd poc-react-clean-hexagonal-arch
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra no navegador:

```
http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento com HMR
npm run build    # Build para produção
npm run preview  # Visualiza build de produção localmente
npm run lint     # Executa ESLint
```

---

## 🛠️ Tecnologias Utilizadas

- **React 19** — Biblioteca UI
- **TypeScript** — Tipagem estática
- **Vite** — Build tool e dev server
- **ESLint** — Linting
- **GitHub API** — Dados de usuários do GitHub

---

## 📚 Padrões de Design Implementados

### 1. **Clean Architecture**

Separação clara entre camadas (Domain, Infrastructure, Presentation) com dependências apontando para o centro.

### 2. **Hexagonal Architecture (Ports & Adapters)**

- **Ports** — Interfaces como `IUseCase`, `IUserRepository`
- **Adapters** — Implementações concretas como `GitHubUserRepository`

### 3. **Factory Pattern**

`createFactoryController` cria instâncias de controladores com injeção de dependência.

### 4. **Dependency Injection**

Use cases e repositórios são injetados via factory, não hardcoded em componentes.

### 5. **React Hooks Pattern**

`useAsyncController` encapsula lógica de estado assíncrono reutilizável.

---

## 🔌 Como Adicionar Nova Funcionalidade

### Exemplo: Buscar Repositórios de um Usuário

1. **Criar DTO** (`src/domain/dtos/GitHubRepoDTO.ts`):

```typescript
export interface GitHubRepoDTO {
  id: number
  name: string
  description: string | null
  stars: number
  language: string | null
}
```

2. **Criar Use Case** (`src/domain/usecases/FetchUserReposUseCase.ts`):

```typescript
import { IUseCase } from '../IUseCase'
import { IUserRepository } from '../../core/repositories/IUserRepository'
import { GitHubRepoDTO } from '../dtos/GitHubRepoDTO'

export class FetchUserReposUseCase implements IUseCase<
  string,
  GitHubRepoDTO[]
> {
  constructor(private repository: IUserRepository) {}

  execute(username: string): Promise<GitHubRepoDTO[]> {
    return this.repository.getUserRepos(username)
  }
}
```

3. **Implementar no Repositório** (`src/infrastructure/http/GitHubUserRepository.ts`):

```typescript
async getUserRepos(username: string): Promise<GitHubRepoDTO[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!response.ok) throw new Error(`Failed to fetch repos for ${username}`);
  return response.json();
}
```

4. **Usar no Componente**:

```typescript
const { data: repos, execute } = useAsyncController(
  new FetchUserReposUseCase(repository),
)
```

---

## ✅ Validação

A aplicação implementa validação em múltiplas camadas:

- **Client-side** — Regex `/^[\w-]+$/` validando username antes de requisição
- **API** — GitHub API retorna 404 para usernames inválidos
- **Error Handling** — Mensagens de erro claras exibidas ao usuário

---

## 📖 Referências e Recursos

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub API Documentation](https://docs.github.com/en/rest)

---

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

## 👤 Autor

Criado como uma POC para demonstrar Clean Architecture em React.

---

**Gostou do projeto?** ⭐ Deixe uma estrela no repositório!
