import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllLinks } from '../actions/index';
import { LinkView } from '../components/link_view';

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
		  <LinkView link={ link } key={link._id}/>
      );
    })
    return (
      <div id="linksContainerWrapper" >
	  <div id="linkColumnContainer">
        {listElements}
	  </div>
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
