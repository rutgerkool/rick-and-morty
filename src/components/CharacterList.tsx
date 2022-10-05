import { useState, useEffect } from 'react'
import { CharacterProps } from './CharacterUI'
import { CharacterCard } from './Character'
import { Link } from 'react-router-dom'

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
  const [pageNumber, setPageNumber] = useState<number>(0)

  useEffect(() => {
    const url = 'https://rickandmortyapi.com/api/character/'
    fetch(url).then(response => response.json()).then(data => {
      setPageNumber(data.info.pages)
      setCharacters(data.results)
    })
  }, [])

  useEffect(() => {
    async function getCharacters () {
      for (let i = 2; i <= pageNumber; i++) {
        await fetch(`https://rickandmortyapi.com/api/character/?page=${i}`).then(response => response.json()).then(data => {
          setCharacters(previousCharacters => previousCharacters.concat(data.results))
        })
      }
    }

    getCharacters()
  }, [pageNumber])

  return (
        <div>
            {characters
              ? characters.map(el => {
                const character : boolean = filterItem(el, props)
                if (!character) return null
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
              : null}
        </div>
  )
}
