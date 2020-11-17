// const { createElement } = wp.element;
import {createElement} from "@wordpress/element";
export default function Section({tagName, className, style, children}){ 

	return createElement(
		tagName,
		{
			className: className,
			style: style
		},
		children
	)
}
