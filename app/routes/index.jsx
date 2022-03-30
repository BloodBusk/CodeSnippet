import { useLoaderData, Link, Outlet, redirect } from "remix";
import connectDb from "~/db/connectDb.server.js";
import snippetLinkStyle from "~/styles/snippetLinkStyle.css";

export async function loader() { 
  return redirect("/snippets");;
}

export default function Index() {

  return (
    <div>
      Snippets
    </div>
  );
}
