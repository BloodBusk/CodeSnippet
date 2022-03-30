import { useLoaderData, json, useCatch } from "remix";
import connectDb from "~/db/connectDb.server.js";
import snippetIdStyle from "~/styles/snippetIdStyle.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: snippetIdStyle,
  },
];

export async function loader({ params }) {
  const db = await connectDb();
  let snippet = await db.models.Snippet.findById(params.snippetId); //without await throws error boundary
  if (!snippet) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(snippet);
}

export default function SnippetPage() {
  const snippet = useLoaderData();
  return (
    <div className="snippetId">
      <div className="snippetIdHeader">
        <div>
          <h2 className="snippetIdH2">{snippet.title}</h2>
          <p className="snippetTag">{snippet.language}</p>
        </div>
        <div>
          <button className="editBtn">Edit</button>
          <button className="deleteBtn">...</button>
        </div>
      </div>
      <div className="divider"></div>
      <code>
        <pre className="snippetCode">{snippet.snippet}</pre>
      </code>
      <h3 className="snippetCodeExplanation">Code Explanation</h3>
      <p>{snippet.description}</p>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      {caught.status} {caught.statusText}
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <div>
      <p>Oh no, something went wrong</p>
    </div>
  );
}
