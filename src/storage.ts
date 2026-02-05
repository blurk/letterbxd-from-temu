import supabase from "./supabase";
import type { Movie } from "./types";

export class Storage {
  async add(payload: Pick<Movie, "id" | "title" | "poster_path">) {
    const { data } = await supabase.auth.getClaims();

    const { error } = await supabase.from("watchlist").insert({
      movie_id: payload.id,
      user_id: data?.claims?.sub,
      title: payload.title,
      poster_path: payload.poster_path,
    });

    if (error) throw error;
  }

  async list(): Promise<
    { id: string; title: string; poster_path: string | null }[]
  > {
    const { data } = await supabase.auth.getClaims();

    const { data: movies, error } = await supabase
      .from("watchlist")
      .select("title, poster_path, id")
      .eq("user_id", data?.claims?.sub);

    if (error) throw error;
    return movies || [];
  }

  async delete(movieId: string) {
    const { data } = await supabase.auth.getClaims();

    const { error } = await supabase
      .from("watchlist")
      .delete()
      .eq("movie_id", movieId)
      .eq("user_id", data?.claims.sub);

    if (error) throw error;
  }

  async has(movieId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("watchlist")
      .select("id")
      .eq("movie_id", movieId);

    if (error && error.code !== "PGRST116") throw error;
    return data ? data.length > 0 : false;
  }
}
