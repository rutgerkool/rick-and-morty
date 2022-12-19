import { CharactersType } from './CharacterUI'
import { CharacterCardInfo } from './CharacterCardInfo'
import '../styles/Character.css'

export function CharacterCard (props: CharactersType) {
  return (
    <div className="character">
      <div>
        <img className="character-image" src={props.image} alt={props.name} />
      </div>
      <div
        style={{
          margin: 10,
          padding: 10
        }}
      >
        <CharacterCardInfo character={props} />
      </div>
    </div>
  )
}
