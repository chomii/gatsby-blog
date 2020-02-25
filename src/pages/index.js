import React from "react"
import { graphql } from "gatsby";

import Layout from "../components/layout"
import SEO from "../components/seo"
import SinglePost from "../components/single"

const IndexPage = ({ data }) => {

  const { allMarkdownRemark: {edges}} = data;
  console.log(edges);
  const posts = edges.map(edge => <SinglePost key={edge.node.id} post={edge.node}/>);
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div className="posts-list">
        {posts}
      </div>
    </Layout>
  ) 
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 50)
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`