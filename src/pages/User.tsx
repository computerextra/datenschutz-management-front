import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function User() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/LogIn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (!auth) {
    return <></>;
  }

  return <div>User</div>;
}
