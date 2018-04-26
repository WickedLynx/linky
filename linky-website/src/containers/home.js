import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagMenu from './tag_menu';
import AllLinksView from './all_links_view';
import AddLinkView from './add_link_view';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { addViewVisible: false };
  }

  render() {
    return (
      <div>
      <div id="brand">
		  <a href="/">
			<h1>Linky</h1>
		  </a>
      </div>
        <TagMenu />
      <div>
        <AllLinksView />
      </div>
      <div>
        <AddLinkView />
      </div>
      </div>
    );
  }
}

export default Home
