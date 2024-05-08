import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

export const formatPosts = (posts: any[]): Post[]  => {
  return posts.map(post => {
    console.log(new Date(post.first_publication_date))

    const uid = post.uid
    const first_publication_date = format(
      new Date(post.first_publication_date || new Date()),
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
}