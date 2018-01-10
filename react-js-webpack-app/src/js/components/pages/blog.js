import * as React from 'react';
import PageTemplate from '../common/pageTemplate';
import Blog from '../blog/Blog.jsx';

const BlogPage = () => (
  <PageTemplate>
    <section>
      <h1>BLOG</h1>
      <Blog />
    </section>
  </PageTemplate>
);

export default BlogPage;
