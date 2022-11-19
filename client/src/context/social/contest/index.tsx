import { createContext, useState } from "react";
import ContestViewerModal from "src/components/modals/ContestViewerModal";
import { ContestState, ContestStore } from "./ContestStore";

const ContestContext = createContext<ContestStore>(new ContestStore(
    {
        currentContest: undefined,
        contests: []
    }, () => {}
))

function ContestContextProvider(props: Record<string, any>) {
    const [contest, setContest] = useState<ContestState>({
        currentContest: undefined,
        contests: []
    })
    const Contest = new ContestStore(contest, setContest)
    return (
        <ContestContext.Provider value={Contest}>
            {props.children}
            <ContestViewerModal/>
        </ContestContext.Provider>
    )
}

export { ContestContext, ContestContextProvider }