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


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}
interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  const [page, setPage] = useState(1);

  const handleLoadMoreClick = () => {
    setPage(cur => cur + 1)
  }

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.postsContainer}>
        {posts.slice(0, page).map(post =>
          <div className={styles.post}>
            <h2>{post.data.title}</h2>
            <h3>{post.data.subtitle}</h3>

            <div className={styles.info}>
              <div className={styles.date}>
                <LuCalendar />
                {post.first_publication_date}
              </div>
              <div className={styles.author}>
                <GoPerson />
                {post.data.author}
              </div>
            </div>
          </div>
        )}
        {posts[page] && (
          <button className={styles.loadMore} onClick={handleLoadMoreClick}>
            Carregar mais posts
          </button>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.getAllByType("post", {
    fetchLinks: ['post.heading', 'post.body'],
    pageSize: 1,
  })

  const posts = response.map(post => {
    const uid = post.uid
    const first_publication_date = format(
      new Date(post.last_publication_date),
      "dd MMM yyyy",
      {
        locale: ptBR,
      }
    ).replace(/(\b\w)/gi, char => char.toUpperCase());

    const primaryData = post.data.slices[0].primary
    const title = primaryData.title
    const subtitle = primaryData.subtitle
    const author = primaryData.author

    return {
      uid,
      first_publication_date,
      data: {
        title,
        subtitle,
        author
      }
    }
  })

  return {
    props: {
      posts
    }
  }
};
