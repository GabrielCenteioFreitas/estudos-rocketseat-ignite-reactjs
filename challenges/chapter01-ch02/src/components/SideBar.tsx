import { Button } from "./Button"

interface SideBarProps {
  genresInfos: {
    genres: Array<{
      id: number
      title: string
      name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
    }>
    selectedGenreId: number
    handleClickButton: (id: number) => void
  }
}

export function SideBar(props: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {props.genresInfos.genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.genresInfos.handleClickButton(genre.id)}
            selected={props.genresInfos.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}