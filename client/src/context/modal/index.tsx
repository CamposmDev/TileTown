import { PropaneSharp } from "@mui/icons-material";
import { createContext, useState } from "react";
import { ModalState, ModalStore } from "./ModalStore";

const ModalContext = createContext<ModalStore>(
  new ModalStore(
    {
      showCreateCommunityModal: false,
      showCreateContestModal: false,
      showDeleteCommunityModal: false,
      showDeleteContestModal: false,
      showUploadTilesetModal: false,
      showUploadTilemapModal: false,
      showCreatePropertyModal: false,
      showAddCollaboratorModal: false,
      showAddTilesetModal: false,
    },
    () => {}
  )
);

function ModalContextProvider(props: Record<string, any>) {
  const [modal, setModal] = useState<ModalState>({
    showCreateCommunityModal: false,
    showCreateContestModal: false,
    showDeleteCommunityModal: false,
    showDeleteContestModal: false,
    showUploadTilesetModal: false,
    showUploadTilemapModal: false,
    showCreatePropertyModal: false,
    showAddCollaboratorModal: false,
    showAddTilesetModal: false,
  });
  const Modal = new ModalStore(modal, setModal);
  return (
    <ModalContext.Provider value={Modal}>
      {props.children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalContextProvider };
