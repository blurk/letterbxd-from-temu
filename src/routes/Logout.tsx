import { redirect } from "react-router";
import supabase from "../supabase";

export async function action() {
  await supabase.auth.signOut();

  return redirect("/login");
}
