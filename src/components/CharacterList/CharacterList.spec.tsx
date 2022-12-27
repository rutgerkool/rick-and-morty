import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { mockCharacters } from '../../utils/characterMocks'
import { CharacterList } from './CharacterList'

const mockedReduxProps = {
  entities: mockCharacters,
  searchedEntities: [],
  loading: false
}

jest.mock('../../hooks/reduxHooks', () => ({
  ...jest.requireActual('../../hooks/reduxHooks'),
  useAppSelector: jest.fn(() => {}),
  useAppDispatch: () => () => {}
}))

const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>

describe('CharacterList', () => {
  const mockedListProps = {
    filterValue: '',
    firstLetter: false,
    numberOfPages: 42,
    pageNumber: 1,
    shouldReloadPage: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAppSelector.mockReturnValue(mockedReduxProps)
  })

  it('should render all characters that are returned from the redux store', () => {
    render(
      <BrowserRouter>
        <CharacterList {...mockedListProps} />
      </BrowserRouter>
    )

    expect(screen.getByTestId('character-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('character-item')).toHaveLength(3)
  })

  it('should render a spinner if the application is in a loading state', () => {
    mockUseAppSelector.mockImplementation(() => ({ ...mockedReduxProps, loading: true }))
    render(<CharacterList {...mockedListProps} />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.queryByTestId('character-list')).not.toBeInTheDocument()
  })
})
