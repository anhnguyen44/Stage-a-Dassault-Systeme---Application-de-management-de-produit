/**
 * Swiper Settings
 * Controls carousel cycle effect
 *
 * Provides a dropdown of the available effects built into Tyme Swiper
 *
 * @type 	{Object}
 * @author	Tyler Bailey <tylerb.media@gmail.com>
 * @package tyme-post-swiper
 */

// const { Component } = wp.element;
// const { SelectControl } = wp.components;
// const { __ } = wp.i18n;
import {Component} from "@wordpress/element";
import {SelectControl} from "@wordpress/components";
import {__} from "@wordpress/i18n";

class SwiperEffectSelect extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			effect: this.props.value,
		};
	}

	onChange( effect ) {
		this.props.onChange( effect );
		this.setState( {
			effect: effect,
		} );
	}

	render() {
		const availableEffects = [
			{
				label: __( 'Slide' ),
				value: 'slide',
			},
			{
				label: __( 'Fade' ),
				value: 'fade',
			},
			{
				label: __( 'Cube' ),
				value: 'cube',
			},
			{
				label: __( 'Coverflow' ),
				value: 'coverflow',
			},
			{
				label: __( 'Flip' ),
				value: 'flip',
			},
		];

		return (
			<SelectControl
				label={ __( 'Swipe Effect' ) }
				value={ this.state.effect }
				options={ availableEffects }
				onChange={ ( newEffect ) => {
					this.onChange( newEffect );
				} }
			/>
		);
	}
}

export { SwiperEffectSelect };
