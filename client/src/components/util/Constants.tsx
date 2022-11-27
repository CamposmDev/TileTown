import { Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import React from "react"

export const TAG_PREFIX = 'tag:'
export const DESC_CHAR_LIMIT = 300
export const TAG_LIMIT = 10
export const TAG_CHAR_LIMIT = 30

export enum SearchCategory {
    Tilemaps = 'Tilemaps',
    Tilesets = 'Tilesets',
    Users = 'Users',
    Communities = 'Communities',
    Contests = 'Contests',
    Forums = 'Forums'
}

export const SLIDE_DOWN_TRANSITION = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props}/>
})

export const MENU_PAPER_PROPS = {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      }
    }
}
  
export function stringAvatar(firstName: string, lastName: string) {
    function stringToColor(string: string) {
        let hash = 1;
        let i;
    
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        let color = '#';
    
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
    
        return color;
    }
    return {
        sx: {
            bgcolor: stringToColor(firstName + ' ' + lastName),
        },
        children: `${firstName[0]}${lastName[0]}`,
    };
}

export enum SortType {
    none = 'none',
    // Tilemap & Tileset & Forum Sorts
    publishDateNewest = 'publish_date_newest',
    publishDateOldest = 'publish_date_oldest',
    mostLikes = 'most_likes',
    leastLikes = 'least_likes',
    mostDislikes = 'most_dislikes',
    leastDislikes = 'least_dislikes',
    mostViews = 'most_views',
    leastViews = 'least_views',
    mostComments = 'most_comments',
    leastComments = 'least_comments',
    // User Sorts
    mostFriends = 'most_friends',
    leastFriends = 'least_friends',
    // Community Sorts
    mostMembers = 'most_members',
    leastMembers = 'least_members',
    mostTilemaps = 'most_tilemaps',
    leastTilemaps = 'least_tilemaps',
    mostTilesets = 'most_tilesets',
    leastTilesets = 'least_tilesets',
    // Contest Sorts
    timeNewest = 'time_newest',
    timeEnding = 'time_ending_soonest',
    mostParts = 'most_participates',
    leastParts = 'least_participates',
    // Community | Contest | Forum Sorts
    titleaz = 'a-z',
    titleza = 'z-a'
}

export function parseSortType(x: SortType) {
    switch (x) {
        case SortType.publishDateNewest: return 'Publish Date (Newest)'
        case SortType.publishDateOldest: return 'Publish Date (Oldest)'
        case SortType.mostLikes: return 'Most Likes'
        case SortType.leastLikes: return 'Least Likes'
        case SortType.mostDislikes: return 'Most Dislikes'
        case SortType.leastDislikes: return 'Least Dislikes'
        case SortType.mostViews: return 'Most Views'
        case SortType.leastViews: return 'Least Views'
        case SortType.mostComments: return 'Most Comments'
        case SortType.leastComments: return 'Least Comments'
        case SortType.mostFriends: return 'Most Friends'
        case SortType.leastFriends: return 'Least Friends'
        case SortType.mostMembers: return 'Most Members'
        case SortType.leastMembers: return 'Least Members'
        case SortType.mostTilemaps: return 'Most Tilemaps'
        case SortType.leastTilemaps: return 'Least Tilemaps'
        case SortType.mostTilesets: return 'Most Tilesets'
        case SortType.leastTilesets: return 'Least Tilesets'
        case SortType.timeNewest: return 'Time: Newest'
        case SortType.timeEnding: return 'Time: Ending Soonest'
        case SortType.mostParts: return 'Most Participates'
        case SortType.leastParts: return 'Least Participates'
        case SortType.titleaz: return 'A-Z'
        case SortType.titleza: return 'Z-A'
    }
    return 'None'
}
