import React from 'react';
  // For version <=2.3.2
//   import { Swiper, Navigation, Pagination } from 'swiper/dist/js/swiper.esm';
  // For version >=2.4.0
//   import { Swiper, Navigation, Pagination } from 'swiper/esm/swiper.esm';
  import ReactIdSwiperCustom from 'react-id-swiper/lib/ReactIdSwiper.custom';
  const CustomBuildSwiper = () => {
    const params = {
    //   // Provide Swiper class as props
    //   Swiper,
    //   // Add modules you need
    //   modules: [Navigation, Pagination],
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