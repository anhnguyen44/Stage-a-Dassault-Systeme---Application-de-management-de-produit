import { registerBlockType } from '@wordpress/blocks';
import attributes from './attributes';
import edit from './edit';
import {createElement} from '@wordpress/element';
import save from "./save"

const el = createElement

registerBlockType("my-plugin/my-custom-block-4", {
	title: 'Model 3D version 2',
	icon: el("svg", { width: 20, height: 20 },
		el("path", { fill: "#4a00e0", d: "M20 18.008h-20v-16.016h20v16.016zM1.172 16.836h17.656v-13.672h-17.656v13.672z" }),
		el("path", { fill: "#4a00e0", d: "M10.758 6.289h-7.421v7.421l12.987 0.001v-7.422h-5.566zM5.192 11.855v-3.711h3.711v3.711h-3.711zM14.469 11.855h-3.711v-3.711h3.711v3.711z" })
	),
	category: 'common',
	attributes,
	edit,
	save
});