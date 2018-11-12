import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTags } from '../actions/index';

class TagMenu extends Component {
	constructor(props) {
		super(props);
		this.state = { selectedTagIDs: [], selectedTagNames: props.selectedTagNames };
	}

  componentDidMount() {
    this.props.fetchTags();
  }

  loading() {
    return (
      <p></p>
    );
  }

  error() {
    return (
      <p>{this.props.error.message}</p>
    );
  }

  customLoaded() {
	  
  }

  clickTag(tag) {
	  if (!tag) { return }
	  if (tag._id === "clear all") {
		this.props.onSelectionChange([]);
		this.setState({ selectedTagIDs: [] });
		return;
	  }
	  var selectedIDs = this.state.selectedTagIDs;
	  if (this.state.selectedTagIDs.includes(tag._id)) {
		  selectedIDs = this.state.selectedTagIDs.filter((aTag) => { return aTag !== tag._id});
	  } else {
		  selectedIDs = this.state.selectedTagIDs.concat([tag._id]);
	  }
	  const selectedTags = this.props.tags.filter((tag) => {
		  return selectedIDs.includes(tag._id);
	  });
	  if (this.props.onSelectionChange) {
		  this.props.onSelectionChange(selectedTags);
	  }
	  this.setState({ selectedTagIDs: selectedIDs });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.tags.length > 0 && nextProps.selectedTagNames && nextProps.selectedTagNames.length > 0) {
			const selectedTags = nextProps.tags.filter(function isIncluded(tag) {
				return prevState.selectedTagNames.includes(tag.name);
			});
			const selectedTagIDs = selectedTags.map(function transform(tag) {
				return tag._id;
			});
			if (nextProps.onSelectionChange) {
				nextProps.onSelectionChange(selectedTags);
			}
			return { selectedTagNames: [], selectedTagIDs: selectedTagIDs }
		}
		return null;
  }

  loaded() {
    const tags = this.props.tags;
	if (tags.length === 0) {
		return (<div></div>);
	}
	const clearAllButton = <div id="clearTagsButton" key="clear all" onClick={() => {
		this.clickTag({ "_id" : "clear all" })
		}}>Clear all</div>
	var buttons = tags.map((tag) => {
		const className = "tagButton " + (this.state.selectedTagIDs.includes(tag._id) ? "tagButton-selected" : "tagButton-default");
		return (
			<li  key={tag._id}>
			<div className={className} onClick={() => {
				this.clickTag(tag);
			}}>{tag.name}</div>
			</li>
		);
	});
	buttons.push(clearAllButton);
	return (
		<div id="tagRootContainer">
		<ul>
			{buttons}
		</ul>
		</div>
	);
	
  }

  render() {
      return this.loaded();
  }
}

function mapStateToProps(state) {
  return { error: state.tags.error, isLoading: state.tags.isLoading, tags: state.tags.tags };
}

export default connect(mapStateToProps, { fetchTags })(TagMenu)
