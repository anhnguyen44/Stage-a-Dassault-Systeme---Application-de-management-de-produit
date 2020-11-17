import SwiperSlide from '../swiper/index';
import { Fragment } from '@wordpress/element';
import ManipulatingSwiper from './manipulatingSwiper';
import CustomBuildSwiper from './customBuildSwiper';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
// export default function save( { attributes } ) {
// 	const {
// 		name3dModel
// 	} = attributes;
// 	return (
// 		<figure>
// 			{ name3dModel && (
// 			<iframe src={name3dModel} referrerPolicy='same-origin'  style={{width:'100%'}}></iframe>
// 		) }

// 		</figure>
// 	);
// }

export default function save({ attributes }) {
	const imgs = ["https://diapogram.com/upload/2018/04/04/20180404153749-c7f16e8a.jpg", "https://images4.alphacoders.com/600/thumb-1920-600912.jpg", "https://wallpaperaccess.com/full/40047.jpg"]
		; const params = {
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
		<figure>
			{/* { (
			
		) } */}
			{/* <SwiperSlide/> */}
			{/* <div className="swiper-wrapper">
				{imgs.map(src => {
					if (src.includes("mp4")) {
						return <div><video key={src} src={src} style={{ width: '100%' }} controls type="video/mp4" /></div>
					}
					return <div><img key={src} src={src} width="100%" height="100%" /></div>;
				})}
			</div>
			<div className="swiper-pagination"></div>
			<Fragment>
				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>
			</Fragment> */}
			{/* <CustomBuildSwiper/> */}
			<div className="swiper-container">
				<div className="swiper-wrapper" style={{width:"100%",height:"100%"}}>
					<div className="swiper-slide">Slide 1</div>
					<div className="swiper-slide">Slide 2</div>
					<div className="swiper-slide">Slide 3</div>
				</div>
				<div className="swiper-pagination"></div>

				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>

				<div className="swiper-scrollbar"></div>
			</div>
		</figure>
	);
}
