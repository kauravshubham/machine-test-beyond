import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

const AddUser = props => {
    const [name, setname] = useState('');
    const [phone, setphone] = useState('');
    const [role, setrole] = useState('user');
    const [err_name, setErrname] = useState('');
    const [err_phone, setErrphone] = useState('');
    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch();

    const validation = () => {
        setErrname(!name.length);
        setErrphone((isNaN(phone) || phone.length !== 10))
        return (!err_name || !err_phone)
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            if (validation()) {
                var body = {
                    name,
                    phone,
                    role
                }
                if (!users.length) {
                    body.id = 1;
                    dispatch({ type: "ADD_USER", payload: body })
                    setname('')
                    setphone('')
                    setrole('user')
                    setErrname('')
                    setErrphone('')
                    props.handleClose()
                }
                else {
                    var id = Math.max(...users.map(user => user.id));
                    body.id = id + 1;
                    var checkMobile = users.filter(user => user.phone === phone)
                    setErrphone(checkMobile.length > 0)
                    if (!checkMobile.length) {
                        dispatch({ type: "ADD_USER", payload: body })
                        setname('')
                        setphone('')
                        setrole('user')
                        setErrname('')
                        setErrphone('')
                        props.handleClose()
                    }
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Form method="post" onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            isValid={err_name === false}
                            isInvalid={err_name === true}
                            onChange={e => setname(e.target.value)}
                            placeholder="Enter Name"
                            required
                        />
                        <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            value={phone}
                            type="tel"
                            isValid={err_phone === false}
                            isInvalid={err_phone === true}
                            onChange={e => setphone(e.target.value)}
                            placeholder="Enter Phone"
                            required
                        />
                        <Form.Control.Feedback type="invalid">Invalid phone number/phone already exixts</Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Role</Form.Label>
                        <Form.Check
                            required
                            type="radio"
                            id="user"
                        >
                            <Form.Check.Input
                                name="role"
                                checked={role === 'user'}
                                onChange={() => setrole('user')}
                                type="radio"
                            />
                            <Form.Check.Label>User</Form.Check.Label>
                        </Form.Check>
                        <Form.Check
                            type="radio"
                            id="`user`"
                        >
                            <Form.Check.Input
                                checked={role === 'admin'}
                                onChange={() => setrole('admin')}
                                name="role"
                                type="radio"
                            />
                            <Form.Check.Label>Admin</Form.Check.Label>
                        </Form.Check>

                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Add
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddUser