import { getPrismicClient } from '../../services/prismic'
import { render, screen } from '@testing-library/react'
import { createMock } from 'ts-jest-mock'
import Post, { getStaticProps } from '@/pages/posts/preview/[slug]'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post content</p>',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/react')
jest.mock('@/services/prismic');
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  })),
}));

describe('PostPreview page', () => {
  it('renders correclty', () => {
    const useSessionMocked = createMock(useSession)

    useSessionMocked.mockReturnValue([null, false] as any)

    render(
      <Post post={post} />
    )

    expect(screen.getByText("My New Post")).toBeInTheDocument()
    expect(screen.getByText("Post content")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
  })

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = createMock(useSession)
    const useRouterMocked = createMock(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-active-subscription'
      }
    } as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render (
      <Post post={post} />
    )

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = createMock(getPrismicClient)

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

    const response = await getStaticProps({
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