import { useState } from "react";
import { Container, FloatingLabel, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "../components/Login";

export default function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FloatingLabel label="Email" controlId="Email" className="mt-3">
          <FormControl required type="mail" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel label="Password" controlId="Password" className="mt-3 mb-3">
          <FormControl required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FloatingLabel>
        <Login mail={username} pass={password} />
      </Form>
      <div className="mt-3">
        <span>Noch kein Konto? - </span>
        <Link to="/register">Neues Konto erstellen</Link>
      </div>
    </Container>
  );
}
