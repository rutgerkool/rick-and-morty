import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { mockCharacters } from './utils/characterMocks'
import { useAppSelector } from './hooks/reduxHooks'

jest.mock('./hooks/reduxHooks', () => ({
  ...jest.requireActual('./hooks/reduxHooks'),
  useAppSelector: jest.fn(() => {}),
  useAppDispatch: (dispatch: () => unknown) => () => dispatch
}))

jest.mock('./components/UIComponents/UIComonents')

const mockedReduxProps = {
  entity: [mockCharacters[0]],
  episodes: [
    'Pilot',
    'Lawnmower Dog',
    'Anatomy Park'
  ],
  entities: mockCharacters,
  searchedEntities: [],
  loading: false,
  isInErrorState: false,
  errorMessage: [],
  numberOfPages: 42,
  lastPage: 0,
  scrollPosition: 0
}

const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>

describe('<App />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAppSelector.mockReturnValue(mockedReduxProps)
  })

  it('should render the character page when the user clicks on a character card on the home page', () => {
    render(<App />)

    const characterCards = screen.getAllByTestId('character-card')

    expect(characterCards).toHaveLength(3)

    fireEvent.click(characterCards[0])

    expect(screen.getByRole('heading', { name: /Rick Sanchez/i })).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Episodes/i })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText(/created/i)).toBeInTheDocument()
  })
})
