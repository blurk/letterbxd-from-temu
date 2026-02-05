import { useEffect, useState } from "react";
import supabase from "../supabase";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await supabase.auth.getClaims();
        if (!mounted) return;
        setIsLoggedIn(!!data?.claims.sub);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session?.user.id);
        setIsLoading(false);
      },
    );

    return () => {
      mounted = false;
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  return { isLoggedIn, isLoading } as const;
}
