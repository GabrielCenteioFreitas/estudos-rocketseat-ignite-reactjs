import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';
import { redirect } from 'next/dist/server/api-utils';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { GoPerson } from 'react-icons/go';
import { LuCalendar } from 'react-icons/lu';
import { FaRegClock } from "react-icons/fa";
import { notFound } from 'next/navigation';
import { RichText } from 'prismic-dom';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      bodyAsHtml: string;
      bodyAsText: string;
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const headingWords = post.data.content.flatMap(content => {
    return content.heading.split(' ')
  })
  const textWords = post.data.content.flatMap(content => {
    return content.bodyAsText.split(' ')
  })

  const readingTime = Math.ceil((headingWords.length + textWords.length)/200)

  return (
    <>
      <div className={styles.headerContainer}>
        <Header />
      </div>

      <img
        src={post.data.banner.url}
        alt="Banner"
        className={styles.banner}
      />

      <div className={styles.main}>
        <h1>{post.data.title}</h1>

        <div className={`${commonStyles.info} ${styles.info}`}>
          <div className={commonStyles.date}>
            <LuCalendar />
            {post.first_publication_date}
          </div>
          <div className={commonStyles.author}>
            <GoPerson />
            {post.data.author}
          </div>
          <div className={styles.readingTime}>
            <FaRegClock />
            {`${readingTime} min`}
          </div>
        </div>

        <div className={styles.content}>
          {post.data.content.map(content => (
            <>
              <h2>{content.heading}</h2>
              <p dangerouslySetInnerHTML={{ __html: content.bodyAsHtml }}></p>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = params?.slug

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});

  const first_publication_date = format(
    new Date(response.last_publication_date),
    "dd MMM yyyy",
    {
      locale: ptBR,
    }
  ).replace(/(\b\w)/gi, char => char.toUpperCase());

  const primaryData = response.data.slices[0].primary
  const title = primaryData.title
  const bannerURL = primaryData.banner.url
  const author = primaryData.author

  const content = response.data.slices[0].items.map(item => {
    return {
      heading: item.heading,
      bodyAsHtml: RichText.asHtml(item.body),
      bodyAsText: RichText.asText(item.body),
    }
  })

  const post = {
    first_publication_date,
    data: {
      title,
      banner: {
        url: bannerURL
      },
      author,
      content
    }
  }

  return {
    props: {
      post
    }
  }
};
