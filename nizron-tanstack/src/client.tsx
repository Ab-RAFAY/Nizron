/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/react-start';

hydrateRoot(document.getElementById('root')!, <StartClient />);
