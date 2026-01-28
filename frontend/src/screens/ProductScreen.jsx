import React, {useEffect, useState} from 'react'
import defaultProducts from '../products'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, ListGroup, Row, Image, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import CheckoutModal from '../components/CheckoutModal';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductScreen() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [showCheckout, setShowCheckout] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const {data} = await axios.get(`http://localhost:8000/api/products/${id}/`)
                setProduct(data)
            } catch (err) {
                console.error('Error fetching product:', err)
                // Fallback to local products
                const localProduct = defaultProducts.find(p => p._id === id)
                if (localProduct) {
                    setProduct(localProduct)
                }
            }
        }
        fetchProduct()
    }, [id])

    const handlePurchase = () => {
        setShowCheckout(true)
    }

  return (
    <div>
        <Link to ='/'className='btn btn-light my-3'>Home</Link>
        <Row>
            <Col md={3}>
                <ListGroup>
                    <ListGroup.Item className='rounded-3 border-3 text-center' bg='primary'>
                        <Image src={product.image} alt={product.name} fluid className='d-block mx-auto' style={{maxHeight: '300px', width: 'auto'}} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>{product.description}</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='py-3'>
                        <p>Pay conveniently with GCash, Smart/Sun, Card Payment, Maya, Dito, GrabPay, 7-Eleven (Philippines), Coins.ph, Bank Payment, Counter Payment, Codacash. </p>
                    </ListGroup.Item>
                    <ListGroup.Item className='py-1'>
                        <p>Buy in-game currency and promos in seconds! Simply enter your credentials, select the item you wish to purchase, complete the payment, and the item will be instantly delivered to your {product.name} account.</p>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={5}>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <Col>Product: </Col>
                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row className='align-items-center'>
                                <Col xs={6}>
                                    <strong>Quantity:</strong>
                                </Col>
                                <Col xs={6}>
                                    <Form.Control 
                                        as="select" 
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        disabled={product.countInStock === 0}
                                    >
                                        {[...Array(Math.min(product.countInStock || 10, 10)).keys()].map(i => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Total: ${(product.price * quantity).toFixed(2)}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                className='w-100'
                                variant='primary'
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={handlePurchase}
                            >
                                Purchase
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating color={'#f8e825'} value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

        <CheckoutModal 
            show={showCheckout} 
            onHide={() => setShowCheckout(false)} 
            product={product}
        />
    </div>
    
  )
}

export default ProductScreen