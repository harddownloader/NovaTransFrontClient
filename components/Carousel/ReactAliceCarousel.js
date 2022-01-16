import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// import Image from 'next/image'

// import './ReactAliceCarousel.module.scss'
import styles from '@/styles/ReactAliceCarousel.module.scss'

// images
// import bustest from 'bus.jpg'
// import bus1 from '/static/img/buses/bus1.jpg'
// import bus2 from '/static/img/buses/bus2.jpg'
// import bus3 from '/static/img/buses/bus3.jpg'

const handleDragStart = (e) => e.preventDefault();

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
];

// const items = [
//   <img src={process.env.PUBLIC_URL + '/assets/images/buses/bus1.jpg'} onDragStart={handleDragStart} className="yours-custom-class" />,
//   <img src={process.env.PUBLIC_URL + '/assets/images/buses/bus2.jpg'} onDragStart={handleDragStart} className="yours-custom-class" />,
//   <img src={process.env.PUBLIC_URL + '/assets/images/buses/bus3.jpg'} onDragStart={handleDragStart} className="yours-custom-class" />,
// ];

const items = images.map((image, index) => {
  return (
    <div className={styles.carousel__item} key={index}>
      <img src={image.url} onDragStart={handleDragStart} className={styles.carousel__image} />
    </div>
    );
});

const Carousel = () => {
  return (
    <AliceCarousel mouseTracking items={items} />
  );
}

export default Carousel;
