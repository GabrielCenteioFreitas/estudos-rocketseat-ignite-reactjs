import { getPrismicClient } from '../../services/prismic'
import { render, screen } from '@testing-library/react'
import { createMock } from 'ts-jest-mock'
import Posts, { getStaticProps } from '@/pages/posts'

const posts = [
  { slug: 'my-new-post', title: 'My New Post', excerpt: 'Post excerpt', updatedAt: '10 de Abril' }
]

jest.mock('@/services/prismic');

describe('Posts page', () => {
  it('renders correclty', () => {
    render(
      <Posts posts={posts} />
    )

    expect(screen.getByText("My New Post")).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = createMock(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: 'my-new-post',
          data: {
            slices: [
              {
                items: [
                  {
                    title: [
                      { type: 'heading', text: 'My new post' }
                    ],
                    content: [
                      { type: 'paragraph', text: 'Post excerpt' }
                    ]
                  }
                ]
              }
            ]
          },
          last_publication_date: '04-01-2021'
        }
      ])
    } as any);

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021',
          }]
        }
      })
    )
  })
})