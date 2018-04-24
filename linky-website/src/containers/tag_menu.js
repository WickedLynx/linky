import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTags } from '../actions/index';

class TagMenu extends Component {
  componentDidMount() {
    this.props.fetchTags();
  }

  loading() {
    return (
      <p> Loading... </p>
    );
  }

  error() {
    return (
      <p>{this.props.error}</p>
    );
  }

  loaded() {
    const tags = this.props.tags;
    const listElements = tags.map((tag) => {
      return (
        <li key={tag._id}>{tag.name}</li>
      );
    });
    return (
      <ul>
      {listElements}
      </ul>
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
