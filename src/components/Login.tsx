import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../api/routes/auth";

export default function Login({ mail = "NOTHING", pass = "NOTHING" }: { mail?: string; pass?: string }) {
  const loggedIn = sessionStorage.getItem("token") ? true : false;
  const [message, setMessage] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (mail.length <= 1) {
      setMessage("Keine Mail angegeben");
      return;
    }
    if (pass.length <= 1) {
      setMessage("Kein Passwort angegeben");
      return;
    }
    if (loggedIn) {
      sessionStorage.clear();
      location.reload();
    } else {
      const res = await logIn(mail, pass);
      console.log(res);
      if (res == null) {
        return;
      }
      if (typeof res === "string") {
        setMessage(res);
        return;
      } else {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("id", res.id);
        navigate("/");
      }
    }
  };

  return (
    <>
      <Button type="submit" onClick={() => void handleClick()}>
        {loggedIn ? "Abmelden" : "Anmelden"}
      </Button>
      {message != null && (
        <>
          <p className="text-danger fs-4 text-center">{message}</p>
          {message === "No User Found" && (
            <div className="text-center">
              <Link to="/register" className="fs-4 btn btn-primary text-center">
                Neuen Benutzer anlegen
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
