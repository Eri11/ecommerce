import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'



function RegisterScreen({ location, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)

    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Las contraseñas no coinciden')
        } else {
            dispatch(register(name, email, password))

        }

    }

    return (
        <FormContainer>
            <h1>INGRESAR</h1>
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
                        required
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
                        required
                        type='password'
                        placeholder='Confirme  su contraseña'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='my-2'

                    >
                    </Form.Control>
                </Form.Group>

                <Button className='my-3' type='submit' variant='secondary'>
                    Registrarse
                </Button>

            </Form>



            <Row className='py-3'>
                <Col>
                    ¿Ya eres cliente? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/login'}>
                        Ingresar
                    </Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
