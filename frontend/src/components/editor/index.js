/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState, useMemo } from '@wordpress/element';
import { serialize, parse } from '@wordpress/blocks';
import { uploadMedia } from '@wordpress/media-utils';
import {
	BlockEditorKeyboardShortcuts,
	BlockEditorProvider,
	BlockList,
	BlockInspector,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import {
	Popover,
	SlotFillProvider,
	DropZoneProvider,
} from '@wordpress/components';
import { BlockPreview } from "@wordpress/block-editor";
import '@wordpress/format-library';
import '@wordpress/editor';
import '../block-3d';
import '../block-section';
import '../block-section-2';
import '../block-swiper';
import '../block-swiper-2';
import '../block-3d-2';
import '../block-3d-3';
// import '../block-swiper-3/slide';
// import '../block-swiper-3/slider';
// import '../block-swiper-4';
// import '../block-swiper-5';
// import '../block-swiper-6';
// import '../block-post-swiper';
import HeaderContainner from '../header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closePreview, openPreview, isPublished, editPost, publicPost } from '../../actions/index';
import * as lodash from 'lodash';
import './stylePreview.css';
// import { updateBlock } from '@wordpress/block-editor/store/actions';
// import './themePreview.css';
import OverviewHTMLComponent from '../overviewHTMLComponent';


function Editor(props) {
	console.log("PROPS STORE Block",props.storedBlocksHTML);
	// var dataBlocks = parse(props.storedBlocksHTML);
	var [dataBlocks, updateBlocks2] = useState([]);
	// let storedBlocks;
	// if (props.isPreview) {
	// 	storedBlocks = window.localStorage.getItem('getdavesbeBlocks');
	// } else {
	// 	storedBlocks = window.localStorage.getItem('getdavesbeBlocks');
	// }
	// const storedBlocks = window.localStorage.getItem('getdavesbeBlocks');

	// const model = JSON.parse(window.localStorage.getItem('modelData'));

	const _settings = window.getdaveSbeSettings || {};
	// let storedBlocks = window.localStorage.getItem( 'getdavesbeBlocks' );
	// console.log("blocks", parse(props.storedBlocksHTML));
	let blocksInit = window.localStorage.getItem('getdavesbeBlocks');

	const { createInfoNotice } = useDispatch('core/notices');



	const canUserCreateMedia = useSelect((select) => {
		const _canUserCreateMedia = select('core').canUser('create', 'media');
		return _canUserCreateMedia || _canUserCreateMedia !== false;
	}, []);

	const settings = useMemo(() => {
		if (!canUserCreateMedia) {
			return _settings;
		}
		return {
			..._settings,
			mediaUpload({ onError, ...rest }) {
				uploadMedia({
					wpAllowedMimeTypes: _settings.allowedMimeTypes,
					onError: ({ message }) => onError(message),
					...rest,
				});
			},
		};
	}, [canUserCreateMedia, _settings]);

	// useEffect(() => {
	// 	storedBlocks = window.localStorage.getItem( 'getdavesbeBlocks' );

	// 	if ( storedBlocks && storedBlocks.length ) {
	// 		updateBlocks( () => parse( storedBlocks ) );
	// 	}


	// 	// updateHtmlraw(storedBlocks);

	// 	// if (storedBlocks && storedBlocks.length) {
	// 	// 	// console.log("storedBlocks",storedBlocks)
	// 	// 	// // console.log("Data model",model);
	// 	// 	// model.documents = [];
	// 	// 	// const listKeyOfModel = Object.keys(model);
	// 	// 	// // console.log("listKeyOfModel",listKeyOfModel);
	// 	// 	// let blocks = storedBlocks;
	// 	// 	// listKeyOfModel.forEach((value) => {
	// 	// 	// 	if (lodash.includes(blocks, '%' + value.toString() + '%')) {
	// 	// 	// 		blocks = lodash.replace(blocks, new RegExp('%' + value.toString() + '%', "g"), model[value]);

	// 	// 	// 	}
	// 	// 	// });
	// 	// 	// // console.log("Block remplacé", blocks);
	// 	// 	// window.localStorage.setItem('getdavesbeBlocks', storedBlocks);
	// 	// 	console.log('commantaired');
	// 	// 	updateBlocks(() => parse(storedBlocks));
	// 	// 	createInfoNotice('Blocks loaded', {
	// 	// 		type: 'snackbar',
	// 	// 		isDismissible: true,
	// 	// 	});
	// 	// }
	// }, []);

	// function persistBlocks(newBlocks) {
	// 	updateBlocks( newBlocks );

	// }
	// window.localStorage.setItem( 'getdavesbeBlocks', serialize( blocks ) );

	useEffect(() => {
		// console.log("Blocks change", blocks);
		let storedBlocks = parse(props.storedBlocksHTML);


		if (storedBlocks && storedBlocks.length) {
			updateBlocks2(storedBlocks);
		}



	}, [props.storedBlocksHTML]);

	function persistBlocks(newBlocks) {
		updateBlocks2(newBlocks);
		window.localStorage.setItem('overview', serialize(newBlocks));
	}

	window.localStorage.setItem('overview',serialize(dataBlocks));
	window.localStorage.setItem('overviewJson',JSON.stringify(dataBlocks));
	let overview = window.localStorage.getItem('overview');


	// if (props.publish) {
	// 	// console.log("state publish", props.publish);
	// 	props.isPublished();
	// }
	if (props.modeOverview) {
		console.log("PROPS TEMPLATe",props.template);

		return (
			<div>
				<span class="fonticon fonticon-2x fonticon-info" onClick={() => { props.editPost() }} style={{ fontSize: '18px', cursor: 'pointer', color: '#368ec4', position:'absolute',zIndex:'1'}}></span>
				{/* <div dangerouslySetInnerHTML={{ __html: serialize(blocks) }} style={{ width: '100%', margin: "0px auto" }} id="preview" /> */}
				<OverviewHTMLComponent html={props.storedBlocksHTML}/>
				{/* <BlockPreview
						blocks={blocks}
						viewportWidth={1600}
					/> */}
			</div>
		)
	} else {
		if (!props.isPreview) {
			// updateBlocks(parse(props.storedBlocksHTML));
			
			// dataBlocks = parse(props.storedBlocksHTML);
			
			return (
				<div>
					<HeaderContainner publicPostOverview={props.publicPostOverview}/>
					<div className="playground">
						<SlotFillProvider>
							<DropZoneProvider>
								<BlockEditorProvider
									value={dataBlocks}
									onInput={updateBlocks2}
									onChange={updateBlocks2}
									// settings={settings}
								>
									<div className="playground__sidebar">
										<BlockInspector />
									</div>
									<div className="editor-styles-wrapper">
										<Popover.Slot name="block-toolbar" />
										<BlockEditorKeyboardShortcuts />
										<WritingFlow>
											<ObserveTyping>
												<BlockList />
											</ObserveTyping>
										</WritingFlow>
									</div>
									<Popover.Slot />
								</BlockEditorProvider>
							</DropZoneProvider>
						</SlotFillProvider>
					</div>
				</div>
			)
		}
		else {
			


			return (
				<div>
					<button type="button" onClick={() => { props.editPost() }} style={{ display: 'block',position:'absolute',zIndex:'1' }} aria-disabled="false" className="components-button editor-history__undo has-icon" aria-label="Défaire"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" role="img" aria-hidden="true" focusable="false"><path d="M12 5H7V2L1 6l6 4V7h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H7v2h5c3.3 0 6-2.7 6-6s-2.7-6-6-6z"></path></svg></button>

					<OverviewHTMLComponent html={window.localStorage.getItem('overview')} />
				</div>
			)
		}
	}


}

function mapStateToProps(state, ownProps) {
	// console.log("STATE STATE", state);
	// let { storedBlocksHTML } = ownProps;
	return {
		isPreview: state.isPreview.isPreview,
		modeOverview: state.isPreview.modeOverview,
		publish: state.publish,
		storedBlocksHTML: state.modelInfo.storedBlocksHTML,
		// storedBlocksHTML: storedBlocksHTML,
		template: state.template
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ closePreview: closePreview, openPreview: openPreview, isPublished: isPublished, editPost: editPost, publicPost: publicPost }, dispatch);
}

let EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);

export default EditorContainer;