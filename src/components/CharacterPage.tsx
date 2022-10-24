import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { List, ListItem } from '@mui/material'
import { BackButton } from './UIComonents'
import { CharacterProps } from './CharacterUI'
import { listStyles, CharacterCardInfo } from './Character'
import { Api } from '../utils/api'

type CharacterPageProps = {
    character: CharacterProps;
    episodes : string[];
}

type EpisodeProps = {
    episodes : string[];
}

function EpisodeList (props: EpisodeProps) {
  return (
        <div style={{
          flexDirection: 'column',
          ...listStyles
        }}>
            <div className='episode-title'>
                <h2>Episodes</h2>
            </div>
            <List className='episode-list'
                sx={{
                  bgcolor: 'background.paper',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
                  borderRadius: 5,
                  backgroundColor: 'lightgrey',
                  fontSize: 'min(20px, 2vw)'
                }}
                >
                {props.episodes
                  ? props.episodes.map((el, i) => {
                    return <ListItem key={i}>{el}</ListItem>
                  })
                  : null}
            </List>
        </div>
  )
}

function CharacterPageInfo (props : CharacterPageProps) {
  return (
        <div style={{
          margin: 10,
          padding: 10
        }}>
            <CharacterCardInfo character={props.character}/>

            <p className='subtitle'>First seen in: </p>
            <p>{props.episodes[0]}</p>

            <p className='subtitle'>Gender: </p>
            <p>{props.character.gender}</p>

            {props.character.type
              ? (
                <div>
                    <p className='subtitle'>Type: </p>
                    <p>{props.character.type}</p>
                </div>
                )
              : null}
        </div>
  )
}

export function CharacterPage () {
  const params = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState<CharacterProps|null>(null)

  const [episodes, setEpisodes] = useState<string[]>([])

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/character/${params.charId}`
    fetch(url).then(response => response.json()).then(data => {
      data && data.id ? setCharacter(data) : navigate('/notFound')
    })
  }, [navigate, params.charId])

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodes = await Api.getEpisodes(character)
        setEpisodes(episodes)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    }
    fetchEpisodes()
  }, [character])

  if (!character) return null

  return (
        <div>
            <>
                <div className='character-page' style={{
                  ...listStyles
                }}>
                    <div>
                        <img src={character.image} alt={character.name}/>
                    </div>
                    <CharacterPageInfo character={character} episodes={episodes}/>
                </div>
                <EpisodeList episodes={episodes}/>
                <div className='created-text'>
                    <p>Created: {character.created}</p>
                </div>
                <BackButton />
            </>

    </div>
  )
}
