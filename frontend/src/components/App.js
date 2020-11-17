import React, { Component } from "react";
import EditorContainer from './editor';
import SwiperSlide from './swiper';
import '../styles/styleStorybook/style.scss';
import { API } from '../api';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {openPreview,closePreview} from '../actions/index';
import * as lodash from 'lodash';

class App extends Component {
    state = {
        dataTemplate:'',
        storedBlocksHTML:'',
    }
    constructor(props) {
        super(props);
        this.createNewTemplate = this.createNewTemplate.bind(this);
        this.fetchTemplate = this.fetchTemplate.bind(this);
        this.fetchDataModel = this.fetchDataModel.bind(this);
        this.fetchDataModel();
        // this.props.openPreview();
    }
    componentWillMount(){
        
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
        console.log('DID MOUNTED');
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
        var that = this;
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

    componentDidUpdate(){
        console.log('Component did updated');
    }

    fetchDataModel = async () => {
        console.log("id props",this.props.idModel);
        let scope = "https://"+window.location.hostname;
        let id = this.props.idModel;
        let res = await window.getModelById(scope,id);
        let model = res.member[0];
        model.document = new Array();
        let lisDocs = await window.getListIdDocuments(scope,id);
        let certificat = lisDocs.csrf.value;
        console.log("listDocs",lisDocs);
        console.log("certificat",certificat);
        lisDocs = lisDocs.data;
        for(const doc of lisDocs){
            let file = await window.downloadTicket(scope,doc.id,certificat);
            console.log('file',file);
            let data = file.data[0].dataelements;
            model.document.push(data);
        }
        console.log("model hfdjhsjkdfhsjkdhfjkshdfjkhsjkdfhkjsdhfjksdh",model);
        let template = await fetch(API+"/template");
        let resTemplate = await template.json();
        let resTemplateReplaced = resTemplate[0].data;
        if(resTemplate && model){
            const listKeyOfModel = Object.keys(model);
			// console.log("listKeyOfModel",listKeyOfModel);
			listKeyOfModel.forEach((value) => {
				if (lodash.includes(resTemplateReplaced, '%' + value.toString() + '%')) {
					resTemplateReplaced = lodash.replace(resTemplateReplaced, new RegExp('%' + value.toString() + '%', "g"), model[value]);
				}
            });
        }
        console.log("Page overview code html", resTemplateReplaced);
        this.setState({storedBlocksHTML:resTemplateReplaced});

    }

    fetchTemplate = async () => {
        const fet = await fetch(API + "/template");
        const res = await fet.json();
        // console.log("data template from nodejs", res);
        return res;
    }

    createNewTemplate() {
        const storedBlocks = window.localStorage.getItem('modelData');

        if (storedBlocks && storedBlocks.length) {
            console.log("storedBlocks", JSON.parse(storedBlocks));
            this.setState({ newTemplate: true });
        }
    }

    render() {
        

        let { dataTemplate, storedBlocksHTML } = this.state;
        console.log("HTML overview",storedBlocksHTML);
        let page = null;
        const editor = <EditorContainer storedBlocksHTML={storedBlocksHTML}/>;
        const buttonNewTemplate = <button onClick={this.createNewTemplate} type="button" className="btn-primary btn btn-root" style={{ margin: '100px auto', display: 'block' }}>Create new overview</button>
        if(dataTemplate){
            page = editor;
        }

        return (
            <div>
                {/* {page} */}
                {/* <SwiperSlide/> */}
            </div>

        );
    }
}

function mapStateToProps(state,ownProps){
    console.log("Own props of app container",ownProps);
    let  {idModel} = ownProps;

    console.log("id of ownProps",idModel);
	return{
        isPreview: state.isPreview,
        idModel:idModel
	}
} 

function mapDispatchToProps(dispatch){
	return bindActionCreators({openPreview:openPreview, closePreview:closePreview},dispatch);
}

let AppContainner = connect(mapStateToProps,mapDispatchToProps)(App)

export default AppContainner;