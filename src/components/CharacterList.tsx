import { useState, useEffect } from 'react'
import { CharacterProps } from './CharacterUI'
import { CharacterCard } from './Character'
import { Link } from 'react-router-dom'
import { Api } from '../utils/api'

type ListProps = {
    filterValue : string;
    firstLetter : boolean;
}

export function filterItem (el : CharacterProps, props : ListProps) : boolean {
  if (props.filterValue !== '' && !props.firstLetter) {
    if (!el.name.toLowerCase().includes(props.filterValue)) { return false }
  } else if (props.filterValue !== '' && props.firstLetter) {
    if (!el.name.toLowerCase().slice(0, props.filterValue.length).includes(props.filterValue)) { return false }
  }
  return true
}

export function CharacterList (props : ListProps) {
  const [characters, setCharacters] = useState<CharacterProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const characters = await Api.getCharacters()
        setCharacters(characters)
        setLoading(false)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    }
    fetchData()
  }, [])

  return (
        <div>
            {characters && characters.length > 1 && !loading
              ? characters.map(el => {
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
              : <p>Loading...</p> }
        </div>
  )
}
