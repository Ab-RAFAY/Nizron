/// <reference types="vinxi/types/server" />
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server';
import { createRouter } from './router';

export default createStartHandler({
  createRouter,
  getRouterManifest: () => {
    // @ts-ignore
    return import('tsr:routes-manifest').then((m) => m.default());
  },
})(defaultStreamHandler);
