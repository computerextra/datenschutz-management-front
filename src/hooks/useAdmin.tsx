import { useEffect, useState } from "react";
import { getUser } from "../api/routes/user";
import { UserWithRole } from "../api/types";

export default function useAdmin() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    async function x() {
      const id = sessionStorage.getItem("id");
      const token = sessionStorage.getItem("token");
      if (id == null || token == null) return;
      const UserRes = await getUser(id);
      if (UserRes.message === "Success") {
        const User = UserRes.user as UserWithRole;
        if (User?.role.name != "Gast") {
          setAdmin(true);
        }
      }
    }
    void x();
  }, []);

  return admin;
}
