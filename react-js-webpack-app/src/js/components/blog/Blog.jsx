import React from 'react';
import fetch from 'isomorphic-fetch';
import PostsList from './BlogElements';

class Blog extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      error: false,
      posts: [],
      number: '',
    };
  }

  componentDidMount() {
    // get all posts in a descending order
    fetch('http://localhost:9001/posts')
      .then(res => res.json())
      .then((json) => {
        this.setState({ posts: json, loaded: true, number: json.length });
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log(err);
      });
  }

  render() {
    return (
      <div className='blog'>
        {!this.state.loaded && !this.state.error && <p>Loading...</p>}
        {this.state.error && <p>Error...</p>}
        {this.state.loaded && (
          <PostsList posts={this.state.posts} number={this.state.number} />
        )}
      </div>
    );
  }
}

export default Blog;
