import React from 'react';
import ReactIdSwiperCustom from 'react-id-swiper/lib/ReactIdSwiper.custom';
import Swiper from 'swiper/esm/swiper-react.js';
// import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm';

const CustomBuildSwiper = () => {
  const params = {
    // Provide Swiper class as props
    Swiper,
    // Add modules you need
    // modules: [Navigation, Pagination],
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  }

  return(
    <ReactIdSwiperCustom {...params}>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
      <div>Slide 4</div>
      <div>Slide 5</div>
    </ReactIdSwiperCustom>
  )
}

export default CustomBuildSwiper;