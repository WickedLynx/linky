import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLink } from '../actions/index';
import TagMenu from './tag_menu';
import { Link } from 'react-router-dom';
import qs from 'query-string';

class AddLinkView extends Component {
  constructor(props) {
    super(props);
	var urlInput = '';
	const query = this.props.location.search;
	let shouldCloseTab = false;
	if (query) {
		const link = qs.parse(query).link;
		if (link) {
			urlInput = link;
		}
		shouldCloseTab = qs.parse(query).closeTab || false;
	}
    this.state = { urlInput: urlInput, tagInput: '', selectedTags: [], closeTab: shouldCloseTab };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
	  if (prevProps.isLoading && this.props.addedLink) {
		if (this.state.closeTab) {
			window.location.replace(this.state.urlInput);
			return;
		}
		  this.props.history.push('/');
	  }
  }

  clickAdd() {
    const url = this.state.urlInput;
    if (!url || url.length === 0) { return; }
    const tagInput = this.state.tagInput;
    var tags = this.state.selectedTags.map((tag) => { return tag.name;}) || [];
    if (tagInput && tagInput.length > 0) {
      tags = tags.concat(tagInput.trim().split(','));
    }
    this.props.addLink({ url: url, tags: tags });
  }

  onSelectionChange(tags) {
	  this.setState({...this.state, ...{ selectedTags: tags }});
  }

  addView() {
	  var notLoggedInFooter = <div></div>;
	  if (!this.props.isLoggedIn) {
		  notLoggedInFooter = (
			  <div id="notLoggedInFooter">
			  <Link to="/login">You need to login to add links</Link>
			  </div>
		  );
	  }
    return (
		<div>
        <div id="addFormWrapper">
			<div>
			<input type="text" placeholder="Link to add" value={this.state.urlInput} className="inputField" onChange={(event) => {
			  this.setState({...this.state, ...{ urlInput: event.target.value }})
			}}></input>
			</div>
			<div>
			<input type="text" value={this.state.tagInput} placeholder="Comma separated tags" className="inputField" onChange={(event) => {
			  this.setState({...this.state, ...{ tagInput: event.target.value }})
			}}></input>
			</div>
		</div>
		<TagMenu onSelectionChange={(tags) => {
			this.onSelectionChange(tags);
		}}/>
		<div id="addFormButtonContainer">
		<button onClick={() => {
		  this.clickAdd();
		}}>Add</button>
		<button onClick={() => {
			this.props.history.push('/');
		}}>Cancel</button>
		</div>
		{notLoggedInFooter}
		</div>
    );
  }

  errorView() {
	  const message = "X ERROR: " + this.props.error.message;
	  return(
	  <div className="errorMessageWrapper">
		<p>{message}</p>
	  </div>
	  );
  }

  render() {
	  if (this.props.isLoading) {
		  return this.addView();
	  }
	  const errorView = this.props.error ? this.errorView() : (<div></div>);
	  return (
		  <div>
		  {this.addView()}
		  {errorView}
		  </div>
	  );
  }
}

function mapStateToProps(state) {
  return { error: state.addLink.error, isLoading: state.addLink.isLoading, addedLink: state.addLink.link, isLoggedIn: state.auth.isLoggedIn };
}

export default connect(mapStateToProps, { addLink })(AddLinkView);
