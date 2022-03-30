import { useLoaderData, Link, Outlet } from "remix";
import connectDb from "~/db/connectDb.server.js";
import snippetLinkStyle from "~/styles/snippetLinkStyle.css";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return snippets;
}

export const links = () => [
  {
    rel: "stylesheet",
    href: snippetLinkStyle,
  },
];

export default function Index() {
  const snippets = useLoaderData();

  return (
    <div className="snippetLinkContainer">
      <h2>Code Snippets</h2>
      <ul>
        {snippets.map((snippet) => {
          return (
            <Link key={snippet._id} to={`/snippets/${snippet._id}`}>
              <li className="snippetLinkComponent">{snippet.title}</li>
            </Link>
          );
        })}
        <Outlet />
      </ul>
    </div>
  );
}
