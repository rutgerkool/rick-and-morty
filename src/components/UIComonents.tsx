import React, { ChangeEvent, useState } from 'react'
import { Button, ButtonGroup, Slide, Snackbar, Stack, TextField } from '@mui/material'
import Alert from '@mui/material/Alert'

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
  return (
        <div className='back-button'>
            <Button
                variant='contained'
                href='/'
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
  const alphabet = []
  for (let i = 1; i <= props.numberOfPages; i++) alphabet.push(i)

  return (
        <div className='filter-bar'>
            <ButtonGroup
                variant='contained'
                aria-label='outlined primary button group'
                sx={{
                  ...buttonStyles
                }}
            >
                {alphabet.map(el =>
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

export function SearchBar (props : FilterProps) {
  function handleSearchEvent (e : ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    props.setFilterValue({ filterValue: e.target.value.toLowerCase(), firstLetter: false })
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
            }} label="Search" onChange={handleSearchEvent}/>
        </div>
  )
}
