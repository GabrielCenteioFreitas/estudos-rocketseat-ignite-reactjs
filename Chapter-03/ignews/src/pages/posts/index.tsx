import Head from 'next/head';
import styles from './styles.module.scss'
import { GetStaticProps } from 'next';
import { getPrismicClient } from '@/services/prismic';
import { RichText } from 'prismic-dom';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
     <Head>
      <title>Posts | ig.news</title>
     </Head>

     <main className={styles.container}>
      <div className={styles.posts}>
        { posts.map(post => (
          <Link key={post.slug} href={`/posts/preview/${post.slug}`}>
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
     </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getAllByType("post", {
    fetchLinks: ['post.title', 'post.content'],
    pageSize: 100,
  })

  const posts = response.map(post => {
    const title = RichText.asText(post.data.slices[0]?.items[0].title)
    const excerptObject = post.data.slices[0]?.items[0].content.find((content: any) => content.type === 'paragraph') as any
    const excerpt = excerptObject.text ?? ''

    return {
      slug: post.uid,
      title,
      excerpt,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts
    }
  }
}