import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Signup from "./SignUp";

function Body() {
  return (
    <Container style={{ background: "", padding: "7% 8%" }} fluid>
      <Row>
        <Col>
          <div>
            <h1 style={{ fontSize: "3.5rem" }}>Remember Writing</h1>
            <p style={{ width: "85%" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et rerum
              vero distinctio saepe iure expedita exercitationem nemo, nostrum
              id consectetur voluptate quam molestias. Odio, tempora.
            </p>
          </div>
        </Col>
        <Col>
          <Signup />
        </Col>
      </Row>
    </Container>
  );
}
export default Body;
