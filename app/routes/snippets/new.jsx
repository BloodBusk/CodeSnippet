
import { Form, redirect, json, useActionData } from "remix";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  try {
    const newSnippet = await db.models.Snippet.create({ title: form.get("title") });
    return redirect(`/snippets/${newSnippet._id}`);
  } catch (err) {
    return json(err.errors, { status: 400 });
  }
}

export default function CreateSnippet() {
  const actionData = useActionData();
  return (
    <div>
      <h1>Create Book</h1>
      <Form method="post">
        <label>Title</label>
        <br />
        <input type="text" name="title" id="title"></input>
        {actionData?.errors.title ? (
          <p>{actionData.errors.title.message()}</p>
        ) : (
          ""
        )}
        <br />
        <button type="submit">Save</button>
      </Form>
    </div>
  );
}
