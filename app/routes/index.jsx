import { useLoaderData, Link } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return snippets;
}

export default function Index() {
  const snippets = useLoaderData();

  return (
    <div >
      <h1>SudoSnippet</h1>
      <ul>
        {snippets.map((snippet) => {
          return (
            <li key={snippet._id}>
              <Link to={`/snippets/${snippet._id}`}>{snippet.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
