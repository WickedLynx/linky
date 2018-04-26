import React from 'react';

export function LinkView(props) {
	const title = props.link.title || ""
	const description = props.link.description || "";
	const tags = props.link.tags || [];
	const image = props.link.image || "";
	const tagString = tags.length > 0 ? ("# " + tags.map((tag) => { return tag.name.trim(); }).join(', ')) : "";

	return (
		<div className="linkViewRootContainer">
		<a href={props.link.url}>
			<img src={image} alt=""></img>
			<p className="linkTitle">{title}</p>
			<p className="linkDescription">{description}</p>
			<p className="linkTags">{tagString}</p>
		</a>
		</div>
	);
}

