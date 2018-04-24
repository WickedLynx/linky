import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLink } from '../actions/index';

class AddLinkView extends Component {
  constructor(props) {
    super(props);
    this.state = { urlInput: '', tagInput: '' };
  }

  clickAdd() {
    const url = this.state.urlInput;
    if (!url || url.length == 0) { return; }
    const tagInput = this.state.tagInput;
    var tags = [];
    if (tagInput && tagInput.length > 0) {
      tags = tagInput.trim().split(',');
    }
    this.props.addLink({ url: url, tags: tags });
  }

  render() {
    return (
      <div>
        <div>
        <input type="text" value={this.state.urlInput} onChange={(event) => {
          this.setState({...this.state, ...{ urlInput: event.target.value }})
        }}></input>
        </div>
        <div>
        <input type="text" value={this.state.tagInput} onChange={(event) => {
          this.setState({...this.state, ...{ tagInput: event.target.value }})
        }}></input>
        <button onClick={() => {
          this.clickAdd();
        }}>Add</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tags: state.tags.tags };
}

export default connect(mapStateToProps, { addLink })(AddLinkView);
