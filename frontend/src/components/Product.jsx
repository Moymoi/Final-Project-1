import React from 'react'
import Rating from './Rating'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Product({product}) {
  return (
    <Card className='product-card my-3 p-3 rounded shadow-xl' bg='primary' border='light'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' className='rounded-5' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <h6><strong>{product.name}</strong></h6>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div className='my-3'>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                    </div>
                </Card.Text>
            </Card.Body>
    </Card>
  )
}

export default Product