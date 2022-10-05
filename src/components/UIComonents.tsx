import React, { ChangeEvent } from 'react'
import { Button, ButtonGroup, TextField } from '@mui/material'

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
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

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
                          props.setFilterValue({ filterValue: el.toLowerCase(), firstLetter: true })
                        }}>{el}
                    </Button>
                )}
            </ButtonGroup>
        </div>
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
