import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterAppProvider } from './router/app-router'
import { ContentProvider } from './contexts/content'
import { init } from '@noriginmedia/norigin-spatial-navigation';

init({
  debug: false,
  visualDebug: false,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContentProvider>
      <RouterAppProvider />
    </ContentProvider>
  </StrictMode>,
)
