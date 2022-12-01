import React, { ChangeEvent, useState } from 'react'
import { Button, ButtonGroup, Slide, Snackbar, Stack, TextField } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/reduxHooks'
import { clearSearchResults, getCharactersByName } from '../reducers/charactersSlice'

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

export function FilterBar (props : FilterProps) {
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
  const [loadingSearchResults, setLoadingSearchResults] = useState<boolean>(false)

  function handleSearchEvent (e : ChangeEvent<HTMLInputElement>) {
    dispatch(getCharactersByName(e.target.value.toLowerCase()))
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
            }} label="Search" onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              const searchValue = e.target.value.toLowerCase()
              if (searchValue === '') {
                setLoadingSearchResults(false)
                return dispatch(clearSearchResults())
              }
              setLoadingSearchResults(true)
              await sleep(2000)
              setLoadingSearchResults(false)
              if (searchValue === e.target.value.toLowerCase()) handleSearchEvent(e)
            }}/>
            {loadingSearchResults ? <p>Loading...</p> : null}
        </div>
  )
}
