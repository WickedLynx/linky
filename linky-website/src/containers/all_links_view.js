import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllLinks } from '../actions/index';

class AllLinksView extends Component {
  componentDidMount() {
    this.props.fetchAllLinks();
  }

  loading() {
    return (
      <p>Loading...</p>
    );
  }

  error() {
    return (
      <p>this.props.error</p>
    );
  }

  loaded() {
    const allLinks = this.props.links;
    const listElements = allLinks.map((link) => {
      return (
        <li key={link._id}>{link.url}</li>
      );
    })
    return (
      <div>
      <ul>
        {listElements}
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
  return {
    isLoading: state.allLinks.isLoading,
    links: state.allLinks.links,
    error: state.allLinks.error
   };
}

export default connect(mapStateToProps, { fetchAllLinks })(AllLinksView);
