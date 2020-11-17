/**
 * BLOCK: Section
 */

import classnames from "classnames"
import UAGB_Block_Icons from "./uagb-controls/block-icons"
import "./style.scss"
import "./editor.scss"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import deprecated from "./deprecated"
import inlineStyles from "./inline-styles"


import { __ } from '@wordpress/i18n';

import {
	registerBlockType
} from '@wordpress/blocks';

registerBlockType( "uagb/section", {
	title: 'Section',
	icon: UAGB_Block_Icons.section,
	category:'common',
	keywords: [
		__( "section" ),
		__( "wrapper" ),
		__( "uag" ),
	],
	attributes,
	edit,
	getEditWrapperProps( attributes ) {
		const { align, contentWidth } = attributes
		if ( "left" === align || "right" === align || "wide" === align || "full" === align ) {
			if ( "full_width" == contentWidth ) {
				return { "data-align": align }
			}
		}
	},
	save,
	deprecated,
} )
