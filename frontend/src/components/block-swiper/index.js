import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import { createElement } from '@wordpress/element';

const el = createElement

registerBlockType("my-plugin/my-custom-block2", {
	title: 'Media Swiper',
	icon: el("svg", { width: 20, height: 20 },
		el("path", { fill: "#4a00e0", d: "M0 1.992v16.016h20v-16.016h-20zM11.406 16.836h-10.234v-10.898h10.234v10.898zM18.828 16.836h-6.25v-2.852h6.25v2.852zM18.828 12.813h-6.25v-6.875h6.25v6.875zM1.172 4.766v-1.602h17.656v1.602h-17.656z" }),
		el("path", { fill: "#4a00e0", d: "M2.652 15.325h7.274v-7.877h-7.274v7.877zM3.824 8.62h4.931v5.534h-4.931v-5.534z" }),
		el("path", { fill: "#4a00e0", d: "M13.486 10.13h4.434v1.172h-4.434v-1.172z" }),
		el("path", { fill: "#4a00e0", d: "M13.486 7.448h4.434v1.172h-4.434v-1.172z" })),
	category: 'common',
	keywords: [
		__("slide"),
		__("swiper"),
		__("media"),
	],
	attributes,
    edit,
	save
});