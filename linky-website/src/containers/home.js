import React, { Component } from 'react';
import TagMenu from './tag_menu';
import AllLinksView from './all_links_view';
import { Link } from 'react-router-dom';

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
    return (
      <div>
	  <TagMenu onSelectionChange={(tags) => {
		  this.onTagSelectionChange(tags);
	  }}/>
		  <div id="optionsWrapper">
			<Link to="/add">
				Add link
			</Link>
			<span>|</span>
			<Link to="/manage/tags">
				Manage tags
			</Link>
			<span>|</span>
			<Link to="logout">
				Logout
			</Link>
		  </div>
		  <div>
			<AllLinksView selectedTagIDs={this.state.selectedTagIDs}/>
		  </div>
      </div>
    );
  }
}

export default Home
