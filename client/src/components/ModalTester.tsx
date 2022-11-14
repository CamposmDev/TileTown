import PasswordResetModal from "./modals/PasswordResetModal"
import VerifyEmailModal from "./modals/VerifyEmailModal"
import EmailChangeModal from "./modals/EmailChangeModal"
import UserContestsModal from "./modals/UserContestsModal"
import CommunityContestsModal from "./modals/CommunityContestsModal"
import CommunityMembersModal from "./modals/CommunityMembersModal"
import ChangeUsernameModal from "./modals/ChangeUsernameModal"
import ChangeEmailModal from "./modals/ChangeEmailModal"
import CreateContestModal from "./modals/CreateContestModal"
import Box from '@mui/material/Box'
import CreateCommunityModal from "./modals/CreateCommunityModal"
import CreateForumPostModal from "./modals/CreateForumPostModal"
import UploadTilemapModal from "./modals/UploadTilemapModal"
import PublishTilesetModal from "./modals/PublishTilesetModal"
import InviteCollaboratorsModal from "./modals/InviteCollaboratorsModal"

const ModalTester = () => {
    return (
        <Box>
            <VerifyEmailModal/>
            <PasswordResetModal/>
            <EmailChangeModal/>
            <UserContestsModal/>
            <CommunityContestsModal/>
            <CommunityMembersModal/>
            <ChangeUsernameModal/>
            <ChangeEmailModal/>
            {/* <CreateContestModal/> */}
            {/* <CreateCommunityModal/> */}
            <CreateForumPostModal/>
            <UploadTilemapModal/>
            <PublishTilesetModal/>
            <InviteCollaboratorsModal/>
        </Box>
    )
}

export default ModalTester