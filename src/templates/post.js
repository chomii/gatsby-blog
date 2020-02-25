import React from 'react';
import { graphql } from 'gatsby';

export default function Template({ data }) {
  const { markdownRemark: post } = data;

  return(
    <div className="blog-post">
      <h2>{post.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export const postQuery = graphql`
  query BlogPostPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`