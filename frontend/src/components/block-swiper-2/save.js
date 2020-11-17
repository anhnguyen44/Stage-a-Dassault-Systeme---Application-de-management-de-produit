
// import Swiper2 from "../swiper2";
export default function save({ attributes }) {
    const imgs = ["https://diapogram.com/upload/2018/04/04/20180404153749-c7f16e8a.jpg", "https://images4.alphacoders.com/600/thumb-1920-600912.jpg", "https://wallpaperaccess.com/full/40047.jpg", "https://drtbebqlk4bjh.cloudfront.net/21xFD01/assets/2A1EBB56641400003125A95EABCE0D00/2A1EBB56641400003125A95EABCE0D00_processexperiences_video_1.mp4"];
    // let imgs = JSON.parse(window.localStorage.getItem("imagesMedia"));
    // let videos = JSON.parse(window.localStorage.getItem("videosMedia"));
    

    // let {
	// 	imgs,videos
    // } = attributes;
    
    // imgs = imgs?JSON.parse(imgs):[];
    // videos = videos?JSON.parse(videos):[];
    // console.log("images",imgs);
    // console.log("videos",videos);
    

    return (
        <div className="swiper-container" id="swiper-media-model">
            <div className="swiper-wrapper" id="swiper-wrapper-media">
                {/* {imgs.map(src => {
                    if (src.includes("mp4")) {
                        return <div className="swiper-slide"><video key={src} src={src} style={{ width: '100%' }} controls type="video/mp4" /></div>
                    }
                    return <div className="swiper-slide"><img key={src} src={src} width="100%" height="100%" /></div>;
                })} */}
{/* 
                {imgs.length && (imgs.map(media => {
                    return <div className="swiper-slide"><img key={media.fileName} src={media.ticketURL} width="100%" height="100%" /></div>;

                }))}
                {videos.length && (videos.map(media => {
                    return <div className="swiper-slide"><video key={media.fileName} src={media.ticketURL} style={{ width: '100%' }} controls type="video/mp4" /></div>
                }))} */}
            </div>
            <div className="swiper-pagination" id="swiper-pagination-id"></div>

            <div className="swiper-button-prev" id="swiper-prev"></div>
            <div className="swiper-button-next" id="swiper-next"></div>

        </div>
    );
}
