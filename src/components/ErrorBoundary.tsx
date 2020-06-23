import React from 'react'
import { Flex, Heading, Text } from 'theme-ui'

import { GatsbyLink } from './GatsbyLink'

type ErrorBoundaryProps = any

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: any }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error: any, errorInfo: any) {
    // @ts-ignore
    const { Sentry } = window

    if (!Sentry) return

    Sentry.configureScope((scope: any) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      })
    })
    Sentry.captureException(error)

    this.setState({ error: true })
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <Flex
          sx={{
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            sx={{
              fontSize: 4,
            }}
          >
            <span aria-label="Sad face" role="img">
              😢
            </span>
          </Text>
          <Heading as="h1">Something went wrong.</Heading>
          <p>
            I&apos;ve been notified of the issue and will fix it soon! In the
            meantime, please check out the{' '}
            <GatsbyLink to="/blog">latest from my blog</GatsbyLink>!
          </p>
        </Flex>
      )
    }
    // when there's not an error, render children untouched
    return this.props.children
  }
}
