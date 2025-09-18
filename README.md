# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Naming Platform Backend Frontend

A React-based frontend application for managing names through the Naming Platform's backend services. This application provides a user-friendly interface for interacting with the Name Manager and Search Names APIs.

## Features

- **Name Dashboard**: View and manage names in a sortable, searchable table
- **Search Functionality**: Real-time filtering by name or category
- **Create Names**: Add new names with categories, features, and notes
- **Update Names**: Edit existing names with a feature-rich modal interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Built with screen reader support and keyboard navigation

## Tech Stack

- **React 19.1** - Frontend framework
- **Vite** - Build tool and development server
- **TypeScript** - Type safety and better development experience
- **react-router-dom** - Client-side routing
- **react-data-table-component** - Advanced table functionality
- **react-modal** - Accessible modal dialogs
- **CSS Modules** - Scoped styling approach

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd aka-dev-namingplatform-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update `VITE_API_BASE_URL` with your API endpoint.

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port shown in the terminal).

## Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CreateNameModal.jsx
│   ├── UpdateNameModal.jsx
│   ├── ErrorMessage.jsx
│   └── LoadingSpinner.jsx
├── pages/              # Page components
│   └── NameBankDashboard.jsx
├── services/           # API service functions
│   └── api.js
├── styles/             # CSS stylesheets
│   ├── App.css
│   ├── NameBankDashboard.css
│   ├── Modal.css
│   ├── ErrorMessage.css
│   └── LoadingSpinner.css
├── App.tsx            # Main app component with routing
└── main.tsx          # Application entry point
```

## API Integration

The application integrates with two main API endpoints:

### Search Names API
- **Endpoint**: `POST /search/searchnames`
- **Purpose**: Retrieve and filter names
- **Request**: Empty body for all names, or filters object

### Name Manager API
- **Create**: `POST /names/createname`
- **Update**: `POST /names/updatename`
- **Body**: Name data including id, name, category, features, notes

## Configuration

### Environment Variables
- `VITE_API_BASE_URL`: Base URL for API requests

### Features List
The application includes predefined features that can be assigned to names:
- Memorable
- Short
- Easy to Pronounce
- Brandable
- Tech-focused
- Creative
- Professional
- Modern
- Classic
- International
- Domain Available
- Trademark Clear

You can modify this list in the modal components (`CreateNameModal.jsx` and `UpdateNameModal.jsx`).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style and patterns
2. Ensure components are accessible (ARIA labels, keyboard navigation)
3. Test responsive design across device sizes
4. Add error handling for new features
5. Update documentation for significant changes

## Troubleshooting

### API Connection Issues
- Verify `VITE_API_BASE_URL` in `.env` file
- Check network connectivity and API server status
- Review browser console for detailed error messages

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure Node.js version compatibility
- Check for TypeScript compilation errors

## License

This project is private and proprietary to Maven Technologies.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
