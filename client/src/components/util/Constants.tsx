import { Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import React from "react"

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
        let hash = 0;
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
