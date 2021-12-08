import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'

function ProfileScreen({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden')
        } else {
            console.log('Updating...')
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>PERFIL DE USUARIO</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label className='my-2'>NOMBRE</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='my-2'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label className='my-2'>CORREO ELECTRÓNICO</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Ingrese su correo'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='my-2'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label className='my-2'>CONTRASEÑA</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Ingrese su contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='my-2'

                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label className='my-2'>CONFIRMAR CONTRASEÑA</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirme  su contraseña'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='my-2'

                        >
                        </Form.Control>
                    </Form.Group>

                    <Button className='my-3' type='submit' variant='secondary'>
                        ACTUALIZAR
                    </Button>

                </Form>
            </Col>


            <Col md={9}>
                <h2>MIS ÓRDENES</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
