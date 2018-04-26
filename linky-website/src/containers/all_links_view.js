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
	  var allLinks = this.props.links;
	  const selectedTags = this.props.selectedTagIDs;
	  console.log(selectedTags);
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
