import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagMenu from './tag_menu';
import AllLinksView from './all_links_view';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
		  <TagMenu />
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
			<AllLinksView />
		  </div>
      </div>
    );
  }
}

export default Home
