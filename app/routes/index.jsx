import { redirect } from "remix";


export async function loader() { 
  return redirect("/snippets");;
}

export default function Index() {

  return (
    <div>
      Select a language on the left
    </div>
  );
}
