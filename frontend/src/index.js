import React from "react";
import ReactDOM from "react-dom";
import AppContainner from "./components/App.js"
import AppComponent from "./components/AppComponent.js"
import { registerCoreBlocks } from "@wordpress/block-library";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers';
// import Swiper from 'react-id-swiper';
import * as lodash from 'lodash';
import { changeModel, changeMedias, changeCertificat, changeHtmlMedia,changeStoredBlocksHtml } from './actions/index';
import CustomBuildSwiper from './components/swiper4';
import $ from 'jquery';

const store = createStore(appReducer);

registerCoreBlocks();




async function renderApp(id) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
          if (registrations.length) {
            console.log("registration existed", registrations);
          } else {
            navigator.serviceWorker
              .register(window.dsDefaultWebappsBaseUrl + "Overview/serviceWorker.js")
              .then(function (registration) {
                console.log("Service worker registered", registration);
              })
              .catch(function (err) {
                console.log("Service worker failed to register", err);
              })
          }
        })
      }
    console.log("id of model", id);
    let scope = "https://" + window.location.hostname;

    let idModelFromLocalStoc = window.localStorage.getItem('idModel');
    if(idModelFromLocalStoc){
        if(idModelFromLocalStoc!==id){
            window.localStorage.setItem('idModel',id);
            window.localStorage.setItem('media3DModelTemporary','');
            window.localStorage.setItem('media3DModelTemporaryHTML','');
            store.dispatch(changeStoredBlocksHtml(''));
        }
    }else{
        window.localStorage.setItem('idModel',id);
        window.localStorage.setItem('media3DModelTemporary','');
        window.localStorage.setItem('media3DModelTemporaryHTML','');
    }
    

    let modelData = await window.getModelById(scope, id);
    console.log("Model DATA",modelData);
    let listMedias = await window.getListIdDocuments(scope, id);
    let certificat = listMedias.csrf.value;
    let listBlob = [];
    window.localStorage.setItem('listImageForEditSwiper',[]);
    let htmlMedia = '';
    let listZips = [];
    let listZipsRaw = [];
    let listMediasBackground = [];
    // store.dispatch(changeStoredBlocksHtml(''));

    let checkExistZip = lodash.filter(listMedias.data, function (o) {
        let title = o.relateddata.files[0].dataelements.title;
        return title.includes('zip');
    })
    if(!listMedias.data.length || !checkExistZip.length){
        console.log('Des documents sont not exité');
        window.localStorage.setItem('media3DModelTemporaryHTML','');
        window.localStorage.setItem('ZipNo','yes');
        // $("#loading3DModel").css("visibility", "hidden");
        // document.getElementById("loading3DModel").setAttribute("style", "visibility:hidden; border: 1px solid blue;");
    }else{
        window.localStorage.setItem('media3DModelTemporaryHTML','');

        // document.getElementById("media3DModel").innerHTML = "<div class='lds-hourglass' id='loading3DModel'></div>"
        // $("#loading3DModel").css("visibility", "visible");
        window.localStorage.setItem('ZipNo','no');
    }
    // window.localStorage.setItem('overview','')
    // window.localStorage.setItem('overviewJson','')
    


    ReactDOM.render(
        <Provider store={store}>
            <AppComponent idModel={id} store={store} />
            {/* <AppContainner idModel={id}/> */}
        </Provider>
        // <CustomBuildSwiper/>
        , document.getElementById("_4"));

    
    

    // if(!checkExistZip.length || !listMedias.length){
    //     console.log('Des documents sont not exité');
    //     window.localStorage.setItem('media3DModelTemporaryHTML','');
    //     // $("#loading3DModel").css("visibility", "hidden");
    //     // document.getElementById("loading3DModel").setAttribute("style", "visibility:hidden; border: 1px solid blue;");
    // }else{
    //     // document.getElementById("media3DModel").innerHTML = "<div class='lds-hourglass' id='loading3DModel'></div>"
    //     // $("#loading3DModel").css("visibility", "visible");

    // }
    store.dispatch(changeHtmlMedia(''));

    

    
    
    

    listMedias.data.forEach(async (media) => {
        let title = media.relateddata.files[0].dataelements.title;
        if (title.includes("jpg") || title.includes("jpeg") || title.includes("svg") || title.includes("png") || title.includes("svg") || title.includes('mp4')) {
            
            let doc = await window.downloadTicket(scope, media.id, certificat);
            if (doc) {
                const url = doc.data[0].dataelements.ticketURL;
                // var xhr = new XMLHttpRequest(),
                //     blob;

                // xhr.open("GET", url, true);
                // xhr.responseType = "blob";
                // xhr.addEventListener("load", function () {
                //     if (xhr.status === 200) {
                //         blob = xhr.response;
                //         var objectURL = URL.createObjectURL(blob);
                //         console.log("MEDIA of index page", objectURL);
                //         console.log(media);
                //         let title = media.relateddata.files[0].dataelements.title
                //         if (!title.includes("mp4")){
                //             listBlob.push({type:'image',url:objectURL});
                //             console.log("IMAGE IMAGE IMAGE IMAGE");

                //         }else{
                //             listBlob.push({type:'video',url:objectURL});
                //             console.log("VIDEO VIDEO VIDEO");
                //         }
                //     }
                // }, false);
                // xhr.send();
                let ticketURL = await fetchVideo(url);
                listMediasBackground.push({title:title,scope:scope,id:media.id,certificat:certificat,url:ticketURL});
                window.localStorage.setItem("listMediasBackground",JSON.stringify(listMediasBackground));
                if (!title.includes("mp4")) {
                    listBlob.push({ type: 'image', url: ticketURL, title: title });
                    // console.log("IMAGE IMAGE IMAGE IMAGE");


                    // store.dispatch(changeListBlob(listBlob));

                } else {
                    listBlob.push({ type: 'video', url: ticketURL, title: title });
                    // console.log("VIDEO VIDEO VIDEO");
                    // store.dispatch(changeListBlob(listBlob));

                }
                console.log("list blob", listBlob);



                let listImageVideo = lodash.filter(listMedias.data, function (o) {
                    let title = o.relateddata.files[0].dataelements.title;
                    return title.includes("jpg") || title.includes("jpeg") || title.includes("svg") || title.includes("png") || title.includes("svg") || title.includes('mp4');
                })


                console.log("listImageVideo.length", listImageVideo.length);

                console.log("listblob", listBlob.length);

                if (listBlob.length === listImageVideo.length) {
                    window.localStorage.setItem('listImageForEditSwiper',JSON.stringify(listBlob));
                    // store.dispatch(changeListBlob(listBlob));
                    listBlob.forEach((media) => {
                        if (media.type === "image") {
                            htmlMedia += "<div class='swiper-slide'><img src=" + media.url + " style='width : 100%; height:100%'/></div>";

                            // if (htmlMedia === '') {
                            //     htmlMedia = "<div class='swiper-slide'><img src=" + media.url + " style='width : 100%; height:100%'/></div>";
                            // } else {
                            //     htmlMedia += "<div class='swiper-slide'><img src=" + media.url + " style='width : 100%; height:100%'/></div>";

                            // }
                        }
                        if (media.type === "video") {
                            htmlMedia += "<div class='swiper-slide'><video src=" + media.url + " style='width : 100%' controls  type='video/mp4'/></div>";
                            // if (htmlMedia === '') {
                            //     htmlMedia = "<div class='swiper-slide'><video src=" + media.url + " style='width : 100%' controls  type='video/mp4'/></div>";
                            // } else {
                            //     htmlMedia += "<div class='swiper-slide'><video src=" + media.url + " style='width : 100%' controls  type='video/mp4'/></div>";

                            // }
                        }
                    })
                    console.log('HTML MEDIA STRING', htmlMedia)
                    store.dispatch(changeHtmlMedia(htmlMedia));
                }


            }
        }else if(title.includes('zip')){
            console.log("File "+title,media);
            let doc = await window.downloadTicket(scope, media.id, certificat);
            if(doc){
                let url = doc.data[0].dataelements.ticketURL;
                const label = title.split('.')[0];
                const urlIframe = window.dsDefaultWebappsBaseUrl + "Overview/DataCache/" + label + "/" + label.replace("Bundle", "") + ".html";
                listZips.push({name:title,url:urlIframe});
                listZipsRaw.push({name:title,url:url,id:media.id,certificat:certificat});
                window.localStorage.setItem('listZips',JSON.stringify(listZips));
                window.localStorage.setItem('listZipsRaw',JSON.stringify(listZipsRaw));
               
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(registrations => {
                        console.log("resgistion message", registrations);
                        registrations[0].active.postMessage({
                            'type': 'CHANGENAMECACHE2',
                            'name': id
                        });
                        registrations[0].active.postMessage({
                            'type': 'ticketUrl2',
                            'ticketUrl':url,
                            'name':urlIframe
                        });
                        
                    });
                    // var temp = 0;
                    // navigator.serviceWorker.addEventListener('message', event => {
                    //     // event is a MessageEvent object
                    //     // console.log(`The service worker sent me a message: ${event.data}`);
                    //     console.log('SW send to client data',event.data);
                    // });
                }
            }

        }

    });
    // console.log("LIST BLOB", listBlob);
    console.log("CERTIFICAT", listMedias);
    // console.log("STRING HTML ", htmlMedia);
    // let model = await modelData.member[0];
    store.dispatch(changeModel(modelData.member[0]));
    store.dispatch(changeMedias(listMedias.data));
    
    store.dispatch(changeCertificat(listMedias.csrf.value));



    // window.getListIdDocuments(scope, id).then(function (list) {



    //     lodash.filter(list.data, function (item) {
    //         let title = item.relateddata.files[0].dataelements.title;
    //         if (title.includes("jpg") || title.includes("jpeg") || title.includes("svg") || title.includes("png") || title.includes("svg")) {
    //             listImages.push({ id: item.id, name: title })
    //         }
    //     })

    //     lodash.filter(list.data, function (item) {
    //         let title = item.relateddata.files[0].dataelements.title;
    //         if (title.includes("mp4")) {
    //             listVideos.push({ id: item.id, name: title });
    //         }
    //     })


    //     lodash.filter(list.data, function (item) {
    //         let title = item.relateddata.files[0].dataelements.title;
    //         if (title.includes("zip")) {
    //             listZips.push({ id: item.id, name: title });
    //         }
    //     })
    // })


    // return ReactDOM.render(
    //     <Provider store={store}>
    //         <AppComponent idModel={id} model={modelData} listMedias={listMedias} store={store} />
    //         {/* <AppContainner idModel={id}/> */}
    //     </Provider>
    //     // <CustomBuildSwiper/>
    //     , document.getElementById("_4"));
}

function fetchVideo(url) {
    return new Promise((resolve, reject) => {
        // var xhr = new XMLHttpRequest(),
        //     blob;

        // xhr.open("GET", url, true);
        // xhr.responseType = "blob";
        // xhr.addEventListener("load", function () {
        //     if (xhr.status === 200) {
        //         blob = xhr.response;
        //         var objectURL = URL.createObjectURL(blob);
        //         resolve(objectURL);
        //     }
        // }, false);
        // xhr.send();
        fetch(url)
            .then(response => response.blob())
            .then(function (myBlob) {
                var objectURL = URL.createObjectURL(myBlob);
                resolve(objectURL);
            });
    })
}

// renderApp();

// window['renderApp'] = renderApp();
global.renderApp = renderApp;
// window.Swiper = Swiper;