import React, { Component } from "react";
import EditorContainer from './editor';
import SwiperSlide from './swiper';
import '../styles/styleStorybook/style.scss';
import { API } from '../api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openPreview, closePreview, publicPost, addPost, changeModel, changeMedias, changeStoredBlocksHtml } from '../actions/index';
import OverviewHTMLComponent from './overviewHTMLComponent';
import * as lodash from 'lodash';
import { Swiper } from 'swiper';
import 'swiper/swiper-bundle.css';
import $ from 'jquery';
import HeaderContainner from './header';
import { serialize, parse } from '@wordpress/blocks';


class AppComponent extends Component {

    constructor(props) {
        super(props);
        this.createNewTemplate = this.createNewTemplate.bind(this);
        this.fetchTemplate = this.fetchTemplate.bind(this);
        this.fetchDataModel = this.fetchDataModel.bind(this);
        this.updateVariable = this.updateVariable.bind(this);
        this.publicPostOverview = this.publicPostOverview.bind(this);
        // this.fetchDataModel();
        // this.props.openPreview();
        this.props.store.dispatch(publicPost());
        this.state = {
            dataTemplate: '',
            storedBlocksHTML: '',
            listDocs: [],
            listImages: [],
            model: '',
            didmount: false,
            listMedias: []
        }
    }

    componentWillMount() {
        console.log("componentWillMount of application");

    }

    componentWillReceiveProps(nextProps) {
        console.log('Hey i wanna updata model');
        console.log("i am componentWillReceiveProps");
    }



    static getDerivedStateFromProps(nextProps, prevState) {
        var that = this;
        // console.log("nextProps", nextProps);
        // console.log("prevState", prevState);
        // this.updateVariable();
        console.log("i am getDerivedStateFromProps")
        // if (JSON.stringify(nextProps.model.member[0]) !== JSON.stringify(prevState.model)) {
        //     console.log("model data changed");
        //     // that.props.store.dispatch(changeModel(nextProps.model.member[0]))
        //     return { model: nextProps.model.member[0] };
        // }
        // else if (JSON.stringify(nextProps.listMedias.data) !== JSON.stringify(prevState.listMedias)) {
        //     // that.props.store.dispatch(changeMedias(nextProps.listMedias.data))
        //     return { listMedias: nextProps.listMedias.data }
        // }
        if (JSON.stringify(nextProps.template) !== JSON.stringify(prevState.dataTemplate)) {
            return { dataTemplate: nextProps.template }
        }
        else return null;
    }

    componentWillMount() {


        // var mySwiper = new Swiper('.swiper-container', {
        //     speed: 400,
        //     spaceBetween: 100,
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //       }
        // });
        // console.log("id of model",this.props.idModel);
        // require(["DS/ENOXModelApp/ModelDefinition/js/GetModelInfo"],function(GetModelInfo){
        //     'use strict'
        //     GetModelInfo.test();
        // })
        // window.getAllModel('https://'+window.location.hostname).then(function(value){
        //     console.log("List models",value);
        // })
        // let scope = "https://"+window.location.hostname;
        // let id = this.props.idModel;
        // console.log("scope",scope);

        // console.log("id",this.props.idModel);
        // window.getModelById(scope,id).then(function(model){
        //     console.log("HAHAHAHAHAHAH Model id "+id,model);
        // })

    }

    componentDidMount() {
        // this.setState({ didmount: !this.state.didmount });
        var that = this;

        console.log("component did mount ==================================");
        this.fetchTemplate();


        // let scope = "https://"+window.location.hostname;
        // let id = this.props.idModel;
        // console.log("scope",scope);
        // window.getModelById(scope,id).then(function(res){
        //     let model = res.member[0];
        //     model.document = new Array();
        //     window.getListIdDocuments(scope,id)
        // })

        // console.log("id",this.props.idModel);
        // console.log("Props of App container", this.props);
        // this.fetchDataModel();

        // this.fetchTemplate().then(function (value) {

        //     if(value.length){
        //         // console.log(value[0]);
        //         // window.localStorage.setItem("getdavesbeBlocks",value[0].data.toString());
        //         that.setState({dataTemplate:value[0].data.toString()})
        //     }

        // });
        // if(this.props.isPreview){
        //     console.log("mode preview");
        //     this.setState({storedBlocksHTML:window.localStorage.getItem( 'getdavesbeBlocks')});
        // }else{
        //     console.log("mode edit");
        //     this.setState({storedBlocksHTML:window.localStorage.getItem( 'template')})
        // }




    }

    updateVariable = async () => {

        let scope = "https://" + window.location.hostname;
        let id = this.props.idModel;
        let model = await window.getModelById(scope, id);
        this.setState({ model: model });

    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps in componentWillReceiveProps", nextProps);
    }

    // componentWillUnmount(){
    //     this.fetchTemplate();
    // }

    componentDidUpdate(prevProps) {
        console.log(this.props.isPreview);

        // console.log("prevProps", prevProps);
        // console.log("Props current", this.props);
        // this.fetchTemplate();

        // if (JSON.stringify(this.props.listMedias.data) !== JSON.stringify(prevProps.listMedias.data)) {
        //     this.setState({ listMedias: this.props.listMedias.data });
        // }

        // console.log(this.props);


        var that = this;

        console.log("component did update");


        // let id = this.props.idModel;
        let scope = "https://" + window.location.hostname;

        // window.getModelById(scope, id).then(function (model) {
        //     console.log("DATA de model", model);
        //     if(model){
        //         // that.setState({model:model});
        //     }
        // })

        // window.getListIdDocuments(scope, id).then(function (list) {

        //     let listImages = [];
        //     let listVideos = [];
        //     let listZips = [];

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




        //     // if(listImages.length){
        //     //     that.setState({images:listImages});
        //     // }
        //     // if(listVideos.length){
        //     //     that.setState({videos:listVideos});
        //     // }
        //     // if(listZips.length){
        //     //     that.setState({zips:listZips});
        //     // }


        // })
        // this.updateVariable();

    }

    fetchDataModel = async () => {
        // console.log("id props", this.props.idModel);
        let scope = "https://" + window.location.hostname;
        let id = this.props.idModel;
        let res = await window.getModelById(scope, id);
        let model = res.member[0];
        model.document = new Array();
        let listDocs = await window.getListIdDocuments(scope, id);
        let certificat = listDocs.csrf.value;
        // console.log("listDocs", listDocs);
        // console.log("certificat", certificat);
        listDocs = listDocs.data;
        for (const doc of listDocs) {
            // console.log("doccccccccccccccccccccccccccccccc ID ",doc.id);
            let file = await window.downloadTicket(scope, doc.id, certificat);
            // console.log('file', file);
            let data = file.data[0].dataelements;
            model.document.push(data);
        }
        console.log("model hfdjhsjkdfhsjkdhfjkshdfjkhsjkdfhkjsdhfjksdh", model);


        let template = await fetch(API + "/template");
        let resTemplate = await template.json();
        let resTemplateReplaced = resTemplate[0].data;
        window.localStorage.setItem("getdavesbeBlocks", resTemplate[0].data);

        let listDocument = [];
        let listImages = [];
        let listVideos = [];
        let listVideosFetch = [];
        if (resTemplate && model) {
            const listKeyOfModel = Object.keys(model);
            // console.log("listKeyOfModel",listKeyOfModel);
            listKeyOfModel.forEach((value) => {
                if (lodash.includes(resTemplateReplaced, '%' + value.toString() + '%')) {
                    resTemplateReplaced = lodash.replace(resTemplateReplaced, new RegExp('%' + value.toString() + '%', "g"), model[value]);
                }
            });
            listImages = lodash.filter(model.document, function (item) {
                if (item.fileName.includes("jpg") || item.fileName.includes("jpeg") || item.fileName.includes("svg") || item.fileName.includes("png") || item.fileName.includes("svg")) {
                    return item;
                }
            })

            listVideos = lodash.filter(model.document, function (item) {
                if (item.fileName.includes("mp4")) {
                    return item;
                }
            })
            listDocument = lodash.filter(model.document, function (item) {
                if (item.fileName.includes("jpg") || item.fileName.includes("jpeg") || item.fileName.includes("svg") || item.fileName.includes("png") || item.fileName.includes("svg") || item.fileName.includes("mp4")) {
                    return item;
                }
                // else if () {
                // var xhr = new XMLHttpRequest(),
                //     blob;

                // xhr.open("GET", item.ticketURL, true);
                // xhr.responseType = "blob";
                // xhr.addEventListener("load",function(){
                //     if(xhr.status === 200){
                //         blob = xhr.response;
                //         var objectURL = URL.createObjectURL(blob);
                //         item.ticketURL = objectURL;

                //     }
                // },false);
                // xhr.send();
                // return item;
                // }
            })
            // console.log("listDocument", listDocument);
            if (listVideos.length) {
                listVideos.forEach(video => {
                    // console.log(video);
                    this.fetchVideo(video.ticketURL).then(function (dataOfVideo) {
                        listVideosFetch.push({ fileName: video.fileName, ticketURL: dataOfVideo });
                        window.localStorage.setItem("videosMedia", JSON.stringify(listVideosFetch));

                    })
                });
            }

        }
        // console.log("Page overview code html", resTemplateReplaced);
        this.setState({ storedBlocksHTML: resTemplateReplaced, listDocs: listDocument, listImages: listImages });
        console.log("model from did mount", model);


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

    fetchTemplate = async () => {
        const fet = await fetch(API + "/template");
        const res = await fet.json();
        console.log('props template', this.props.template);
        let id = this.props.idModel;
        let resTemplateOfModel = await fetch(API + '/model/' + id);
        let templateOfModel = await resTemplateOfModel.json();
        if (!templateOfModel.length) {

            console.log("model id " + id + 'have not template, donc utilise template default');
            // this.props.store.dispatch(addPost(res[0].data.toString()));
            if (res.length) {
                // window.localStorage.setItem("getdavesbeBlocks", res[0].data.toString());
                // this.setState({dataTemplate:res[0].data.toString()});
                this.props.store.dispatch(changeStoredBlocksHtml(res[0].data.toString()))
            }
        } else {
            console.log("dataTemplate", templateOfModel[0].dataBlock);
            let stringRaw = templateOfModel[0].dataBlock
            let stringTemplate = decodeURI(stringRaw);
            stringTemplate = stringTemplate.toString().substring(1, stringTemplate.length - 1);

            // this.props.store.dispatch(addPost(templateOfModel[0].contentsJSON));
            console.log("model id " + id + 'have template dans la database');
            // window.localStorage.setItem("getdavesbeBlocks", templateOfModel[0].dataBlock.toString());
            // this.setState({dataTemplate:stringTemplate});
            this.props.store.dispatch(changeStoredBlocksHtml(stringTemplate))

        }

        return res;


        // console.log("data template from nodejs", res);

    }

    createNewTemplate() {
        const storedBlocks = window.localStorage.getItem('modelData');

        if (storedBlocks && storedBlocks.length) {
            // console.log("storedBlocks", JSON.parse(storedBlocks));
            this.setState({ newTemplate: true });
        }
    }

    publicPostOverview = async () => {
        alert("Public POSt template");
        let templatePOST = window.localStorage.getItem('overview');
        let templateJSON = window.localStorage.getItem('overviewJson');
        if (templatePOST) {
            console.log("TEMPLATE overview", templatePOST);
            const modelId = this.props.idModel;
            const dataBlock = encodeURI(templatePOST);
            const contentsJSON = templateJSON;
            console.log("contentsJSON", contentsJSON);
            const data = { dataBlock, modelId, contentsJSON };


            let option;
            let resTemplateOfModel = await fetch(API + '/model/' + modelId);
            let templateOfModel = await resTemplateOfModel.json();
            if (templateOfModel.length) {
                option = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                };

                const reponse = await fetch(API + '/model/' + modelId, option);
                const data2 = await reponse.json();
                if (data2) {
                    console.log("DATA REPONSE POST TEMPLATE", data2);
                    // this.props.store.dispatch(addPost(templateJSON));
                    this.props.store.dispatch(changeStoredBlocksHtml(templatePOST));
                    this.props.store.dispatch(publicPost());
                }
            } else {
                option = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                };

                const reponse = await fetch(API + '/model', option);
                const data2 = await reponse.json();
                if (data2) {
                    console.log("DATA REPONSE POST TEMPLATE", data2);
                    this.props.store.dispatch(addPost(templateJSON));
                    this.props.store.dispatch(changeStoredBlocksHtml(templatePOST));
                    this.props.store.dispatch(publicPost());
                }
            }
        }

    }

    render() {

        console.log("render");
        // const swiperContainer = document.getElementById("swiper-media-model");
        // if (swiperContainer) {
        //     // console.log("swiper-media-model",swiperContainer);
        //     var mySwiper = new Swiper(swiperContainer, {

        //         loop: true,

        //         // If we need pagination
        //         pagination: {
        //             el: '#swiper-pagination',
        //         },

        //         // Navigation arrows
        //         navigation: {
        //             nextEl: '#swiper-button-next',
        //             prevEl: '#swiper-button-prev',
        //         },

        //         // And if we need scrollbar
        //         scrollbar: {
        //             el: '#swiper-scrollbar',
        //         },
        //     })
        // }
        // console.log("document",document.getElementsByClassName("swiper-container"));



        let { dataTemplate, storedBlocksHTML, listDocs, listImages, model, didmount, listMedias } = this.state;
        // console.log("HTML overview", storedBlocksHTML);
        // console.log("listDocs",listDocs);
        window.localStorage.setItem("mediaModel", JSON.stringify(listDocs));
        window.localStorage.setItem("imagesMedia", JSON.stringify(listImages));

        let page = null;
        let editor = null;
        // const editor = <EditorContainer storedBlocksHTML={storedBlocksHTML} />;
        const buttonNewTemplate = <button onClick={this.createNewTemplate} type="button" className="btn-primary btn btn-root" style={{ margin: '100px auto', display: 'block' }}>Create new overview</button>
        if (dataTemplate) {
            // page = editor;
            editor = <EditorContainer storedBlocksHTML={dataTemplate} publicPostOverview={this.publicPostOverview} />
        }
        window.localStorage.setItem("overview", storedBlocksHTML);




        // ===============Medias and model===============
        // console.log('DATA OF model in render ', model);
        // console.log('DATA OF list Medias in render ', listMedias);



        // ===============End Medias and model===============


        // console.log("template of model is ",dataTemplate);

        return (
            <div>
                {/* {page} */}
                {/* <HeaderContainner /> */}
                {/* {editor} */}

                {/* <EditorContainer storedBlocksHTML={dataTemplate} publicPostOverview={this.publicPostOverview} /> */}
                <EditorContainer publicPostOverview={this.publicPostOverview} />

                {/* {listDocs.length && (<SwiperSlide imgs={listDocs} />)} */}
                {/* <OverviewHTMLComponent html={dataTemplate} /> */}
            </div>

        );
    }
}

function mapStateToProps(state, ownProps) {
    // console.log("Own props of app container", ownProps);

    return {
        isPreview: state.isPreview.isPreview,
        template: state.template
    }
}

AppComponent = connect(mapStateToProps)(AppComponent);


export default AppComponent;