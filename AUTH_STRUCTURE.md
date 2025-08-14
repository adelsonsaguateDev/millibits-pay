# Estrutura de Autenticação

## 📁 Organização dos Arquivos

```
app/
├── _layout.tsx          # Layout principal com gerenciamento de autenticação
├── auth/                # Grupo de autenticação
│   ├── _layout.tsx      # Layout específico para autenticação
│   └── index.tsx        # Tela de login principal
├── (tabs)/              # Grupo de tabs (apenas para usuários autenticados)
│   ├── _layout.tsx      # Layout das tabs
│   ├── index.tsx        # Tela inicial (Home)
│   └── explore.tsx      # Tela de exploração
└── +not-found.tsx       # Tela de erro 404
```

## 🔐 Funcionalidades de Autenticação

### Hook `useAuth`

- **Localização**: `hooks/useAuth.ts`
- **Funcionalidades**:
  - `isAuthenticated`: Estado de autenticação
  - `isLoading`: Estado de carregamento
  - `signIn()`: Função de login
  - `signOut()`: Função de logout

### Fluxo de Navegação

1. **App inicia** → Verifica status de autenticação
2. **Não autenticado** → Redireciona para `/auth`
3. **Autenticado** → Redireciona para `/(tabs)`
4. **Logout** → Redireciona para `/auth`

## 🎨 Componentes da Tela de Autenticação

### Design

- **Banner rosa** com logo "M"
- **Ícone de usuário** circular rosa
- **Botão de biometria** (rosa sólido)
- **Botão de código de acesso** (branco com borda rosa)

### Cores

- **Primária**: `#FF69B4` (Rosa vibrante)
- **Branco**: `#FFFFFF`
- **Sombra**: `#000000`

## 🚀 Como Usar

### Acessar a Tela de Autenticação

```typescript
import { router } from "expo-router";

// Navegar para autenticação
router.push("/auth");
```

### Verificar Status de Autenticação

```typescript
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <AuthScreen />;

  return <AuthenticatedContent />;
}
```

### Implementar Login

```typescript
import { useAuth } from "@/hooks/useAuth";

function LoginForm() {
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn();
      // Usuário será redirecionado automaticamente
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };
}
```

## 🔧 Próximos Passos

1. **Implementar autenticação biométrica** usando `expo-local-authentication`
2. **Criar tela de código de acesso** (`app/auth/access-code.tsx`)
3. **Adicionar validação** e tratamento de erros
4. **Implementar persistência** de estado de autenticação
5. **Adicionar animações** de transição entre telas

## 📱 Navegação

- **Rota**: `/auth`
- **Layout**: Stack sem header
- **Animações**: Slide from bottom
- **Gestos**: Desabilitados para evitar navegação acidental
