/** @jsx jsx */

import { graphql } from 'gatsby'
import MdxRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { FC } from 'react'
import { Box, Link, jsx } from 'theme-ui'

import { PostQuery } from '../../graphql-types'
import { AboutBlurb, Layout, SEO, Section } from '../components'
import { EmailCTA } from '../components/EmailCTA'
import { ShareIcons } from '../components/ShareIcons'

type ProductProps = {
  data: PostQuery
}

const Product: FC<ProductProps> = ({ data: { mdx } }) => (
  <Layout fluid>
    <SEO postData={mdx?.fields} />
    <MdxRenderer
      sx={{
        mb: 2,
      }}
    >
      {mdx?.body}
    </MdxRenderer>
    <Section noTopPadding>
      <EmailCTA />
      <ShareIcons
        description={mdx?.fields.description}
        // TODO
        // image={socialShareImage}
        title={mdx?.fields.description}
        url={mdx?.fields.productionUrl}
      />
      <Box
        sx={{
          mb: 3,
          textAlign: 'right',
        }}
      >
        <Link href={mdx?.fields.editLink}>Edit Post on Github</Link>
      </Box>
      <AboutBlurb />
    </Section>
  </Layout>
)

export default Product

export const pageQuery = graphql`
  query Product($id: String!) {
    site {
      siteMetadata {
        keywords
        siteUrl
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        categories
        date(formatString: "MMMM Do, YYYY")
        slug
        title
      }
      body
    }
  }
`
