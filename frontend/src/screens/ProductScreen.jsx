import React, {useEffect, useState} from 'react'
import products from '../products'
import { useParams } from 'react-router-dom'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductScreen() {
    const {id} = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        async function fetchProduct() {
            const {data} = await axios.get(`http://localhost:8000/api/products/${id}/`)
            setProduct(data)
        }
        fetchProduct()
    }, [id])
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
                            <Button
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}
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
    </div>
    
  )
}

export default ProductScreen