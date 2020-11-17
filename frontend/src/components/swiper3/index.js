/**
 * BLOCK: UAGB - Section Edit Class
 */

// Import classes
import React from 'react';
import {
    Component,
} from "@wordpress/element";
import Swiper from 'react-id-swiper';


class Swiper3 extends Component {

   
    componentDidMount() {

    }


    render() {
        // const params = {
        //     pagination: '.swiper-pagination',
        //     paginationClickable: true,
        //     nextButton: '.swiper-button-next',
        //     prevButton: '.swiper-button-prev',
        //     spaceBetween: 30
        // };
        const imgs = ["https://diapogram.com/upload/2018/04/04/20180404153749-c7f16e8a.jpg", "https://images4.alphacoders.com/600/thumb-1920-600912.jpg", "https://wallpaperaccess.com/full/40047.jpg", "https://drtbebqlk4bjh.cloudfront.net/21xFD01/assets/2A1EBB56641400003125A95EABCE0D00/2A1EBB56641400003125A95EABCE0D00_processexperiences_video_1.mp4"];
        const params = {
            pagination: '.swiper-pagination',
            effect: 'cube',
            grabCursor: true,
            cube: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94
            }
        }
        return (
            <Swiper {...params}>

                {imgs.map(src => {
                    if (src.includes("mp4")) {
                        return <div><video key={src} src={src} style={{ width: '100%' }} controls type="video/mp4" /></div>
                    }
                    return <div><img key={src} src={src} width="100%" height="100%" /></div>;
                })}
            </Swiper>
        )
            ;
    }
}

export default Swiper3;
