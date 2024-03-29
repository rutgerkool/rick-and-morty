import { CharactersType } from '../CharacterUI/CharacterUI'
import { CharacterCardInfo } from '../CharacterCardInfo/CharacterCardInfo'
import '../../styles/Character.css'

export function CharacterCard (props: CharactersType) {
  return (
    <div className="character" data-testid='character-card'>
      <div>
        <img className="character-image" src={props.image} alt={props.name} />
      </div>
      <div
        style={{
          margin: 10,
          padding: 10
        }}
      >
        <h1>{props.name}</h1>
        <CharacterCardInfo character={props} />
      </div>
    </div>
  )
}
