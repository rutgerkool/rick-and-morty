import { useEffect, useState } from 'react'
import { CharactersType } from './CharacterUI'
import { CharacterCard } from './Character'
import { Link } from 'react-router-dom'
import { getCharacters, setScrollPosition } from '../reducers/charactersSlice'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { Spinner } from './UIComonents'

type ListProps = {
    filterValue : string
    firstLetter : boolean
    numberOfPages : number
    pageNumber: number
    shouldReloadPage: boolean
}

export function filterItem (el : CharactersType, props : ListProps) : boolean {
  if (props.filterValue !== '' && !props.firstLetter) {
    if (!el.name.toLowerCase().includes(props.filterValue)) { return false }
  } else if (props.filterValue !== '' && props.firstLetter) {
    if (!el.name.toLowerCase().slice(0, props.filterValue.length).includes(props.filterValue)) { return false }
  }
  return true
}

export function CharacterList (props : ListProps) {
  const dispatch = useAppDispatch()
  const [listedCharacters, setListedCharacters] = useState<CharactersType[]>([])
  const {
    entities: charactersFromStore,
    searchedEntities: searchedCharactersFromStore,
    loading: charactersLoadingFromStore
  } = useAppSelector(state => state.characters)

  useEffect(() => {
    dispatch(getCharacters(props.pageNumber))
  }, [props.pageNumber])

  useEffect(() => {
    if (searchedCharactersFromStore.length > 0) {
      setListedCharacters(searchedCharactersFromStore)
    } else {
      setListedCharacters(charactersFromStore)
    }
  }, [charactersFromStore, searchedCharactersFromStore])

  if (charactersLoadingFromStore) {
    return (
      <Spinner />
    )
  }

  return (
        <div>
            {
              listedCharacters.map(el => {
                const isCharacter : boolean = filterItem(el, props)
                if (!isCharacter) return null
                return (
                      <div
                          key={el.id}
                          className='character-item'
                          style={{
                            display: 'flex',
                            justifyContent: 'center'
                          }}>
                          <Link
                              onClick={() => dispatch(setScrollPosition(window.scrollY))}
                              className='navlink'
                              to={`/${el.id}`}
                          >
                              <CharacterCard {...el}></CharacterCard>
                          </Link>
                      </div>
                )
              }
              )
            }
        </div>
  )
}
