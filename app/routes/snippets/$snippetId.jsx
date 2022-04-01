import { useLoaderData, json, useCatch, Form, redirect } from "remix";
import connectDb from "~/db/connectDb.server.js";
import snippetIdStyle from "~/styles/snippetIdStyle.css";
import { useState } from "react";
import { Icon } from "@iconify/react";

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

export async function action({ request, params }) {
  const db = await connectDb();
  let formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  if (request.method == "DELETE") {
    try {
      await db.models.Snippet.deleteOne({ _id: params.snippetId });
      return redirect("/snippets");
    } catch (err) {
      return json(err.errors, { status: 400 });
    }
  }
  if (_action === "update") {
    try {
      return redirect(`/snippets/${params.snippetId}/update`);
    } catch (err) {
      return json(err.errors, { status: 400 });
    }
  }

  if (_action === "favorite") {
    try {
      await db.models.Snippet.updateOne({ _id: params.snippetId }, [
        { $set: { favorite: { $eq: [false, "$favorite"] } } }, //$eq toggles between false and true
      ]);
    } catch (err) {
      return json(err.errors, { status: 400 });
    }
  }
  return null;
}

export default function SnippetPage() {
  const snippet = useLoaderData();
  const [checkFav, setCheckFav] = useState(snippet.favorite);

  const handleCheck = () => {
    setCheckFav(prev => !prev);
  };

  return (
    <div className="snippetId">
      <div className="snippetIdHeader">
        <div>
          <h2 className="snippetIdH2">{snippet.title}</h2>
          <p className="snippetTag">{snippet.language}</p>
        </div>
        <div className="snippetIdFormContainer">
          <Form method="POST">
            <button className="favbtn" type="submit" name="_action" value="favorite" onClick={handleCheck}>
              {checkFav ? (<Icon icon="ri:star-line" />) : (<Icon icon="ri:star-fill" />)}
            </button>
          </Form>
          <Form method="POST">
            <button
              className="editBtn"
              type="submit"
              name="_action"
              value="update"
            >
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
