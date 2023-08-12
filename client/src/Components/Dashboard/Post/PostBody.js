import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "@mui/material/Button";
import { makePost } from "../../../js/makePost";
export default function PostBody() {
  function handleSubmit(event) {
    makePost(event);
  }

  return (
    <Container style={{ marginTop: "40px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            style={{ padding: "15px", fontSize: "1.2rem" }}
            type="text"
            placeholder="Enter Title..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Body Content</Form.Label>
          <Form.Control name="description" as="textarea" rows={5} />
        </Form.Group>
        <Button type="submit" variant="contained">
          Save New Post
        </Button>
      </Form>
    </Container>
  );
}
