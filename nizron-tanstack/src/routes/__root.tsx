import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import React from 'react';
import Providers from '../providers/providers';
import GlobalBackground from '../components/home/global-background';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Nizron IT Solutions | Professional & Creative IT Services',
      },
      {
        name: 'description',
        content:
          'Next-generation IT solutions for modern businesses. Specializing in Web Development, Mobile Apps, and Enterprise ERP systems.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-full flex flex-col font-body bg-[#080a0f] relative overflow-x-hidden">
        <Providers>
          <GlobalBackground />
          <Outlet />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}

