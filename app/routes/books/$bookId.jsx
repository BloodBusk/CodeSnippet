import { useLoaderData, json, useCatch } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  let book = await db.models.Book.findById(params.bookId); //without await throws error boundary
  if (!book) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(book);
}

export default function BookPage() {
  const book = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p>{book.author}</p>
      <code>
        <pre>{JSON.stringify(book, null, 2)}</pre>
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
