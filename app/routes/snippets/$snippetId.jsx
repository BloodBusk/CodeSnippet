import { redirect } from "build";
import { useLoaderData, json, useCatch, Form } from "remix";
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

export async function action({ request }) {
  const db = await connectDb();
  const form = await request.formData();
  // var ObjectId = require('mongodb').ObjectID;
  if (request.method == "DELETE") {
    try {
      await db.models.Snippet.deleteOne({ _id: form._id });
      console.log("Data Deleted");
      return redirect("/snippets");
    } catch (err) {
      return json(err.errors, { status: 400 });
    }
  }

  return null;
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
          <Form method="post">
            <button className="editBtn" type="submit">
              Edit
            </button>
          </Form>
          <Form method="DELETE">
            <button className="deleteBtn" type="submit">
              Delete
            </button>
          </Form>
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

// export function ErrorBoundary({ error }) {
//   return (
//     <div>
//       <p>Oh no, something went wrong</p>
//     </div>
//   );
// }
