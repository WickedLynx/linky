import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTags } from '../actions/index';
import { Segment, Grid, Button } from 'semantic-ui-react';

class TagMenu extends Component {
	constructor(props) {
		super(props);
		this.state = { selectedTagIDs: [] };
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
      <p>{this.props.error}</p>
    );
  }

  customLoaded() {
	  
  }

  clickTag(tag) {
	  if (this.state.selectedTagIDs.includes(tag._id)) {
		  this.setState({ selectedTagIDs: this.state.selectedTagIDs.filter((aTag) => { return aTag !== tag._id})});
		  return;
	  }
	  this.setState({ selectedTagIDs: this.state.selectedTagIDs.concat([tag._id])});
  }

  loaded() {
    const tags = this.props.tags;
	if (tags.length === 0) {
		return (<div></div>);
	}
	const buttons = tags.map((tag) => {
		const className = "tagButton " + (this.state.selectedTagIDs.includes(tag._id) ? "tagButton-selected" : "tagButton-default");
		return (
			<li  key={tag._id}>
			<div className={className} onClick={() => {
				this.clickTag(tag);
			}}>{tag.name}</div>
			</li>
		);
	});
	return (
		<div id="tagRootContainer">
		<ul>
			{buttons}
		</ul>
		</div>
	);
	
  }

  render() {
    if (this.props.isLoading) {
      return this.loading();
    } else if (this.props.error) {
      return this.error();
    } else {
      return this.loaded();
    }
  }
}

function mapStateToProps(state) {
  return { error: state.tags.error, isLoading: state.tags.isLoading, tags: state.tags.tags };
}

export default connect(mapStateToProps, { fetchTags })(TagMenu)
