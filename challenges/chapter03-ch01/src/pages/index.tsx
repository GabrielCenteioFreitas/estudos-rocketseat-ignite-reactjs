import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import Header from '../components/Header';

import { LuCalendar } from 'react-icons/lu';
import { GoPerson } from 'react-icons/go';
import { useState } from 'react';
import Link from 'next/link';
import { PrismicPreviewData } from '@prismicio/next/dist/types';
import { formatPosts } from '../helpers/format_posts';


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
}

export default function Home({ postsPagination, preview }: HomeProps) {
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [prevPage, setPrevPage] = useState("");
  const [posts, setPosts] = useState(postsPagination.results)

  const handleLoadMoreClick = () => {
    fetch(nextPage)
      .then(response => response.json())
      .then(data => {
        setNextPage(data.next_page)
        setPrevPage(data.prev_page)

        const nextPosts = formatPosts(data.results)

        setPosts([...posts, ...nextPosts])
      })
  }

  return (
    <div className={styles.main}>
      <Header />

      <div className={styles.postsContainer}>
        {posts.map(post =>
          <div className={styles.post}>
            <Link href={`/post/${post.uid}`}>
              <h2>{post.data.title}</h2>
              <h3>{post.data.subtitle}</h3>

              <div className={commonStyles.info}>
                <div className={commonStyles.date}>
                  <LuCalendar />
                  {post.first_publication_date}
                </div>
                <div className={commonStyles.author}>
                  <GoPerson />
                  {post.data.author}
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {nextPage && (
        <button className={styles.loadMore} onClick={handleLoadMoreClick}>
          Carregar mais posts
        </button>
      )}

      {preview && (
        <button className={commonStyles.exitPreviewModeContainer}>
          <Link href="/api/exit-preview">
            Sair do modo Preview
          </Link>
        </button>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  preview = false,
  previewData,
}: {
  preview: boolean;
  previewData: PrismicPreviewData
}) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByType("post", {
    pageSize: 1,
    ref: previewData?.ref,
  })

  const next_page = response.next_page

  const results = formatPosts(response.results)

  return {
    props: {
      postsPagination: {
        next_page,
        results
      },
      preview
    }
  }
};
