import { useEffect, useState } from 'react'
import { CharactersType } from './CharacterUI'
import { CharacterCard } from './Character'
import { Link } from 'react-router-dom'
import { getCharacters } from '../reducers/charactersSlice'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'

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
  const charactersFromStore = useAppSelector(state => state.characters.entities)
  const charactersLoadingFromStore = useAppSelector(state => state.characters.loading)

  useEffect(() => {
    dispatch(getCharacters(props.pageNumber))
  }, [props.pageNumber])

  if (charactersLoadingFromStore) return <p>Loading...</p>

  return (
        <div>
            {
              charactersFromStore.map(el => {
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
