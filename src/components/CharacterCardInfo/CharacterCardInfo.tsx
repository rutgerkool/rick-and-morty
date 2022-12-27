import { CharactersType } from '../CharacterUI/CharacterUI'

export const listStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export function CharacterCardInfo (props: { character: CharactersType }) {
  return (
    <div data-testid='character-card-info'>
      <h1>{props.character.name}</h1>
      <p>
        <span
          className={
            props.character.status === 'Alive'
              ? 'status-dot-alive'
              : props.character.status === 'Dead'
                ? 'status-dot-dead'
                : 'status-dot-unknown'
          }
        ></span>{' '}
        {props.character.status} - {props.character.species}
      </p>

      <p className="subtitle">Last known location: </p>
      <p>{props.character.location.name}</p>
    </div>
  )
}
