import { getPrismicClient } from '../../services/prismic'
import { render, screen } from '@testing-library/react'
import { createMock } from 'ts-jest-mock'
import Post, { getServerSideProps } from '@/pages/posts/[slug]'
import { getSession } from 'next-auth/react'

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post content</p>',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/react')
jest.mock('@/services/prismic');

describe('Post page', () => {
  it('renders correclty', () => {
    render(
      <Post post={post} />
    )

    expect(screen.getByText("My New Post")).toBeInTheDocument()
    expect(screen.getByText("Post content")).toBeInTheDocument()
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = createMock(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null,
    } as any)

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        })
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMocked = createMock(getSession)
    const getPrismicClientMocked = createMock(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          slices: [
            {
              items: [
                {
                  title: [
                    { type: 'heading', text: 'My new post' }
                  ],
                  content: [
                    { type: 'paragraph', text: 'Post content' }
                  ]
                }
              ]
            }
          ]
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021',
          }
        }
      })
    )
  })
})