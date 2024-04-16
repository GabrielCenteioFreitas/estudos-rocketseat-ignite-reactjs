import { MovieCard } from "./MovieCard";

interface ContentProps {
  moviesInfos: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>,
  genresInfos: {
    selectedGenre: {
      id: number
      title: string
      name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
    },
  }
}

export function Content(props: ContentProps) {
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.genresInfos.selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {props.moviesInfos.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}