import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import styles from "~/tailwind.css";
import sty from "~/styles/globalStyle.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },{
    rel: "stylesheet",
    href: sty,
  },
];


export function meta() {
  return {
    charset: "utf-8",
    title: "Remix + MongoDB",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="snippetBody">
        <header className="snippetHeader">
          <Link to="/snippets/new" className="createSnippetBtn">
            New Snippet
          </Link>
          <h2 className="headerh2">Language:</h2>
          <Link to="/" className="headerLink">
            All
          </Link>
          <Link to="/" className="headerLink">
            JavaScript
          </Link>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
