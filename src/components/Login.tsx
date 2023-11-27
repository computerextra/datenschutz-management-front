import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logIn } from "../api/routes/auth";

export default function Login({ mail, pass }: { mail: string; pass: string }) {
  const loggedIn = sessionStorage.getItem("token") ? true : false;
  const redirect = useNavigate();

  const handleClick = async () => {
    if (loggedIn) {
      sessionStorage.clear();
    } else {
      const res = await logIn(mail, pass);
      if (res == null) {
        redirect("/logIn");
        return;
      }
      if (typeof res === "string") {
        redirect("/logIn");
        return;
      } else {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("id", res.id);
      }
    }
  };

  return <Button onClick={() => void handleClick()}>{loggedIn ? "Abmelden" : "Anmelden"}</Button>;
}
