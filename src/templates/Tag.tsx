/** @jsx jsx */

import { PageProps, graphql } from 'gatsby'
import { FC } from 'react'
import { Box, Heading, jsx } from 'theme-ui'

import { TagsQuery } from '../../graphql-types'
import { BlogItemList, GatsbyLink, Layout, Section } from '../components'

type TagsProps = PageProps & {
  data: TagsQuery
  pageContext: {
    nextPage?: string
    previousPage?: string
    tag: string
    limit: number
    skip: number
    pageCount: number
  }
}

export const Tags: FC<TagsProps> = ({ data, pageContext }) => (
  <Layout addTopPadding>
    <Heading as="h1" mb={4}>
      # {pageContext.tag}
    </Heading>
    {/* TODO: Guard empty */}
    <BlogItemList data={data} />
    <Section
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        {pageContext.previousPage && (
          <GatsbyLink to={pageContext.previousPage}>← Previous Page</GatsbyLink>
        )}
      </Box>

      <Box>
        {pageContext.nextPage && (
          <GatsbyLink to={pageContext.nextPage}>Next Page →</GatsbyLink>
        )}
      </Box>
    </Section>
  </Layout>
)

export default Tags

export const pageQuery = graphql`
  query Tags($skip: Int!, $limit: Int!, $tag: [String]) {
    allMdx(
      filter: {
        fields: {
          isBlog: { eq: true }
          unlisted: { eq: false }
          tags: { in: $tag }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...BlogPost
        }
      }
    }
  }
`
