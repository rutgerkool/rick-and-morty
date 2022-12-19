import React, { ChangeEvent, useState } from 'react'
import { Button, ButtonGroup, Snackbar, Stack, TextField } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/reduxHooks'
import { clearSearchResults, getCharactersByName, setLoadingState } from '../reducers/charactersSlice'
import { useDispatch } from 'react-redux'
import RingLoader from 'react-spinners/RingLoader'

const buttonStyles = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
}

type FilterProps = {
    setFilterValue :
        React.Dispatch<React.SetStateAction<{
            filterValue: string;
            firstLetter: boolean;
        }>>
    setPageNumber:
      React.Dispatch<React.SetStateAction<{
        pageNumber: number
  }>>
  numberOfPages: number
}

export function ErrorModal (props: {isOpenFirstTime: boolean, statusMessage?: string[]}) {
  const [open, setOpen] = useState(props.isOpenFirstTime)

  return (
  <Snackbar
    open={open}
    onClose={() => setOpen(false)}
    autoHideDuration={5000}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    ContentProps={{
      'aria-describedby': 'message-id'
    }}
  >
    <Stack direction={{ xs: 'column' }}>
      {props.statusMessage ? props.statusMessage.map((message, i) => (<Alert onClose={() => setOpen(false)} key={i} variant="filled" severity="error">{message}</Alert>)) : null}
  </Stack>
</Snackbar>
  )
}

export function BackButton () {
  const navigate = useNavigate()
  return (
        <div className='back-button'>
            <Button
                variant='contained'
                onClick={() => navigate('/')}
                size='small'
                sx={{
                  width: '2vw'
                }}
                >
                    Back
            </Button>
        </div>
  )
}

export function Spinner () {
  return (
    <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20,
          paddingBottom: 20
        }}>
        <RingLoader
          color={'blue'}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
  )
}

export function FilterBar (props : FilterProps) {
  const dispatch = useDispatch()
  const pageNumbers = []
  for (let i = 1; i <= props.numberOfPages; i++) pageNumbers.push(i)

  return (
        <div className='filter-bar'>
            <ButtonGroup
                variant='contained'
                aria-label='outlined primary button group'
                sx={{
                  ...buttonStyles
                }}
            >
                {pageNumbers.map(el =>
                    <Button
                        key={el}
                        size='small'
                        sx={{
                          width: '2vw'
                        }}
                        onClick={e => {
                          e.preventDefault()
                          dispatch(clearSearchResults())
                          props.setPageNumber({ pageNumber: el })
                        }}>{el.toString()}
                    </Button>
                )}
            </ButtonGroup>
        </div>
  )
}

export function LoadMoreButton (props: {getMoreCharacters: () => void}) {
  return (
    <Button
      onClick={e => {
        e.preventDefault()
        props.getMoreCharacters()
      }}
    >
      Load more
    </Button>
  )
}

function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function SearchBar () {
  const dispatch = useAppDispatch()

  function handleSearchEvent (e : ChangeEvent<HTMLInputElement>) {
    dispatch(getCharactersByName(e.target.value.toLowerCase()))
  }

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const searchValue = e.target.value.toLowerCase()
    if (searchValue === '') {
      dispatch(setLoadingState(false))
      return dispatch(clearSearchResults())
    }
    dispatch(setLoadingState(true))
    await sleep(1000)
    if (searchValue === e.target.value.toLowerCase()) handleSearchEvent(e)
  }

  return (
        <div className='search-bar' style={{
          width: '75%',
          ...buttonStyles
        }}>
            <TextField fullWidth sx={{
              backgroundColor: 'lightgrey',
              ...buttonStyles,
              borderRadius: 5
            }} label="Search" onChange={handleOnChange}/>
        </div>
  )
}
