import { Form, redirect, json, useActionData } from "remix";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  try {
    const newSnippet = await db.models.Snippet.create({
      title: form.get("title"),
      language: form.get("selectedValue"),
      snippet: form.get("snippet"),
      description: form.get("description"),
      favorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    newSnippet.set('timestamps', true);
    return redirect(`/snippets/${newSnippet._id}`);
  } catch (err) {
    return json(err.errors, { status: 400 });
  }
}

export default function CreateSnippet() {
  const actionData = useActionData();
  return (
    <div>
      <h1>Create Snippet</h1>
      <Form method="post">
        <label>Title</label>
        <input type="text" name="title" id="title"></input>
        {actionData?.errors.title ? (
          <p>{actionData.errors.title.message()}</p>
        ) : (
          ""
        )}
        <label>Language</label>
        <select name="selectedValue" id="selectedValue">
          <option value="JavaScript">JavaScript</option>
        </select>
        <label>Snippet</label>
        <textarea type="text" name="snippet" id="snippet"></textarea>
        <label>Description</label>
        <textarea type="text" name="description" id="description"></textarea>
        <button type="submit">Create</button>
      </Form>
    </div>
  );
}
