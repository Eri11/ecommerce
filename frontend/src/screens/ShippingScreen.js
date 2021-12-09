import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'


function ShippingScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setsetCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
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
