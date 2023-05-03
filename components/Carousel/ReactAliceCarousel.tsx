import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import styles from '@/styles/ReactAliceCarousel.module.scss'
import '@/styles/ReactAliceCarousel.module.scss'

const handleDragStart = (e) => e.preventDefault()

const images = [
  {
    url: '/static/img/buses/bus1.jpg'
  },
  {
    url: '/static/img/buses/bus2.jpg'
  },
  {
    url: '/static/img/buses/bus3.jpg'
  },
]

const items = images.map((image, index) => {
  return (
    <div className={styles.carousel__item} key={index}>
      <img src={image.url} onDragStart={handleDragStart} className={styles.carousel__image} />
    </div>
    )
})

const Carousel = () => {
  return (
    <AliceCarousel mouseTracking items={items} disableButtonsControls />
  )
}

export default Carousel
