import { render, screen } from '@testing-library/react'
import { CharactersType } from '../CharacterUI'
import { CharacterCard } from './CharacterCard'

describe('CharacterCard', () => {
  const mockedCharacter = ({
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: undefined,
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1'

    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3'

    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
      'https://rickandmortyapi.com/api/episode/3'
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  } as unknown) as CharactersType

  it('should render a character with the correct property values', () => {
    render(<CharacterCard {...mockedCharacter} />)

    expect(screen.getByTestId('character-card')).toBeInTheDocument()

    const characterImage = screen.getByRole('img')
    expect(characterImage).toHaveAttribute('alt', 'Rick Sanchez')
    expect(characterImage).toHaveAttribute('src', 'https://rickandmortyapi.com/api/character/avatar/1.jpeg')
  })
})
