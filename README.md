# Chatter Web

React + TypeScript frontend application with Material-UI for the Chatter chat application.

> **Note**: This is part of a Turborepo monorepo. See the [root README](../../README.md) for general setup instructions.

## Description

Frontend application built with React 19 and Vite, providing the user interface for the Chatter application.

## Tech Stack

- **React 19** with TypeScript
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **ESLint** - Code quality

## Environment Setup

Copy `.env.example` to `.env` and configure:

```env
VITE_API_URL=http://localhost:3000
```

## Development

### From monorepo root:
```bash
# Install all dependencies
pnpm install

# Run web app in development mode
pnpm --filter web dev
```

### From this directory:
```bash
# Development server with hot reload
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── App.tsx                    # Root component with theme provider
├── components/
│   ├── Routes.tsx            # Centralized routing configuration
│   └── auth/                 # Authentication components
│       ├── Auth.tsx          # Reusable auth form component
│       ├── Login.tsx         # Login page
│       └── Signup.tsx        # Signup page
└── main.tsx                  # Application entry point
```

## Features

- Dark theme by default
- Authentication UI (login/signup)
- Material-UI components
- Fast refresh with SWC

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Material-UI Documentation](https://mui.com)
- [React Router Documentation](https://reactrouter.com)
