import React, { Component } from "react";
import * as lodash from 'lodash';
import $ from 'jquery';
import { Swiper } from 'swiper';
import './styles.scss';

class HtmlElement extends Component {

    constructor(props) {
        super(props);
        this.combineTemplate = this.combineTemplate.bind(this);
        this.fetchVideo = this.fetchVideo.bind(this);
        this.state = {
            html: '',
            htmlMedia: ''
        }
    }

    componentDidMount() {
        const swiperContainer = document.getElementById("swiper-media-model");
        this.combineTemplate(this.props.htmlCode, this.props.model);
        console.log("DID MOUNT");
        $("#swiper-wrapper-media").html('');
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps page OVERVIEW componentWillReceiveProps", nextProps);
        // console.log("ALO MODEL CHANGE");
        this.combineTemplate(nextProps.htmlCode, nextProps.model);
        if (nextProps.htmlMedia !== this.state.htmlMedia) {
            this.setState({ htmlMedia: nextProps.htmlMedia });
        }
    }

    fetchVideo(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest(),
                blob;

            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.addEventListener("load", function () {
                if (xhr.status === 200) {
                    blob = xhr.response;
                    var objectURL = URL.createObjectURL(blob);
                    resolve(objectURL);
                }
            }, false);
            xhr.send();
        })
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("nextProps page OVERVIEW",nextProps);
    //     // console.log('Prevprops of PAGE OVERVIEW',prevState);
    //     if (nextProps.htmlMedia !== prevState.htmlMedia) {
    //         // console.log("props data changed");
    //         return { htmlMedia: nextProps.htmlMedia };
    //     }
    //     else {
    //         console.log("DOCUMENT ",$("#swiper-wrapper-media"));
    //         return null;
    //     };
    // }  

    componentDidUpdate(preProps) {
        let name = '';
        let chainModel3D = '';
        let containerBackground = document.getElementById("imageBackground");
        console.log("containerBackground", containerBackground);
        if (containerBackground) {

            let imgId = window.localStorage.getItem('backgroundImageId');
            if (imgId) {
                let listMedias = JSON.parse(window.localStorage.getItem('listMediasBackground'));
                let urlObj = listMedias ? listMedias.filter(media => media.id === imgId) : [];
                if (urlObj.length) {
                    containerBackground.innerHTML = "<img src=" + urlObj[0].url + " style={{ width: '100%', height: '100%' }} />"
                }
            }

            // let urlImg = window.localStorage.getItem('backgroundImage');
            // console.log("IMG URL",urlImg);

            // if(urlImg){
            //     containerBackground.innerHTML = "<img src="+urlImg+" style={{ width: '100%', height: '100%' }} />"
            // }

            // let img = document.createElement('img');
            // urlImg?img.setAttribute("src",urlImg):img.setAttribute('src','');
            // img.setAttribute("style", "width: 100%;height:100%")
            // containerBackground.innerHTML = img;
        }

        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.addEventListener('message', event => {
                // console.log('Hey Nguyen', event.data);

                if (event.data !== name) {
                    name = event.data;
                    // console.log("Hey nguyen chaizo fighting ",name);
                    let container = document.getElementById('media3DModel');
                    let containerMedia3DModel = window.localStorage.getItem('media3DModelTemporary');
                    if (containerMedia3DModel) {
                        if (containerMedia3DModel !== "<div class='swiper-slide'><iframe src=" + name + " referrerPolicy='same-origin'  style='width:100%;height:400px'></iframe></div>") {
                            window.localStorage.setItem("media3DModelTemporary", "<div class='swiper-slide'><iframe src=" + name + " referrerPolicy='same-origin'  style='width:100%;height:400px'></iframe></div>")
                            chainModel3D += "<div class='swiper-slide'><iframe src=" + name + " referrerPolicy='same-origin'  style='width:100%;height:400px'></iframe></div>";
                        } else {
                            chainModel3D += containerMedia3DModel;
                        }
                    } else {
                        window.localStorage.setItem("media3DModelTemporary", "<div class='swiper-slide'><iframe src=" + name + " referrerPolicy='same-origin'  style='width:100%;height:400px'></iframe></div>")
                        chainModel3D += "<div class='swiper-slide'><iframe src=" + name + " referrerPolicy='same-origin'  style='width:100%;height:400px'></iframe></div>";
                    }

                    if (chainModel3D) {
                        let codeHTML = "<div class='swiper-wrapper'>" + chainModel3D + "</div><div class='swiper-pagination'></div><div class='swiper-button-prev'></div><div class='swiper-button-next'></div>"
                        if (container) {
                            container.innerHTML = codeHTML;
                            container.setAttribute('class', 'swiper-container');
                            window.localStorage.setItem("media3DModelTemporaryHTML", codeHTML);

                            var mySwiper = new Swiper(container, {

                                speed: 500,

                                // If we need pagination
                                pagination: {
                                    el: '.swiper-pagination',
                                },

                                // Navigation arrows
                                navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                },

                                // And if we need scrollbar

                            })
                        }

                    }


                } else {
                    name = '';
                }

                // if (event.data === "Hi client, stoké") {
                //     const label = selectedOption.label.split('.')[0];
                //     const url = window.dsDefaultWebappsBaseUrl + "Overview/DataCache/" + label + "/" + label.replace("Bundle", "") + ".html";
                //     console.log("url", url);
                //     const { attributes, setAttributes } = this.props;
                //     const { name3dModel } = attributes;
                //     setAttributes({ name3dModel: url });
                //     that.setState({ loading: false, success: true });

                // }
            });

        }
        let containerMedia3DModelTemporary = window.localStorage.getItem('media3DModelTemporaryHTML');
        let ZipNo = window.localStorage.getItem('ZipNo');
        if (containerMedia3DModelTemporary) {
            let container = document.getElementById('media3DModel');
            if (container) {
                container.setAttribute('class', 'swiper-container');
                container.innerHTML = containerMedia3DModelTemporary;
                var mySwiper = new Swiper(container, {

                    speed: 500,

                    // If we need pagination
                    pagination: {
                        el: '.swiper-pagination',
                    },

                    // Navigation arrows
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    // And if we need scrollbar

                })
            }
        } else {
            if (document.getElementById('media3DModel')) {
                document.getElementById('media3DModel').innerHTML = "<div class='lds-hourglass' id='loading3DModel'></div>"
                if (ZipNo == "yes") {
                    document.getElementById('media3DModel').innerHTML = "";
                }
            }
            // document.getElementById('media3DModel').innerHTML = "<div class='lds-hourglass' id='loading3DModel'></div>"
            // if (ZipNo == "yes") {
            //     document.getElementById('media3DModel').innerHTML = "";
            // }
            // let check = window.localStorage.getItem('ZipNo');
            // if(check === 'true'){
            //     document.getElementById('media3DModel').innerHTML = "";
            // }else{

            // }

        }






        $("#swiper-wrapper-media").html(null);
        // console.log("PREVPROPS",preProps);
        // console.log('ACtual props',this.props);

        // if(this.props.htmlMedia!==preProps.htmlMedia){
        //     console.log("Media html changed");
        // }else{
        //     console.log('Media html same');
        // }
        // var that = this;
        // if(this.state.htmlMedia===this.props.htmlMedia){
        //     console.log("SAME Media html");
        //     console.log(this.props.htmlMedia);
        // }

        var node = document.createElement("p");                 // Create a <li> node
        var textnode = document.createTextNode("Water");         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        // document.getElementById("swiper-wrapper-media").innerHTML="<p>TEST INNER HTML</p>";


        let lengthListMedias = this.props.listMedias.length;
        if (this.props.htmlMedia && lengthListMedias) {

            let g = document.createElement('div');
            g.setAttribute("class", "swiper-wrapper");
            g.innerHTML = this.props.htmlMedia;

            let g1 = document.createElement('div');
            g1.setAttribute("class", "swiper-pagination");

            let g2 = document.createElement('div');
            g2.setAttribute("class", "swiper-button-prev");

            let g3 = document.createElement('div');
            g3.setAttribute("class", "swiper-button-next");



            $("#swiper-wrapper-media").html(this.props.htmlMedia);
            console.log($('.swiper-container'));

            var mySwiper = new Swiper(document.getElementById("swiper-media-model"), {

                loop: true,
                speed: 500,

                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // And if we need scrollbar

            })



            // for (const iterator of this.props.listMedias) {
            //     console.log("iterator",iterator);
            // }


            // this.props.listMedias.forEach((media,index) => {
            // console.log("INDEX ",index);
            // let title = media.relateddata.files[0].dataelements.title;
            // let scope = "https://" + window.location.hostname;
            // console.log("ola here is certificat",this.props.certificat);
            // let certificat = this.props.certificat;

            // console.log("FETCH VIDEO with certificat " + certificat + " and media id" + media.id);

            // window.downloadTicket(scope, media.id, certificat).then(function (value) {
            //     // console.log("value of videos", value.data[0].dataelements.ticketURL);
            //     let url = value.data[0].dataelements.ticketURL;


            //     console.log("URL", url);

            // if (title.includes("jpg") || title.includes("jpeg") || title.includes("svg") || title.includes("png") || title.includes("svg")) {
            //     if (htmlMedia === '') {
            //         htmlMedia = "<div class='swiper-slide'><img src=" + url + " style='width : 100%; height:100%'/></div>";
            //     } else {
            //         htmlMedia += "<div class='swiper-slide'><img src=" + url + " style='width : 100%; height:100%'/></div>";

            //     }
            // }
            // if (title.includes("mp4")) {
            //     if (htmlMedia === '') {
            //         htmlMedia = "<div class='swiper-slide'><video src=" + url + " style='width : 100%' controls  type='video/mp4'/></div>";
            //     } else {
            //         htmlMedia += "<div class='swiper-slide'><video src=" + url + " style='width : 100%' controls  type='video/mp4'/></div>";

            //     }
            // }


            //     if(index === lengthListMedias-1){
            //         $("#swiper-wrapper-media").html(htmlMedia);
            // let swiperContainer = document.getElementById("swiper-media-model");
            // var mySwiper = new Swiper(swiperContainer, {

            //     loop: true,

            //     // If we need pagination
            //     pagination: {
            //         el: '.swiper-pagination-id',
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
            // }






            //     // that.fetchVideo(url).then(function(ticketURL){
            //     //     console.log("ticketURL",ticketURL);
            //     //     if(ticketURL){
            //     //         if (htmlMedia === '') {
            //     //             htmlMedia = "<div class='swiper-slide'><video src=" + ticketURL + " style='width : 100%' controls  type='video/mp4'/></div>";
            //     //             // $("#swiper-wrapper-media").html(htmlMedia);
            //     //         } else {
            //     //             htmlMedia += "<div class='swiper-slide'><video src=" + ticketURL + " style='width : 100%' controls  type='video/mp4'/></div>";
            //     //             // $("#swiper-wrapper-media").html(htmlMedia);
            //     //         }
            //     //     }

            //     //     // $("#swiper-wrapper-media").html(htmlMedia);

            //     // })

            // })

            // if (title.includes("jpg") || title.includes("jpeg") || title.includes("svg") || title.includes("png") || title.includes("svg")) {
            //     if (htmlMedia === '') {
            //         htmlMedia = "<div class='swiper-slide'><img src=" + media.dataelements.image + " style='width : 100%; height:100%'/></div>";
            //     } else {
            //         htmlMedia += "<div class='swiper-slide'><img src=" + media.dataelements.image + " style='width : 100%; height:100%'/></div>";

            //     }
            // }
            // if (title.includes("mp4")) {

            // }
            // console.log("media", media);

            // })


        } else {
            $("#swiper-wrapper-media").html("<div class='swiper-slide'><img src='https://lp5-ann19-dsy.dsone.3ds.com:4242/FILES/Picture/no-image.png' style='width : 100%; height:100%'/></div>");
        }
        // const swiperContainer = document.getElementById("swiper-media-model");
        // var mySwiper = new Swiper(swiperContainer, {

        //     loop: true,

        //     // If we need pagination
        //     pagination: {
        //         el: '#swiper-pagination',
        //     },

        //     // Navigation arrows
        //     navigation: {
        //         nextEl: '#swiper-button-next',
        //         prevEl: '#swiper-button-prev',
        //     },

        //     // And if we need scrollbar
        //     scrollbar: {
        //         el: '#swiper-scrollbar',
        //     },
        // })
    }

    combineTemplate(htmlCode, model) {
        // console.log("combineModelTemplate");
        if (htmlCode && model) {
            // console.log("combineModelTemplate2");
            console.log("HTML CODE END", htmlCode);
            console.log("MODEL END", model);

            let htmlReplaced = htmlCode;
            const listKeyOfModel = Object.keys(model);
            // console.log("listKeyOfModel",listKeyOfModel);
            listKeyOfModel.forEach((value) => {
                if (lodash.includes(htmlReplaced, '%' + value.toString() + '%')) {
                    htmlReplaced = lodash.replace(htmlReplaced, new RegExp('%' + value.toString() + '%', "g"), model[value]);
                    // console.log("htmlReplaced",htmlReplaced);
                }
            });
            this.setState({ html: htmlReplaced });
        }
        let swiperContainer = document.getElementById("swiper-media-model");
        // console.log("swiperContainer", swiperContainer);
    }

    render() {
        let { html } = this.state;
        // console.log('html',html);

        let template = null;
        if (html) {
            template = <div dangerouslySetInnerHTML={{ __html: html }} style={{ width: '100%', margin: "0px auto" }} id="preview" />
        }

        return (
            // <div dangerouslySetInnerHTML={{ __html: htmlCodeReplaced }} style={{ width: '100%', margin: "0px auto" }} id="preview" />   
            <div>
                {template}
                {/* <div class="lds-facebook"><div></div><div></div><div></div></div> */}
            </div>
        );

    }
}




export default HtmlElement;