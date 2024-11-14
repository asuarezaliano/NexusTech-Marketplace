## Requisitos y Configuración

### Requisitos Previos

- Node.js 20.x o superior
- npm o yarn como gestor de paquetes
- Una cuenta de Shopify (para funcionalidades completas)

### Configuración Inicial

1. Clona el repositorio:

   ```bash
   git clone https://github.com/asuarezaliano/nexus-tech-marketplace.git
   cd nexus-tech-marketplace
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:

   ```bash
   cp .env.example .env.local
   ```

   Edita el archivo `.env.local` con tus credenciales de Shopify

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

El proyecto estará disponible en `http://localhost:3000`

# Nexus Tech Marketplace

Este es un proyecto de e-commerce moderno construido con [Next.js 14](https://nextjs.org), que demuestra prácticas y patrones avanzados de desarrollo web.
Visita la versión en producción en [https://nexus-tech-marketplace.vercel.app/].

## Características Técnicas Detalladas

### Next.js 14 Features

#### Server-Side Rendering

Server Side Rendering (SSR) in Next.js is a technique that allows the server to generate a complete web page and send it to the client already rendered. This improves loading speed and user experience in web applications.
Used in all components that don't affect React's lifecycle.

1. **Optimized SEO**

   - Complete content for crawlers
   - Dynamic meta tags
   - Server-side structured data

2. **Performance**

   - Better First Contentful Paint (FCP)
   - Reduced Time to Interactive (TTI)
   - Automatic image optimization

3. **Security**

   - Sensitive data never exposed to client
   - Secure API tokens and keys
   - Server-side validations

4. **Smart Caching**

   - Automatic request caching
   - Granular revalidation
   - Persistent cache between deploys

#### Server Actions

Server Actions work like cloud functions that allow you to execute asynchronous code on the server directly from client components. These actions facilitate the implementation of functionalities like form submissions, data mutations, and other server-side operations without the need to create separate API routes.

Used in:

- Shopping cart operations
- Secure authentication and session handling
- Form processing without traditional API endpoints

#### Backend for Frontend (BFF)

- Implementación de una capa intermedia que actúa como backend específico para el frontend
- Manejo optimizado de las peticiones a la API de Shopify para:
  - Catálogo de productos
  - Gestión de inventario
  - Procesamiento de órdenes
- Transformación y adaptación de datos según las necesidades específicas del frontend

#### Routing and Layouts System

- Implementation of nested layouts to maintain common elements between pages
- Optimized links with prefetch for better performance
- Next.js Image component used to improve performance
- Route grouping: Allows organizing and grouping related routes in directories without affecting the final URL, improving code organization

#### Integración con Shopify

- Shopify GraphQL API for:
  - Product and variant management
  - Inventory control
  - Order processing
  - Payment system

#### Security

- Access token encryption for Shopify GraphQL
- Secure environment variables handling
- CSRF attack protection in cart operations

#### Manejo de Rutas

- Middleware para:
- Control de acceso a rutas
- Meta tags dinámicos
- Página 404 personalizada con sugerencias de productos
- Agrupación de rutas por funcionalidad
- Rutas paralelas para layouts complejos

#### Cache

#### Cache Strategies

Next.js cache implementation using different strategies:

- Time-based caching:

  - Revalidation after specific time periods
  - Used in product listings and category pages
  - `revalidate: 3600` for hourly updates

- No-cache:

  - Dynamic data that requires real-time updates
  - Used in cart and checkout processes
  - `cache: 'no-store'` for fresh data on each request

- Default caching:

  - Static content like images and assets
  - Automatically handled by Next.js

- Tag-based revalidation:
  - Add a tag to the API call that needs revalidation and create an API endpoint to trigger the revalidation process
  - Revalidate specific data based on tags
  - Used for targeted cache updates
  - Example implementation:

###Request Memoization

Next.js has a feature called "Request Memoization" that ensures fetch requests are made only once per server render, even if they are called multiple times with the same arguments. This can be achieved using the native fetch function, which Next.js automatically extends with this functionality.

### Parallel Routes

### Parallel Routes

Parallel Routes allow simultaneous rendering of multiple pages within the same view. They are particularly useful for complex UI patterns like dashboards, split views, or modals.
Used at my-accout for the orders and the user data

Benefits:

- Independent loading states for each route
- Improved code organization
- Better separation of concerns
- Enhanced user experience with parallel content loading

### Patrones de React Implementados

#### Compound Components Pattern

Implemented in different parts of the page by creating smaller components and using them to build larger components, which are reusable across different parts of the app.

#### Container/Presentational Pattern

- Clear separation between business logic and presentation in:
  - Product pages
  - Checkout components
  - Cart widgets

#### Custom Hooks Pattern

- useCart for cart logic
- useProducts for fetching and caching
- useAuth for authentication

#### Higher-Order Components (HOC)

- withAuth for route protection
- withAnalytics for tracking
- withErrorBoundary for error handling
