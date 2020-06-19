import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Form, Row, Col, Navbar } from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}Simple Chat
        </Navbar.Brand>
        <Button className="ml-auto" variant="light">Login</Button>
      </Navbar>
      <Container className="py-5">
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <Card className="shadow-sm">
              <Card.Body>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
