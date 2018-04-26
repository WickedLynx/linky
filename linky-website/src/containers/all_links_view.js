import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllLinks } from '../actions/index';
import { Grid, Card, Icon } from 'semantic-ui-react';
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
    const allLinks = this.props.links;
    const listElements = allLinks.map((link) => {
		const tags = link.tags
		const tagString = tags.map((tag) => {
			return tag.name;
		}).join(',');
		const extra = (
			<p>
			<Icon name='tags'/>
			{tagString}
			</p>
		);
      return (
		  <Grid.Column key={link._id}>
		  <LinkView link={ link } />
		  </Grid.Column>
      );
    })
    return (
      <div>
	  <Grid doubling container columns={5}>
        {listElements}
	</Grid>
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
