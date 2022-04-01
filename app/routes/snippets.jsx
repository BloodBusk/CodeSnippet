import { Outlet } from "@remix-run/react";
import { useLoaderData, Link, Form } from "remix";
import connectDb from "~/db/connectDb.server.js";
import snippetLinkStyle from "~/styles/snippetLinkStyle.css";
import { Icon } from "@iconify/react";


export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return snippets;
}

export const links = () => [
  {
    rel: "stylesheet",
    href: snippetLinkStyle,
  },
];

export default function Snippets() {
  const snippets = useLoaderData();

  const toggleStar = () => {
    if (!snippets.favorite) {
      return <Icon icon="ri:star-line" />;
    }
    return <Icon icon="ri:star-fill" />;
  };

  return (
    <>
      <div className="snippetLinkContainer">
        <h2>Code Snippets</h2>
        <Form>
          <input type="text" name="search" placeholder="Search snippets" />
        </Form>
        <ul>
          {snippets.map((snippet) => {
            return (
              <Link key={snippet._id} to={`/snippets/${snippet._id}`}>
                <li className="snippetLinkComponent">
                  <div>
                    <p>{snippet.title}</p>
                    <p className="star">{toggleStar()}</p>
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
