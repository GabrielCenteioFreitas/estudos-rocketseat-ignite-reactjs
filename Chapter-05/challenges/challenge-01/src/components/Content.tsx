import { useMemo } from "react";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {
  const moviesList = useMemo(() => {
    return movies.map(movie => (
      <MovieCard 
        key={movie.imdbID}
        title={movie.Title}
        poster={movie.Poster}
        runtime={movie.Runtime}
        rating={movie.Ratings[0].Value}
      />
    ));
  }, [movies]);
  
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {moviesList}
        </div>
      </main>
    </div>
  )
}