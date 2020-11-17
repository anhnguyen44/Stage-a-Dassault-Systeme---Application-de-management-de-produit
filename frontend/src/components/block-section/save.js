/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"

import { Fragment } from '@wordpress/element';

import {
	InnerBlocks
} from '@wordpress/block-editor';
import { upperFirst } from "lodash";
import Section from './section-tag';
import styling from "./styling";
import stylingForView from './stylingForView';


export default function save( props ) {

	const { attributes, className } = props
	let urlVideo='';
	let urlImage='';

	const {
		block_id,
		tag,
		backgroundType,
		backgroundVideo,
		contentWidth,
		align,
		imageMediaBackground,
		backgroundColor,
		backgroundOpacity,
		classMigrate
	} = props.attributes

	console.log(stylingForView(props));

	let block_controls_class = ""

	if ( "full_width" == contentWidth ) {

		if ( align == "wide" || align == "full" ) {
			block_controls_class = "align" + align
		}
	}

	const CustomTag = `${tag}`

	if(backgroundType==="video"){
		console.log("background is video");
	}

	if(backgroundType==="color"){
		console.log("background is color");
		if(backgroundColor){
			console.log("background color is ",backgroundColor);
		}
	}

	if(backgroundOpacity){
		console.log("background opacity is ",backgroundOpacity);
	}

	if(block_id){
		console.log("classMigrate",classMigrate)
		console.log("BLOCK ID MODE SAVE BLOCK SECTION",block_id);
		console.log("props.clientId",props.clientId);

		const $style = document.createElement("style")
		$style.setAttribute("id", "uagb-block-" + block_id)
		$style.innerHTML = stylingForView(props)
		document.head.appendChild($style)
	}

	// const getUrlImage = async ()=>{
	// 	if(imageMediaBackground){
	// 		let doc = await window.downloadTicket(imageMediaBackground.scope, imageMediaBackground.id, imageMediaBackground.certificat);
	// 		if(doc){

	// 				let url = doc.data[0].dataelements.ticketURL;
	// 				let ticket = await fetchVideo(url);
	// 				return ticket;


	// 		}
	// 	}
	// }

	// getUrlImage().then(function(url){
	// 	console.log("BLOB ticket",url);
	// 	urlImage = url;
	// })

	let url = '';

	// let backgroundImageId = window.localStorage.getItem("backgroundImageId");
	// console.log("backgroundImageId 123",backgroundImageId);
	
	if(imageMediaBackground){
		window.localStorage.setItem('backgroundImageId',imageMediaBackground.id);
		console.log("imageMediaBackground id", imageMediaBackground.id);
		// let listMedias = JSON.parse(window.localStorage.getItem('listMediasBackground'));
		// let urlObj = listMedias?listMedias.filter(media=>media.id === imageMediaBackground.id):[];

		// if(urlObj.length){
		// 	url = urlObj[0].url
		// 	window.localStorage.setItem('backgroundImage',url);
		// }

	}


	return (
		<CustomTag
			className={ classnames(
				className,
				"uagb-section__wrap",
				`uagb-section__background-${backgroundType}`,
				block_controls_class,
				`uagb-block-${block_id}`
			) }
		>
			<div className="uagb-section__overlay"></div>
			{ "video" == backgroundType && 
				<div className="uagb-section__video-wrap">
					<video autoplay loop muted playsinline>
						<source src='https://lp5-ann19-dsy.dsone.3ds.com:4242/GetVideo?path=/Video/backgroundBMW.mp4' type='video/mp4' />
					</video>
				</div>
			}
			{ "image" == backgroundType &&
				<div className="uagb-section__image-wrap" id="imageBackground">
					{/* <img src={url} style={{ width: '100%', height: '100%' }} /> */}
				</div>
			}
			{/* { "image" == backgroundType &&
				<div className="uagb-section__image-wrap">
					<img src="https://wallpapercave.com/wp/8TSLMWC.jpg" style={{ width: '100%', height: '100%' }} />
				</div>
			} */}
			{/* { "color" == backgroundType && 

			} */}
			<div className="uagb-section__inner-wrap">
				<InnerBlocks.Content />
			</div>
		</CustomTag>
	)
	
}


function fetchVideo(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.blob())
            .then(function (myBlob) {
                var objectURL = URL.createObjectURL(myBlob);
                resolve(objectURL);
            });
    })
}
