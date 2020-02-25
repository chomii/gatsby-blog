/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages/posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({actions, graphql}) => {
  const { createPage } = actions;

  const postTemplate = path.resolve('src/templates/post.js');

  const { data } = await graphql(`{
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          html
          id
          frontmatter {
            title
            date
          }
        }
      }
    }
  }`)
  data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.fields.slug;

    createPage({
      path: slug,
      component: postTemplate,
      context: {
        slug: slug
      },
    })
  })
}
