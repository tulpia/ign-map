# Project: TrailMarker - Front End

## Stack

- **Framework**: React (TypeScript), Vite
- **Routing**: TanStack Router (File-based routing)
- **State Management**: TanStack Query (Server state), React Context (Auth state), nuqs (Search params/Query state)
- **UI Library**: Mantine (v8+)
- **Forms**: React Hook Form with Mantine integration (using `Controller`)
- **Map**: Leaflet & React-Leaflet
- **API**: Axios, connecting to a Laravel Sanctum API

## General Instructions

### Imports Organization
Imports must be organized into dedicated sections with comments:
```typescript
// Utils (external libraries, hooks, constants)
// Components
// Providers
// Routes
// Hooks (local hooks)
// Api / Services
// Types / Interfaces
// Assets
```

### Component Standards
- **Prop Types**: Use TypeScript interfaces for props.
- **Default Props**: Component props MUST have `defaultProps` set for non-required properties to satisfy linting/style requirements.
- **Spread Operator**: Avoid `props` spreading unless explicitly necessary (e.g., wrapping Leaflet components). Use `eslint-disable-next-line react/jsx-props-no-spreading` if required.

### Coding Style
- **Airbnb Style Guide**: Follow strictly (refer to `.eslintrc.cjs`).
- **File Naming**: Use PascalCase for components (e.g., `TrailForm.tsx`). If a component is a directory, use `index.tsx` inside (e.g., `src/components/Map/index.tsx`).

## Architectural Patterns

### API Layer (`src/api/`)
- Organize by domain (e.g., `trails/`, `users/`).
- `*.d.ts`: Type definitions.
- `*.service.ts`: Raw Axios calls.
- `*.api.ts`: TanStack Query hooks (useMutation, useQuery) and Query Keys.

### Routing (`src/routes/`)
- Uses TanStack Router's file-based routing.
- `__root.tsx`: Top-level layout, AuthProvider, and QueryClient context.
- Guards and Protected Routes: Logic should be integrated into route definitions or custom hooks.

### Authentication (`src/providers/auth/`)
- Managed via `AuthContext` and `AuthProvider`.
- The current user is pre-fetched in the root route loader to avoid flickering and extra requests.

### Forms
- Use `react-hook-form` with Mantine's `Controller` for better integration and validation.
- Handle `FormData` for file uploads (e.g., GPX files, images).

## Development Workflow

- **Type Checking**: Always run `npm run build` or `tsc` to verify changes.
- **Linting**: Ensure `npm run lint` passes before concluding.
- **New Features**: When adding a new domain, create the corresponding `src/api/` folder first, then implement components and routes.
