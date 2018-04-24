import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagMenu from './tag_menu';
import AllLinksView from './all_links_view';

class Home extends Component {
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { foo: "bar" };
}

export default connect(mapStateToProps)(Home);
