import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTags } from '../actions/index';
import { Segment, Grid, Button } from 'semantic-ui-react';

class TagMenu extends Component {
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

  loaded() {
    const tags = this.props.tags;
	if (tags.length === 0) {
		return (<div></div>);
	}
	const buttons = tags.map((tag) => {
		return (
			<Grid.Column key={tag._id} id="tagColumn">
			<Segment compact basic>
			<Button toggle>{tag.name}</Button>
			</Segment>
			</Grid.Column>
		);
	});
	return (
		<div id="tagRootContainer">
		<Grid container doubling columns={10}>
			{buttons}
		</Grid>
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
