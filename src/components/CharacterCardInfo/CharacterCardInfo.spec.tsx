import { render, screen } from '@testing-library/react'
import { CharacterCardInfo } from './CharacterCardInfo'
import { mockCharacterRick } from '../../utils/characterMocks'

describe('CharacterCardInfo', () => {
  it('should render a character with the correct property values', () => {
    render(<CharacterCardInfo character={mockCharacterRick} />)

    expect(screen.getByTestId('character-card-info')).toBeInTheDocument()
    expect(screen.getByText(/Human/)).toBeVisible()
  })
})
