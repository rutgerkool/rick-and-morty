import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { List, ListItem } from '@mui/material'
import { BackButton } from './UIComonents'
import { CharacterProps } from './CharacterUI'
import { listStyles, CharacterCardInfo } from './Character'

type CharacterPageProps = {
    character: CharacterProps;
    episodes : string[];
}

type EpisodeProps = {
    episodes : string[];
}

function EpisodeList(props: EpisodeProps) {
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
                    fontSize: 'min(20px, 2vw)',
                    }}
                >
                {props.episodes ? props.episodes.map((el, i) => {
                    console.log('inmap',props.episodes);
                    return <ListItem key={i}>{el}</ListItem>
                }) : null}
            </List>
        </div>
    )
}

function CharacterPageInfo(props : CharacterPageProps) {
    return (
        <div style={{
            margin: 10,
            padding: 10,
        }}>
            <CharacterCardInfo character={props.character}/>

            <p className='subtitle'>First seen in: </p>
            <p>{props.episodes[0]}</p>

            <p className='subtitle'>Gender: </p>
            <p>{props.character.gender}</p>

            {props.character.type ? (
                <div>
                    <p className='subtitle'>Type: </p>
                    <p>{props.character.type}</p>
                </div>
            ) : null}
        </div>
    )
}

export function CharacterPage(props : {characters: CharacterProps[]}) {
    const params = useParams();
    const character = props.characters.find(el => el.id === Number(params.charId))!

    const [episodes, setEpisodes] = useState<string[]>([]);

    useEffect(() => {
        console.log(character.episode)
        async function getEpisodes() {
            for (let i = 0; i < character.episode.length; i++) {
                await fetch(character.episode[i]).then(response => response.json()).then(data => {
                    setEpisodes(prevchar => prevchar.concat(data.name))
                })
            }
        }

        getEpisodes();
        
    }, [character.episode])
    
    return(
        <div>
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
        </div>
    )
}
