import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { GoPerson } from 'react-icons/go';
import { LuCalendar, LuHeading1 } from 'react-icons/lu';
import { FaRegClock } from "react-icons/fa";
import { RichText } from 'prismic-dom';
import { PrismicPreviewData } from '@prismicio/next/dist/types';
import Link from 'next/link';

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
      body: string;
    }[];
  };
}

interface PostProps {
  post: Post;
  preview: boolean;
}

export default function Post({ post, preview }: PostProps) {
  const headingWords = post.data.content.flatMap(content => {
    return content.heading.split(' ')
  })
  const textWords = post.data.content.flatMap(content => {
    return content.body.split(' ')
  })

  const readingTime = Math.ceil((headingWords.length + textWords.length)/200)

  return (
    <>
      <div className={styles.headerContainer}>
        <Header />
      </div>

      {post.data.banner.url && (
        <img
          src={post.data.banner.url}
          alt="Banner"
          className={styles.banner}
        />
      )}

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
              <p dangerouslySetInnerHTML={{ __html: content.body }}></p>
            </>
          ))}
        </div>

        {preview && (
          <button className={commonStyles.exitPreviewModeContainer}>
            <Link href="/api/exit-preview">
              Sair do modo Preview
            </Link>
          </button>
        )}
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

export const getStaticProps = async ({
  params,
  preview = false,
  previewData,
}: {
  params: {slug?: string};
  preview: boolean;
  previewData: PrismicPreviewData
}) => {
  const slug = params?.slug

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {
    ref: previewData?.ref,
  });

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
      body: RichText.asHtml(item.body),
    }
  })

  const post = {
    first_publication_date,
    data: {
      title,
      banner: {
        url: bannerURL ?? null
      },
      author,
      content
    }
  }

  return {
    props: {
      post,
      preview
    }
  }
};
