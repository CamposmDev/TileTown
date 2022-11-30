import { LinearProgress } from "@mui/material"
import { SocialContext } from "src/context/social"
import TilesetSocialCard from "./TilesetSocialCard"
import { TilesetSocial } from "@types"
import { useState, useEffect, useContext } from "react"

export default function TilesetSocialCardLoader(props: {tssId: string}) {
    const [tss, setTSS] = useState<TilesetSocial | undefined>()
    const social = useContext(SocialContext)
    useEffect(() => {
        social.getTilesetSocialById(props.tssId).then(tss => {
            if (tss) setTSS(tss)
        })
    }, [social, props.tssId])
    if (tss) {
        return (
            <TilesetSocialCard tss={tss}/>
        )
    }
    return (
        <LinearProgress/>
    )
}