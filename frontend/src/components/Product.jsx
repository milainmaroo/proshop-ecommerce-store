import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = (props) => {
  const { _id, name, image, price, rating, numReviews } = props.product

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img variant="top" src={image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating rating={rating} reviews={`${numReviews} reviews`} />
        </Card.Text>
        
        <Card.Text as='h3'><strong>${price}</strong></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product