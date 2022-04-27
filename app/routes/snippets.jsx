import { Outlet } from "@remix-run/react";
import { useLoaderData, Link, Form, redirect, json } from "remix";
import connectDb from "~/db/connectDb.server.js";
import snippetLinkStyle from "~/styles/snippetLinkStyle.css";
import { Icon } from "@iconify/react";
import { getSession, commitSession } from "~/session.js";

export const links = () => [
  {
    rel: "stylesheet",
    href: snippetLinkStyle,
  },
];

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const db = await connectDb();
  const url = new URL(request.url);
  const titleSearch = url.searchParams.get("search");
  const sortParam = url.searchParams.get("sort");
  const snippets = await db.models.Snippet.find().sort(sortParam); //finds and sorts by dropdown list value


  if (session.has("userId")) {
    return snippets.filter((snippet) =>
      titleSearch
        ? snippet.title.toLowerCase().includes(titleSearch.toLowerCase())
        : true
    ); //filters snippet data with search params from search bar
  }else{
    return redirect("/login");
  }
}

export default function Snippets() {
  const snippets = useLoaderData();

  return (
    <>
      <div className="snippetLinkContainer">
        <h2>Code Snippets</h2>
        <Form method="get" className="searchBar">
          <input type="search" name="search" placeholder="Search snippets" />
          <button type="submit">Search</button>
        </Form>
        <Form method="get" className="sortBar">
          <select name="sort">
            <option value="title">By Title</option>
            <option value="updatedAt">By Last Updated</option>
            <option value="favorite">By Favorite</option>
          </select>
          <button type="submit">Sort</button>
        </Form>
        <ul>
          {snippets?.map((snippet) => {
            return (
              <Link key={snippet._id} to={`/snippets/${snippet._id}`}>
                <li className="snippetLinkComponent">
                  <div>
                    <p>{snippet.title}</p>
                    <p className="star">
                      {snippets.favorite ? (
                        <Icon icon="ri:star-fill" />
                      ) : (
                        <Icon icon="ri:star-line" />
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="snippetLanguage">{snippet.language}</p>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <Outlet />
    </>
  );
}
