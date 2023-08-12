import React from "react";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function Signup() {
  return (
    <Form action="http://localhost:8000/auth/signup" method="post">
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control name="username" type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" />
      </Form.Group>
      <Button type="submit" variant="contained" endIcon={<SendIcon />}>
        Sign Up
      </Button>
    </Form>
  );
}
export default Signup;
