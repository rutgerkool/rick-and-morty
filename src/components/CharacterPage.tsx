import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { List, ListItem } from '@mui/material'
import { BackButton } from './UIComonents'
import { CharactersType } from './CharacterUI'
import { listStyles, CharacterCardInfo } from './Character'
import { Api } from '../utils/api'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { getCharacter } from '../reducers/charactersSlice'

type CharacterPageProps = {
    character: CharactersType;
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
  const dispatch = useAppDispatch()
  const characterFromStore = useAppSelector(state => state.characters.entity)
  const characterLoadingFromStore = useAppSelector(state => state.characters.loading)
  const characterRejectedFromStore = useAppSelector(state => state.characters.error)
  const params = useParams()
  const navigate = useNavigate()

  const [episodes, setEpisodes] = useState<string[]>([])

  useEffect(() => {
    if (params.charId) dispatch(getCharacter(params.charId))
  }, [])

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodes = await Api.getEpisodes(characterFromStore[0])
        setEpisodes(episodes)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    }
    if (characterLoadingFromStore || characterFromStore.length === 0) fetchEpisodes()
  }, [])

  if (characterRejectedFromStore) navigate('/notFound')

  if (characterLoadingFromStore || characterFromStore.length === 0) return <p>Loading...</p>
  else {
    return (
      <div>
          <>
              <div className='character-page' style={{
                ...listStyles
              }}>
                  <div>
                      <img src={characterFromStore[0].image} alt={characterFromStore[0].name}/>
                  </div>
                  <CharacterPageInfo character={characterFromStore[0]} episodes={episodes}/>
              </div>
              <EpisodeList episodes={episodes}/>
              <div className='created-text'>
                  <p>Created: {characterFromStore[0].created}</p>
              </div>
              <BackButton />
          </>

  </div>
    )
  }
}
