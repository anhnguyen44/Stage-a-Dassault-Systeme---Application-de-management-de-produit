/**
 * WordPress dependencies
 */
import React, { Component } from "react";

import {
	Inserter
} from "@wordpress/editor";
import { NavigableToolbar } from '@wordpress/block-editor';
import { __ } from "@wordpress/i18n";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {openPreview,publishTemplate,preview,publicPost} from '../../actions/index';


class Header extends Component {
	state = {
        newTemplate: true,
    }
    constructor(props) {
		super(props);
	}


	render(){
		return (
			<div
				role="region"
				aria-label={__("Editor toolbar")}
				className="edit-post-header"
				tabIndex="-1"
			>
				<NavigableToolbar
					className="edit-post-header-toolbar"
					aria-label={__("Editor Toolbar")}
				>
					<Inserter position="bottom right" />
					<button id="preview" type="button" className="components-button editor-post-save-draft is-tertiary" style={{position:'relative',top:'-7px'}} onClick={()=>{this.props.preview()}}>Preview</button>
					<button id="preview" type="button" className="components-button editor-post-save-draft is-tertiary" style={{position:'relative',top:'-7px'}} onClick={this.props.publicPostOverview}>Publish</button>
					<button id="preview" type="button" className="components-button editor-post-save-draft is-tertiary" style={{position:'relative',top:'-7px'}} onClick={()=>{this.props.publicPost()}}>BackPage</button>
	
				</NavigableToolbar>
			</div>
		);
	}
	
}

function mapStateToProps(state){
	return{
		isPreview: state.isPreview.isPreview,
		publish: state.publish
	}
} 

function mapDispatchToProps(dispatch){
	return bindActionCreators({openPreview:openPreview,publishTemplate:publishTemplate,preview:preview,publicPost:publicPost},dispatch);
}

let HeaderContainner = connect(mapStateToProps,mapDispatchToProps)(Header)

export default HeaderContainner;

