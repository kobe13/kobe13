import * as React from 'react';
import PropTypes from 'prop-types';
import PageTemplate from '../common/pageTemplate';
import PostElement from '../blog/PostElement.jsx';

const PostPage = ({ match }) => (
  <PageTemplate>
    <section>
      <PostElement
        id={match.params.id}
      />
    </section>
  </PageTemplate>
);

PostPage.propTypes = {
  match: PropTypes.number,
};

export default PostPage;
