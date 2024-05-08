import * as Prismic from '@prismicio/client'

export function getPrismicClient(fetch?: Prismic.FetchLike) {
  const prismic = Prismic.createClient(
    process.env.PRISMIC_API_ENDPOINT as string,
    {
      fetch,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  )

  return prismic;
}