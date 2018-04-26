import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagMenu from './tag_menu';
import AllLinksView from './all_links_view';

class Home extends Component {
  constructor(props) {
    super(props);
	this.state = { selectedTagIDs: []};
  }

  onTagSelectionChange(tags) {
	  const tagIDs = tags.map((tag) => { return tag._id; });
	  this.setState({...this.state, ...{selectedTagIDs: tagIDs} })
  }

  render() {
	  console.log(this.state.selectedTagIDs);
    return (
      <div>
	  <TagMenu onSelectionChange={(tags) => {
		  this.onTagSelectionChange(tags);
	  }}/>
		  <div id="optionsWrapper">
			<a href="/add">
				Add link
			</a>
			<span>|</span>
			<a href="/manage/tags">
				Manage tags
			</a>
			<span>|</span>
			<a href="logout">
				Logout
			</a>
		  </div>
		  <div>
			<AllLinksView selectedTagIDs={this.state.selectedTagIDs}/>
		  </div>
      </div>
    );
  }
}

export default Home
