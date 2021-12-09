import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if (!shippingAddress.address) {
        history.push('/ship')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Seleccione el método de pago</Form.Label>
                    <Col>
                        <Form.Check //agregar mas etiquetas conforme existan mas opciones
                            type='radio'
                            label='Paypal o Tarjeta de crédito' id='paypal'
                            name='paymentMethod'
                            checked //remove when multiple options available
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className='my-2'
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='info' className=' my-2'>
                    CONTINUAR
                </Button>

            </Form>

        </FormContainer>
    )
}

export default PaymentScreen
