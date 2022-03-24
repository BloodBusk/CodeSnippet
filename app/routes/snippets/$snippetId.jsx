import { useLoaderData, json, useCatch } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  let snippet = await db.models.Snippet.findById(params.snippetId); //without await throws error boundary
  if (!snippet) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(snippet);
}

export default function BookPage() {
  const snippet = useLoaderData();
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">{snippet.title}</h1>
      <code>
        <pre>{JSON.stringify(snippet, null, 2)}</pre>
      </code>
    </div>
  );
}

export function CatchBoundary(){
  const caught = useCatch();
  return (
    <div>
      {caught.status} {caught.statusText}
    </div>
  )
}

export function ErrorBoundary({error}){
  return(
    <div>
      <p>Oh no, something went wrong</p>
    </div>
  )
}
