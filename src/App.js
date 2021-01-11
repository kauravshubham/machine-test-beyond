import React, { useState } from "react";
import './App.css';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import AddUser from "./AddUser";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [modal, setModal] = useState(false);
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  return (
    <Container className="my-4">
      <Row>
        <Col sm={{ span: 2, offset: 10 }}>
          <Button onClick={() => setModal(true)} variant="info">&#43; Add User</Button>
          <AddUser show={modal} handleClose={() => setModal(false)} />
        </Col>
        <Col sm={12}>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                return <tr key={i}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button onClick={() => dispatch({ type: "DELETE_USER", payload: user.id })} variant="outline-danger"> Delete</Button>
                  </td>
                </tr>
              })}
            </tbody>
          </Table>
        </Col>

      </Row>
    </Container>
  );
}

export default App;
