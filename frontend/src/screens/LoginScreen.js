import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)

    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        //console.log('Submitted')
    }

    return (
        <FormContainer>
            <h1>INGRESAR</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label className='my-2'>CORREO ELECTRÓNICO</Form.Label>
                    <Form.Control
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

                <Button className='my-3' type='submit' variant='secondary'>
                    Ingresar
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    ¿Cliente nuevo? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Registrarse
                    </Link>
                </Col>

            </Row>

        </FormContainer>
    )
}

export default LoginScreen
