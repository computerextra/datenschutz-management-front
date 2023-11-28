import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/routes/user";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [pass2, setControl] = useState("");
  const [err, setErr] = useState<string[]>([]);
  const [testPassed, setTestPassed] = useState(false);

  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const length = pass.length;
    const equal = pass === pass2;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    setErr([]);
    setTestPassed(false);
    let errCount = 0;
    if (length < 8) {
      setErr((prev) => [...prev, "Das Passwort muss mindestens 8 Zeichen enthalten."]);
      errCount++;
    }
    if (!hasUpperCase) {
      setErr((prev) => [...prev, "Das Passwort muss mindestens 1 Großbuchstaben enthalten."]);
      errCount++;
    }
    if (!hasLowerCase) {
      setErr((prev) => [...prev, "Das Passwort muss mindestens 1 Kleinbuchstaben enthalten."]);
      errCount++;
    }
    if (!hasNumbers) {
      setErr((prev) => [...prev, "Das Passwort muss mindestens 1 Zahl enthalten."]);
      errCount++;
    }
    if (!equal) {
      setErr((prev) => [...prev, "Die Passwörter stimmen nicht überein."]);
      errCount++;
    }
    if (errCount === 0) {
      setTestPassed(true);
    }
  }, [pass, pass2]);

  const register = async () => {
    if (!testPassed) return;
    const UserRes = await createUser(name, mail, pass);
    if (UserRes.message === "Success") {
      const User = UserRes.user;
      if (User == null) return;
      sessionStorage.setItem("token", User.token);
      sessionStorage.setItem("id", User.id);
      navigate("/");
    } else {
      return;
    }
  };

  if (auth)
    return (
      <Container className="mt-3">
        <h2 className="text-center">Bereits angemeldet, kein Grund ein neues Konto zu erstellen 😁</h2>
      </Container>
    );

  return (
    <Container className="text-center">
      <Form onSubmit={(e) => e.preventDefault()} className="mt-3">
        <FloatingLabel className="mt-3" label="Mail Adresse" controlId="Mail">
          <FormControl type="email" value={mail} placeholder="Mail Adresse" onChange={(e) => setMail(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel className="mt-3" label="Name" controlId="Name">
          <FormControl type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel className="mt-3" label="Passwort" controlId="Password">
          <FormControl type="password" value={pass} placeholder="Passwort" onChange={(e) => setPassword(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel className="mt-3" label="Passwort erneut eingeben" controlId="Control">
          <FormControl type="password" value={pass2} placeholder="Passwort erneut eingeben" onChange={(e) => setControl(e.target.value)} required />
        </FloatingLabel>
        {err.length > 0 && (
          <ul className="text-start">
            {err.map((e, idx) => (
              <li className="text-danger" key={idx}>
                {e}
              </li>
            ))}
          </ul>
        )}
        <div className="d-grid">
          <Button className="mt-3" type="submit" onClick={() => void register()} disabled={!testPassed}>
            Absenden
          </Button>
        </div>
      </Form>
    </Container>
  );
}
