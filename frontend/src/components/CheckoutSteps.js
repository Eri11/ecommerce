import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>LOGIN</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>LOGIN</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>DIRECCIÓN DE ENVÍO</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>DIRECCIÓN DE ENVÍO</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/PAYMENT'>
                        <Nav.Link>MÉTODO DE PAGO</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>MÉTODO DE PAGO</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>COMPLETAR PEDIDO</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>COMPLETAR PEDIDO</Nav.Link>
                )}
            </Nav.Item>

        </Nav>
    )
}

export default CheckoutSteps
