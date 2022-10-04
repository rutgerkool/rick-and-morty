import { CharacterProps } from './CharacterUI'
import { CharacterCard } from './Character'
import { Link } from 'react-router-dom'

type ListProps = {
    characters : CharacterProps[];
    filterValue : string;
    firstLetter : boolean;
}


export function filterItem(el : CharacterProps, props : ListProps) : boolean {
    if (props.filterValue !== '' && !props.firstLetter) {
        if (!el.name.toLowerCase().includes(props.filterValue))
            return false;
    }
    else if (props.filterValue !== '' && props.firstLetter) {
        if (!el.name.toLowerCase().slice(0,props.filterValue.length).includes(props.filterValue)) 
            return false;
    }
    return true;
}

export function CharacterList(props : ListProps) {
    return (
        <div>
            {props.characters ? props.characters.map(el => {
                const character : boolean = filterItem(el, props);
                if (!character) return null;
                return (
                    <div 
                        key={el.id}
                        className='character-item' 
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
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
            ) : null}
        </div>
    )
}
