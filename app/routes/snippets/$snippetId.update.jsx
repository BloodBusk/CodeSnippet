import { Form, redirect, json, useActionData, useLoaderData } from "remix";
import connectDb from "~/db/connectDb.server";
import SnippetIdUpdateStyle from "~/styles/snippetIdUpdateStyle.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: SnippetIdUpdateStyle,
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
  const form = await request.formData();
  const db = await connectDb();
  try {
    await db.models.Snippet.updateOne(
      { _id: params.snippetId },
      { $set: { title: form.get("title"), snippet: form.get("snippet"), description: form.get("description"), updatedAt: new Date() } }
    );
    return redirect(`/snippets/${params.snippetId}`);
  } catch (err) {
    return json(err.errors, { status: 400 });
  }
}

export default function CreateSnippet() {
  const snippet = useLoaderData();
  const actionData = useActionData();

  return (
    <div className="snippetUpdateContainer">
      <h1>Update Snippet</h1>
      <Form method="post" className="snippetUpdateForm">
        <label>Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="titleUpdateText"
          placeholder={snippet.title}
        ></input>
        {actionData?.errors.title ? (
          <p>{actionData.errors.title.message()}</p>
        ) : (
          ""
        )}
        <label>Snippet</label>
        <textarea type="text" name="snippet" id="snippet" className="snippetUpdateText" placeholder={snippet.snippet}></textarea>
        <label>Description</label>
        <textarea type="text" name="description" id="description" className="descriptionUpdateText" placeholder={snippet.description}></textarea>
        <button type="submit">Update</button>
      </Form>
    </div>
  );
}
