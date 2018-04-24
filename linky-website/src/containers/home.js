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
      <div>
        <h1> Welcome to Linky! </h1>
      </div>
      <div>
        <AllLinksView />
      </div>
      <div>
        <TagMenu />
      </div>
      <div>
        <AddLinkView />
      </div>
      </div>
    );
  }
}

export default Home
