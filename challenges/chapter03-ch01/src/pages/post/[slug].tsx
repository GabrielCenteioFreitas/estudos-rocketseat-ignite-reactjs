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
  last_publication_date: string | null;
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
  adjacentPosts: {
    prevPost: {
      title: string;
      slug: string;
    } | null;
    nextPost: {
      title: string;
      slug: string;
    } | null;
  }
}

export default function Post({ post, preview, adjacentPosts }: PostProps) {
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

        {post.last_publication_date && (
          <span className={styles.editedOn}>
            {`*editado em ${post.last_publication_date}`}
          </span>
        )}

        <div className={styles.content}>
          {post.data.content.map(content => (
            <>
              <h2>{content.heading}</h2>
              <p dangerouslySetInnerHTML={{ __html: content.body }}></p>
            </>
          ))}
        </div>

        <hr />

        <div className={styles.adjacentPosts}>
          {adjacentPosts.prevPost && (
            <Link href={`/post/${adjacentPosts.prevPost.slug}`} className={styles.prevPostLinkContainer}>
              <div className={styles.prevPost}>
                <h6 className={styles.adjacentPostsTitle}>
                  {adjacentPosts.prevPost.title}
                </h6>
                <span className={styles.adjacentPostsDescription}>
                  Post anterior
                </span>
              </div>
            </Link>
          )}
          {adjacentPosts.nextPost && (
            <Link href={`/post/${adjacentPosts.nextPost.slug}`} className={styles.nextPostLinkContainer}>
              <div className={styles.nextPost}>
                <h6 className={styles.adjacentPostsTitle}>
                  {adjacentPosts.nextPost.title}
                </h6>
                <span className={styles.adjacentPostsDescription}>
                  Próximo post
                </span>
              </div>
            </Link>
          )}
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

  const nextPost = await prismic.getByType('post', {
    ref: previewData?.ref,
    after: response.id,
    orderings: {
      field: 'document.first_publication_date',
      direction: "asc"
    },
  });
  const prevPost = await prismic.getByType('post', {
    pageSize: 1,
    ref: previewData?.ref,
    after: response.id,
    orderings: {
      field: 'document.first_publication_date',
      direction: "desc"
    },
  });

  const first_publication_date = format(
    new Date(response.first_publication_date),
    "dd MMM yyyy",
    {
      locale: ptBR,
    }
  ).replace(/(\b\w)/gi, char => char.toUpperCase());
  
  let last_publication_date = null
  if (response.first_publication_date !== response.last_publication_date) {
    last_publication_date = format(
      new Date(response.last_publication_date),
      "dd MMM yyyy', às' hh:mm",
      {
        locale: ptBR,
      }
    );
  }

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
    last_publication_date,
    data: {
      title,
      banner: {
        url: bannerURL ?? null
      },
      author,
      content
    }
  }

  const formattedPrevPost =
    prevPost.results[0] ? {
      title: prevPost.results[0]?.data.slices[0].primary.title,
      slug: prevPost.results[0]?.uid
    } : null

  const formattedNextPost =
    nextPost.results[0] ? {
      title: nextPost.results[0]?.data.slices[0].primary.title,
      slug: nextPost.results[0]?.uid
    } : null

  return {
    props: {
      post,
      preview,
      adjacentPosts: {
        prevPost: formattedPrevPost,
        nextPost: formattedNextPost
      }
    }
  }
};
