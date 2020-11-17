import React, { Component } from "react";
import { Swiper } from 'swiper';
import '../editor/stylePreview.css';
import { useEffect, useState, useMemo } from '@wordpress/element';
import { connect } from 'react-redux';
import * as lodash from 'lodash';
import HtmlElement from '../htmlElement';


class OverviewHTMLComponent extends Component {
    state = {
        htmlCode: '',
        model:'',
        listMedias:[],
        htmlCodeReplaced:'',
        certificat:'',
        htmlMedia:''
    }
    constructor(props) {
        super(props);
        this.initState = this.initState.bind(this);
        this.combineModelTemplate = this.combineModelTemplate.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log("nextProps page OVERVIEW",nextProps);
        // console.log('Prevprops of PAGE OVERVIEW',prevState);
        if (nextProps.html !== prevState.htmlCode) {
            console.log("HTML HTML data changed",nextProps.html);
            return { htmlCode: nextProps.html };
        }else if(JSON.stringify(nextProps.model)!==JSON.stringify(prevState.model)){
            return  { model:nextProps.model }
        }else if(JSON.stringify(nextProps.listMedias)!==JSON.stringify(prevState.listMedias)){
            return {listMedias:nextProps.listMedias}
        }else if(JSON.stringify(nextProps.htmlMedia)!==JSON.stringify(prevState.htmlMedia)){
            return {htmlMedia:nextProps.htmlMedia}
        }else if(nextProps.certificat !== prevState.certificat){
            return {certificat:nextProps.certificat}
        }
        else return null;
    }  

    componentWillMount(){
        
    }

    initState(){
        // console.log("STATE OVERVIEW",this.state);
        // console.log("PROPS OVERVIEW",this.props);
        if(this.props.model && this.state.model ===''){
            this.setState({model:this.props.model})
        }
        if(this.props.listMedias.length && !this.state.listMedias.length){
            this.setState({listMedias:this.props.listMedias});
        }
        if(this.props.htmlMedia && this.state.htmlMedia===''){
            this.setState({htmlMedia:this.props.htmlMedia});
        }
        if(this.props.certificat && this.state.certificat===''){
            this.setState({certificat:this.props.certificat});
        }

        // this.combineModelTemplate(this.state.htmlCode,this.state.model);
    }
    

    componentDidMount() {
        this.initState();        

        // const swiperContainer = document.getElementById("swiper-media-model");
        // if(swiperContainer){
        //     // console.log("swiper-media-model",swiperContainer);
        //     var mySwiper = new Swiper(swiperContainer, {
                
        //         loop: true,
              
        //         // If we need pagination
        //         pagination: {
        //           el: '#swiper-pagination',
        //         },
              
        //         // Navigation arrows
        //         navigation: {
        //           nextEl: '#swiper-button-next',
        //           prevEl: '#swiper-button-prev',
        //         },
              
        //         // And if we need scrollbar
        //         scrollbar: {
        //           el: '#swiper-scrollbar',
        //         },
        //       })
        // }
    }

    componentDidUpdate(prevProps){
        // console.log("this props of over HTML component",this.props.htmlMedia);
        // if (JSON.stringify(this.props.listMedias) !== JSON.stringify(prevProps.listMedias)) {
        //     this.setState({ listMedias: this.props.listMedias });
        // }

        // if (JSON.stringify(this.props.model) !== JSON.stringify(prevProps.model)) {
        //     this.setState({ model: this.props.model });
        // }
    }

    combineModelTemplate(htmlCode,model){
        // console.log("combineModelTemplate");
        if(htmlCode&&model){
        // console.log("combineModelTemplate2");

            let htmlReplaced = htmlCode;
            const listKeyOfModel = Object.keys(model);
            // console.log("listKeyOfModel",listKeyOfModel);
            listKeyOfModel.forEach((value) => {
                if (lodash.includes(htmlReplaced, '%' + value.toString() + '%')) {
                    htmlReplaced = lodash.replace(htmlReplaced, new RegExp('%' + value.toString() + '%', "g"), model[value]);
                    // console.log("htmlReplaced",htmlCodeReplaced);
                }
            });
            this.setState({htmlCodeReplaced:htmlReplaced});
        }
  
    }


    render() {
        
        const { htmlCode, model, listMedias,htmlCodeReplaced, certificat, htmlMedia} = this.state;
        // console.log('TEMPLATE CHANGE',htmlCode);
        // console.log('MODEL CHANGE',model);
        // console.log("LISTMEDIAS CHANGES",listMedias);
        // console.log("LIST BLOB CHANGES",htmlMedia);
        // console.log("CERTIFICAT change",certificat)
        let htmlElement= null;
        // let htmlMedia = '';
        // if(listBlob.length){
        //     listBlob.forEach((media)=>{
        //         if (media.type==="image") {
        //             if (htmlMedia === '') {
        //                 htmlMedia = "<div class='swiper-slide'><img src=" + media.url + " style='width : 100%; height:100%'/></div>";
        //             } else {
        //                 htmlMedia += "<div class='swiper-slide'><img src=" + media.url + " style='width : 100%; height:100%'/></div>";

        //             }
        //         }
        //         if (media.type==="video") {
        //             if (htmlMedia === '') {
        //                 htmlMedia = "<div class='swiper-slide'><video src=" + media.url + " style='width : 100%' controls  type='video/mp4'/></div>";
        //             } else {
        //                 htmlMedia += "<div class='swiper-slide'><video src=" + media.url + " style='width : 100%' controls  type='video/mp4'/></div>";

        //             }
        //         }
        //     })
        // }    

        // console.log("HTML Code",htmlCode);

        
        if(htmlCode && model || htmlCode && model && listMedias.length){
            htmlElement = <HtmlElement htmlCode={htmlCode} listMedias={listMedias} model={model} certificat={certificat} htmlMedia={htmlMedia}/>
        }
        
        

            return (
                <div>
                    {htmlElement}
                </div>
            );

    }
}


function mapStateToProps(state, ownProps) {
    // console.log("Own props of app container", ownProps);

    return {
        model:state.modelInfo.model,
        listMedias:state.modelInfo.listMedias,
        certificat:state.modelInfo.certificat,
        htmlMedia:state.modelInfo.htmlMedia
    }
}

OverviewHTMLComponent = connect(mapStateToProps)(OverviewHTMLComponent);

export default OverviewHTMLComponent;