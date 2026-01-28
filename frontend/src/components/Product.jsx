import React, { useState } from 'react'
import Rating from './Rating'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CheckoutModal from './CheckoutModal'

function Product({product}) {
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <>
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
                      <h5 className='my-2'>${product.price}</h5>
                  </Card.Text>
                  <Button 
                    variant='success' 
                    className='w-100 mt-2'
                    onClick={() => setShowCheckout(true)}
                  >
                    <i className='fas fa-shopping-cart me-2'></i>Buy Now
                  </Button>
              </Card.Body>
      </Card>

      <CheckoutModal 
        show={showCheckout} 
        onHide={() => setShowCheckout(false)} 
        product={product}
      />
    </>
  )
}

export default Product