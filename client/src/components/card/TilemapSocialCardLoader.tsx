import TilemapSocialCard from "./TilemapSocialCard";
import { useState, useEffect, useContext } from "react"
import { TilemapSocial } from "@types";
import { LinearProgress } from "@mui/material";
import { SocialContext } from "src/context/social";

export default function TilemapSocialCardLoader(props: {tmsId: string}) {
    const [tms, setTMS] = useState<TilemapSocial | undefined>()
    const social = useContext(SocialContext)
    useEffect(() => {
        social.getTilemapSocialById(props.tmsId).then(tms => {
            if (tms) setTMS(tms)
        })
    }, [social, props.tmsId])
    if (tms) {
        return (
            <TilemapSocialCard tms={tms}/>
        )
    }
    return (
        <LinearProgress/>
    )
}