import React from 'react'
import { StarIcon } from '@chakra-ui/icons'
import { IoLocationSharp } from 'react-icons/io5'
import buyer from '../../../../assets/profile2.jpg'
import { Box } from '@chakra-ui/react'

import './ReviewCard.css'

const ReviewCard = () => {
  const property = {
    rating: 2.5,
    time: '2 months ago',
  }

  return (
    <div className="review">
      <div className="reviewer">
        <img src={buyer} alt="" />
        <div className="details2">
          <div style={{ fontWeight: '550', fontSize: '20px' }}>Name</div>

          <div className="thirdLine line2">
            <div>
              <IoLocationSharp />
              City
            </div>
            <div>
              <IoLocationSharp />
              State
            </div>
          </div>
        </div>
      </div>
      <div className="comment">
        <div className="ratings">
          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? 'orange' : 'gray'}
                />
              ))}
          </Box>
          <div
            style={{ fontWeight: '450', fontSize: '12px', marginLeft: '10px' }}
          >
            {property.time}
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora neque
          nisi libero ut accusamus? Officia iusto ad ducimus eius quasi. Laborum
          aperiam doloribus omnis, unde at corporis dicta! Aliquid illo, ratione
          at asperiores quaerat maiores ullam reprehenderit eaque vitae quam
          assumenda, fugiat quod id, quasi consequuntur atque voluptate?
          Necessitatibus provident officia autem non quisquam deleniti adipisci
          magni, nulla mollitia sit odit quis facilis, ipsa explicabo
          consectetur, alias corporis tenetur vero ad inventore dolorem. Tempore
          quae, ipsum aut et ipsam asperiores nihil quisquam autem quod cumque
          temporibus atque aliquid rerum pariatur! At est et excepturi laborum
          eius sint enim numquam amet inventore?
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
