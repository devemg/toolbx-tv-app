# Toolbox TV App

A modern TV application built with React, TypeScript, and spatial navigation for seamless remote control experience.

## Features

- 🎮 **Spatial Navigation**: Full remote control support using `@noriginmedia/norigin-spatial-navigation`
- �️ **Magic Remote/Mouse Support**: Seamless pointer navigation with hover-to-focus and click-to-select
- �📺 **TV-Optimized UI**: Designed for TV viewing experience with focus states and smooth animations
- 👤 **User Profile**: Dedicated user profile page with account information
- 📱 **Content Details**: Dynamic content description panel with smooth animations
- 🧪 **Well Tested**: Comprehensive test coverage with Vitest and React Testing Library

## Tech Stack

- **React 19.2** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Navigation and routing
- **SCSS Modules** - Component-scoped styling
- **Spatial Navigation** - Remote control navigation library
- **Vitest** - Testing framework
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example environment file
cp .env.example .env
```

**Environment Variables:**
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_ENV=development
```

- `VITE_API_URL`: Backend API endpoint (default: http://localhost:3000/api)
- `VITE_APP_ENV`: Application environment (development/production)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Lint code
pnpm lint
```

### Docker Compose Setup

Run the entire application stack (frontend + API backend) using Docker Compose:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose up --build api
docker-compose up --build app
```

**Services:**
- **API Backend**: http://localhost:3000
- **Frontend App**: http://localhost:8080

The frontend container automatically connects to the API backend service.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CardList/       # Content card grid with horizontal scroll
│   ├── ContentDescription/  # Content detail panel
│   └── Header/         # Navigation header
├── pages/              # Page components
│   ├── Content/        # Main content browsing page
│   ├── User/           # User profile page
│   └── NotFound/       # 404 page
├── contexts/           # React context providers
├── models/             # TypeScript interfaces and types
├── queries/            # API queries and data fetching
├── router/             # Application routing configuration
├── navigation/         # Spatial navigation keys and config
├── styles/             # Global styles and themes
└── test/               # Test utilities and mocks

```

## Navigation

### Remote Control Support

The app is fully navigable with TV remote controls:

- **Arrow Keys**: Navigate between focusable elements
- **Enter/OK**: Select focused item
- **Up/Down**: Move between card lists
- **Left/Right**: Scroll within card lists

### Magic Remote / Mouse Support

Smart TV Magic Remote and mouse interactions are fully supported:

- **Hover (onPointerMove/onMouseMove)**: Automatically focuses elements using `setFocus()`
- **Click (onPointerDown/onMouseDown)**: Acts as "Enter" key press


### Routes

- `/` or `/:tab` - Main content page (home, movies, series, kids)
- `/user` - User profile page
- `*` - 404 Not Found page

## Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
pnpm test

# Run tests with coverage report
pnpm test:coverage
```

Tests cover:
- Component rendering
- User interactions
- Accessibility

## Development

This project uses:
- **HMR** (Hot Module Replacement) for fast development
- **TypeScript** for type safety
- **SCSS Modules** for component-scoped styles
- **Path aliases** for clean imports (@/, @components, @pages, etc.)

## Technical Justification

### Architecture

**Design Decisions:**
- **Component-based architecture with React**: Modularity and reusability (CardList, Card, ContentDescription components)
- **Context API for global state**: Centralized content and navigation management without prop drilling and third party state management libraries
- **React Router v7**: Declarative navigation with code splitting by routes
- **SCSS Modules**: Encapsulated styles that prevent CSS conflicts
- **TypeScript**: Type safety that prevents runtime errors and improves developer experience
- **Magic Remote/Mouse Support**: Enhanced UX for modern Smart TVs with pointer devices

**Structure:**
```
- Separation of concerns (components, pages, contexts, models)
- Clean imports with path aliases
- Custom hooks for reusable logic
- Composition over inheritance
```

### Magic Remote / Mouse Support

**Technical Implementation:**

Modern Smart TVs (LG webOS, Samsung Tizen) feature Magic Remotes with pointer capabilities. This dual-input support enhances user experience:

**Design Principles:**
1. **Progressive Enhancement**: Traditional remote navigation works, pointer adds convenience
2. **Event-Driven Architecture**: Leverages native browser pointer/mouse events
3. **Focus Synchronization**: Pointer hover triggers spatial navigation focus using `setFocus()`
4. **Action Mapping**: Click events map to "Enter" key behavior

**Hook Architecture:**
```typescript
// Low-level hook: useMagicRemote
// - Accepts any ref and adds pointer event listeners
// - Decoupled from spatial navigation internals
// - Reusable across different navigation systems

useMagicRemote(ref, {
  focusKey: 'unique-key',
  onEnter: () => handleAction()
});

// High-level hook: useFocusableMagic  
// - Wrapper combining useFocusable + useMagicRemote
// - Single hook for leaf components
// - Reduces boilerplate in component code

const { ref, focused } = useFocusableMagic({
  onEnterRelease: () => handleClick()
});
```

**Event Handling Strategy:**
- **pointermove/mousemove**: Calls `setFocus(focusKey)` to update spatial navigation
- **pointerdown/mousedown**: Triggers `onEnter` callback (maps to Enter key)
- **Separate handlers**: PointerEvent and MouseEvent require different type signatures
- **No preventDefault**: Allows native Link navigation for accessibility

**Benefits:**
- **Zero Breaking Changes**: Works alongside existing keyboard/remote navigation
- **Smart TV Native Feel**: Hover-to-focus matches LG/Samsung UX patterns
- **Performance**: Event delegation with single listener per element

### Navigation & Pointer System

**Navigation Strategy:**
- **Vertical (Up/Down)**: Switch between different CardLists
- **Horizontal (Left/Right)**: Scroll within a CardList
- **Enter/OK**: Content selection

**Magic Remote Implementation:**
```typescript
// useMagicRemote hook
export function useMagicRemote<T extends HTMLElement>(
  ref: RefObject<T>,
  options: { focusKey?: string; onEnter?: () => void }
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Hover sets focus
    const handlePointerMove = () => {
      if (options.focusKey) {
        setFocus(options.focusKey);
      }
    };

    // Click triggers action
    const handlePointerDown = () => {
      if (options.onEnter) {
        options.onEnter();
      }
    };

    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerdown', handlePointerDown);
    // ... cleanup
  }, [ref, options.focusKey, options.onEnter]);
}

// useFocusableMagic wrapper
export function useFocusableMagic<T extends HTMLElement>(
  config?: UseFocusableConfig<T>
) {
  const focusable = useFocusable<T>(config);
  
  // Automatically add Magic Remote support
  useMagicRemote(focusable.ref, {
    focusKey: focusable.focusKey,
    onEnter: () => config?.onEnterRelease?.({} as any),
  });
  
  return focusable;
}
```

**Benefits:**
- Dual input support: Works with both remote control and pointer
- No conflicts: Both input methods work simultaneously
- Natural UX: Hover-to-focus mimics native Smart TV behavior
- Flexible: Can be used standalone or as a wrapper

### Performance Optimizations

**1. React.memo for Components:**
```typescript
export const CardList: React.FC<CardListProps> = memo(({ ... }) => {
  // Prevents re-renders when props haven't changed
});
```

**2. useMemo for Expensive Calculations:**
```typescript
const progressPercentage = useMemo(() => {
  return (content.currentViewTime / content.duration) * 100;
}, [content.currentViewTime, content.duration]);
```

**3. useCallback for Functions:**
```typescript
const setContentList = useCallback((content: IContentListResponse) => {
  setContentListState(content.results);
}, []);
```

**4. Lazy State Updates:**
- Debouncing in scroll position checks
- Timeouts for selected content cleanup
- Prevention of updates during transitions

**5. CSS Animations Instead of JS:**
```scss
// Hardware-accelerated animations
animation: slideInFromRight 0.4s ease-out forwards;
transform: translateX(50px); // GPU accelerated
```

**6. Image Optimization:**
```typescript
// Progressive fallback: backdrop → poster → placeholder
const [imageUrl, setImageUrl] = useState(
  content.backdrop_path ?? content.poster_path
);
```

**7. Efficient Rendering:**
- Only visible elements in viewport are actively rendered
- Native browser scroll with CSS overflow
- Cleanup functions in useEffect to prevent memory leaks

## License

MIT
