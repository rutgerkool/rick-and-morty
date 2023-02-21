import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Dialog, Grid, Paper } from '@mui/material'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import { BackButton, Spinner } from '../UIComponents/UIComonents'
import { CharactersType, EpisodeType } from '../CharacterUI/CharacterUI'
import { listStyles, CharacterCardInfo } from '../CharacterCardInfo/CharacterCardInfo'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getCharacter, getEpisodes } from '../../reducers/charactersSlice'
import '../../styles/Character.css'

type CharacterPageProps = {
    character: CharactersType;
    episodes : EpisodeType[];
}

type EpisodeProps = {
    episodes : EpisodeType[];
}

function EpisodeList ({ episodes }: EpisodeProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [selectedEpisode, setSelectedEpisode] = useState<number>(0)

  return (
    <div
      style={{
        margin: '10%'
      }}
    >
      <div className='episode-title'>
        <h2>Episodes</h2>
    </div>
      <Grid
              container
              spacing={2}
              columns={4}
            >
            {episodes
              ? episodes.map((el, i) =>
                (<Grid
                  item
                  key={i}
                  xs={1}
                  onClick={() => {
                    setSelectedEpisode(i)
                    setDialogIsOpen(true)
                  }}
                  >
                <Paper
                className='episode-card'
                data-testid='episode-card'
                style={{
                  backgroundColor: '#484848',
                  borderStyle: 'solid',
                  borderColor: '#0e324b',
                  padding: 20,
                  textAlign: 'center'
                }}><p>{el.episode}</p></Paper>
              </Grid>)
              )
              : null}
        </Grid>
        <Dialog
        fullWidth={false}
          style={{

            borderRadius: '25px'
          }}
          open={dialogIsOpen}
        >
          <ClickAwayListener onClickAway={() => setDialogIsOpen(false)}>
          <Paper
            style={{
              backgroundColor: '#484848',
              borderStyle: 'solid',
              borderColor: '#0e324b',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <h2 className='episode-details-title'>{episodes[selectedEpisode].name}</h2>
            <p className='air-date-text '>Air date: {episodes[selectedEpisode].air_date}</p>
            <p className='created-text'>Created: {episodes[selectedEpisode].created}</p>

            <Button onClick={() => setDialogIsOpen(false)} autoFocus>
              Close
            </Button>
          </Paper>
          </ClickAwayListener>
        </Dialog>
    </div>
  )
}

function CharacterPageInfo (props : CharacterPageProps) {
  return (
        <div style={{
          height: 300,
          margin: 10,
          padding: 10
        }}>
            <CharacterCardInfo character={props.character}/>

            <p className='subtitle'>First seen in: </p>
            <p>{props.episodes[0].episode}</p>

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
  const {
    entity: characterFromStore,
    loading: characterLoadingFromStore,
    isInErrorState: characterRejectedFromStore,
    episodes: episodesFromStore,
    episodesLoading: episodesLoadingFromStore
  } = useAppSelector(state => state.characters)
  const params = useParams()

  useEffect(() => {
    if (params.charId) {
      dispatch(getCharacter(params.charId))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!characterLoadingFromStore && characterFromStore.length !== 0) dispatch(getEpisodes(characterFromStore[0]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterLoadingFromStore])

  if (characterRejectedFromStore) {
    return <p>Not found</p>
  } else if (characterLoadingFromStore || characterFromStore.length === 0 || episodesLoadingFromStore || episodesFromStore.length === 0) {
    return (
      <Spinner />
    )
  } else {
    return (
      <div>
            <>
              <h2 className='character-page-title'>{characterFromStore[0].name}</h2>
              <div className='character-page' style={{
                ...listStyles
              }}>
                  <div>
                      <img src={characterFromStore[0].image} alt={characterFromStore[0].name}/>
                  </div>
                  <CharacterPageInfo character={characterFromStore[0]} episodes={episodesFromStore}/>
              </div>
              <EpisodeList episodes={episodesFromStore}/>
              <div className='created-text'>
                  <p>Created: {characterFromStore[0].created}</p>
              </div>
              <BackButton />
          </>

  </div>
    )
  }
}
