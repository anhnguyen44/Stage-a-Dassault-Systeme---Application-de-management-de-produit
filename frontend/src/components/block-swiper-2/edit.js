/**
 * BLOCK: UAGB - Section Edit Class
 */

// Import classes
import React from 'react';
import Select from 'react-select';
import {
    Component,
} from "@wordpress/element";

// import SwiperSlide from '../swiper/index';
import { filter } from 'lodash';
// import './swiper-bundle';
// import Swiper from 'react-id-swiper';
// import 'swiper/css/swiper.css';
// import './swiper.cjs'
import { InnerBlocks } from "@wordpress/editor";
import Swiper3 from '../swiper3';



// ===============
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
// ============


class SwiperEdit extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            imgs: ["https://diapogram.com/upload/2018/04/04/20180404153749-c7f16e8a.jpg", "https://images4.alphacoders.com/600/thumb-1920-600912.jpg", "https://wallpaperaccess.com/full/40047.jpg", "https://drtbebqlk4bjh.cloudfront.net/21xFD01/assets/2A1EBB56641400003125A95EABCE0D00/2A1EBB56641400003125A95EABCE0D00_processexperiences_video_1.mp4"]
        }

    }

    componentDidMount() {
        // var mySwiper = new Swiper('.swiper-container', {
        //     // Optional parameters
        //     direction: 'vertical',
        //     loop: true,

        //     // If we need pagination
        //     pagination: {
        //         el: '.swiper-pagination',
        //     },

        //     // Navigation arrows
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //     },

        //     // And if we need scrollbar
        //     scrollbar: {
        //         el: '.swiper-scrollbar',
        //     },
        // })
    }


    render() {
        // const params = {
        //     pagination: '.swiper-pagination',
        //     paginationClickable: true,
        //     nextButton: '.swiper-button-next',
        //     prevButton: '.swiper-button-prev',
        //     spaceBetween: 30
        // };
        // let imgs = JSON.parse(window.localStorage.getItem("imagesMedia"));
        // let videos = JSON.parse(window.localStorage.getItem("videosMedia"));
        // const params = {
        //     effect: 'cube',
        //     grabCursor: true,
        //     cubeEffect: {
        //         shadow: true,
        //         slideShadows: true,
        //         shadowOffset: 20,
        //         shadowScale: 0.94,
        //     },
        //     pagination: {
        //         el: '.swiper-pagination',
        //     }
        // }
        // let { imgs } = this.state;
        let imgs = window.localStorage.getItem('listImageForEditSwiper')?JSON.parse(window.localStorage.getItem('listImageForEditSwiper')):null;
        if(imgs){
            return (
                // <Swiper {...params}>
                //     {/* <div>Slide 1</div>
                //     <div>Slide 2</div>
                //     <div>Slide 3</div>
                //     <div>Slide 4</div>
                //     <div>Slide 5</div> */}
                // {imgs.map(src => {
                //     if (src.includes("mp4")) {
                //         return <div><video key={src} src={src} style={{ width: '100%' }} controls type="video/mp4" /></div>
                //     }
                //     return <div><img key={src} src={src} width="100%" height="100%" /></div>;
                // })}
                //     {/* {imgs.length && (imgs.map(media => {
                //         return <div><img key={media.fileName} src={media.ticketURL} width="100%" height="100%" /></div>;
    
                //     }))}
                //     {videos.length && (videos.map(media => {
                //         return <div><video key={media.fileName} src={media.ticketURL} style={{ width: '100%' }} controls type="video/mp4" /></div>
                //     }))} */}
                // </Swiper>
                <Swiper
                    loop={true}
                    spaceBetween={50}
                    // slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {imgs.map(img => {
                        if (img.type==="video") {
                            return <SwiperSlide><video key={img.title} src={img.url} style={{ width: '100%' }} controls type="video/mp4" /></SwiperSlide>
                        }
                        return <SwiperSlide><img key={img.title} src={img.url} width="100%" height="100%" /></SwiperSlide>;
                    })}
                    {/* <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide> */}
                </Swiper>
            );
        }else{
            return (<Swiper
                loop={true}
                spaceBetween={50}
                // slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            ><SwiperSlide><img src='https://lp5-ann19-dsy.dsone.3ds.com:4242/FILES/Picture/no-image.png' style={{width:'100%', height:'100%'}}/></SwiperSlide></Swiper>);
        }
        
    }
}

export default SwiperEdit;
