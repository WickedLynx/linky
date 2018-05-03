import React, { Component } from 'react';
import TagMenu from './tag_menu';
import AllLinksView from './all_links_view';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/index';
import qs from 'query-string';

class Home extends Component {
  constructor(props) {
    super(props);
	const query = this.props.location.search;
	var tagNames = [];
	if (query) {
		const commaSeparatedTags = qs.parse(query).tags;
		tagNames = commaSeparatedTags.split(',');
	}
	this.state = { selectedTagIDs: [], selectedTagNames: tagNames };
  }

  onTagSelectionChange(tags) {
	  const tagIDs = tags.map((tag) => { return tag._id; });
	  this.setState({...this.state, ...{selectedTagIDs: tagIDs, selectedTagNames: [] } })
  }

  render() {
	  var options = <div></div>;
	  if (this.props.isLoggedIn) {
		  options = (
			  <div id="optionsWrapper">
				<Link to="/add">
					Add link
				</Link>
				<span>|</span>
				<Link to="/manage/tags">
					Manage tags
				</Link>
				<span>|</span>
				<Link to="/" onClick={() => {
					this.props.logout();
				}}>
					Logout
				</Link>
			  </div>
		  );
	  } else {
		  options = (
			  <div id="optionsWrapper">
				<Link to="/add">
					Add link
				</Link>
				<span>|</span>
				<Link to="/manage/tags">
					Manage tags
				</Link>
				<span>|</span>
				<Link to="login">
					Login
				</Link>
			  </div>
		  );
	  }
    return (
      <div>
		  <TagMenu selectedTagNames={ this.state.selectedTagNames } onSelectionChange={(tags) => {
			  this.onTagSelectionChange(tags);
		  }}/>
		  {options}
		  <div>
			<AllLinksView selectedTagIDs={this.state.selectedTagIDs}/>
		  </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return { isLoggedIn: state.auth.isLoggedIn };
}
export default connect(mapStateToProps, { logout })(Home);
