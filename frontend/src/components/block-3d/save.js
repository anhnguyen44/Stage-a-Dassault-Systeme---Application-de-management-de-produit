

export default function save( { attributes } ) {
	const {
		name3dModel
	} = attributes;
	return (
		<figure>
			{ name3dModel && (
			<iframe src={name3dModel} referrerPolicy='same-origin'  style={{width:'100%',height:"400px"}}></iframe>
		) }
		{ !name3dModel && (
			<div>No 3D Model</div>
		) }

		</figure>
	);
}
