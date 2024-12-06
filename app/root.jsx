import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import './styles/styles.css';

export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700&display=swap' },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans bg-gray-100 min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
