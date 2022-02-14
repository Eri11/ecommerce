import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'


function OrderScreen({ match }) {

    const orderId = match.params.id
    const dispatch = useDispatch()


    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    //AcsKZsPCXvYawku1otIbHTzb-rNjQhWoLjAUGIbvuQ0jQlcWRh3LyS7jCNbfM6OqJK_MHBgNYXUwYyLO
    const addPaypalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AcsKZsPCXvYawku1otIbHTzb-rNjQhWoLjAUGIbvuQ0jQlcWRh3LyS7jCNbfM6OqJK_MHBgNYXUwYyLO'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!order || successPay || order._id !== Number(orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)

            }
        }
    }, [dispatch, order, orderId, successPay])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Orden: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>ENVÍO</h2>

                            <p><strong>Nombre: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>

                            <p>
                                <strong>Enviar a: </strong>
                                {order.shippingAddress.address},
                                {' '}
                                {order.shippingAddress.city},
                                {' '}
                                {order.shippingAddress.postalCode},
                                {' '}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Entregado el {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Sin entregar</Message>

                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>MÉTODO DE PAGO</h2>

                            <p>
                                <strong>Método: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? (
                                <Message variant='success'>Pagado el {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Pago pendiente</Message>

                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>ARTÍCULOS</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                La orden está vacía

                            </Message> : (

                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}

                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>


                            )}

                        </ListGroup.Item>



                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>RESUMEN DE LA ÓRDEN</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Artículos:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Envío:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>IVA:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}

                                        />

                                    )}
                                </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
