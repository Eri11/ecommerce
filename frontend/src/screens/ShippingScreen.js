import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'


function ShippingScreen({ history }) {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setsetCountry] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
    }

    return (
        <FormContainer>
            <h1>ENVÍO</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label className='my-2'>NOMBRE</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ingrese su dirección'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                        className='my-2'
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label className='my-2'>CIUDAD</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Ciudad'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                        className='my-2'
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label className='my-2'>CÓDIGO POSTAL</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Código Postal'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className='my-2'
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label className='my-2'>PAÍS</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='País'
                        value={country ? country : ''}
                        onChange={(e) => setsetCountry(e.target.value)}
                        className='my-2'
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='info' className='my-2 fit-btn'>
                    SIGUIENTE

                </Button>

            </Form>


        </FormContainer>
    )
}

export default ShippingScreen
