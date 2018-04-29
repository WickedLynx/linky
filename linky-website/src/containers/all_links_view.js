import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllLinks, deleteLink } from '../actions/index';
import { LinkView } from '../components/link_view';

class AllLinksView extends Component {
  componentDidMount() {
    this.props.fetchAllLinks();
  }

  loading() {
    return (
      <div></div>
    );
  }

  error() {
    return (
      <p>this.props.error</p>
    );
  }

  loaded() {
	  var allLinks = this.props.links;
	  const selectedTags = this.props.selectedTagIDs;
	  if (selectedTags.length > 0) {
		  allLinks = allLinks.filter((link) => {
			  const tagCount = link.tags.length;
			  if (tagCount === 0) { return false }
			  for (var index = 0; index < tagCount; index++) {
				  const tag = link.tags[index];
				  if (selectedTags.includes(tag._id)) {
					  return true;
				  }
			  }
			  return false;
		  });
	  }
    const listElements = allLinks.map((link) => {
      return (
		  <LinkView link={ link } onDeleteClick={() => {
			  this.props.deleteLink(link);
		  }} key={link._id}/>
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
      return this.loaded();
  }

}

function mapStateToProps(state) {
  return {
    isLoading: state.allLinks.isLoading,
    links: state.allLinks.links,
    error: state.allLinks.error
   };
}

export default connect(mapStateToProps, { fetchAllLinks, deleteLink })(AllLinksView);
