import { PropaneSharp } from "@mui/icons-material";
import { createContext, useState } from "react";
import { ModalState, ModalStore } from "./ModalStore";

const ModalContext = createContext<ModalStore>(new ModalStore({
    showCreateCommunityModal: false,
    showCreateContestModal: false
}, () => {}))

function ModalContextProvider(props: Record<string, any>) {
    const [modal, setModal] = useState<ModalState>({
        showCreateCommunityModal: false,
        showCreateContestModal: false
    })
    const Modal = new ModalStore(modal, setModal)
    return (
        <ModalContext.Provider value={Modal}>
            {props.children}
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalContextProvider }