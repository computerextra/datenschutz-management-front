import { useEffect, useState } from "react";
import { auth } from "../api/routes/auth";

export default function useAuth() {
  const [angemeldet, setAngemeldet] = useState(false);

  useEffect(() => {
    async function x() {
      const id = sessionStorage.getItem("id");
      const token = sessionStorage.getItem("token");
      if (id == null || token == null) return;
      const y = await auth(id, token);
      setAngemeldet(y);
    }
    void x();
  }, []);

  return angemeldet;
}
