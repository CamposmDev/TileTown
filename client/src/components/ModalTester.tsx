import PasswordResetModal from "./PasswordResetModal"
import VerifyEmail from "./VerifyEmail"
import EmailChangeModal from "./EmailChangeModal"
import UserContestsModal from "./UserContestsModal"
import CommunityContestsModal from "./CommunityContestsModal"
import CommunityMembersModal from "./CommunityMembersModal"
import ChangeUsernameModal from "./ChangeUsernameModal"
import ChangeEmailModal from "./ChangeEmailModal"
import CreateContestModal from "./CreateContestModal"
import Box from '@mui/material/Box'
import CreateCommunityModal from "./CreateCommunityModal"
import CreateForumPostModal from "./CreateForumPostModal"
import UploadTilemapModal from "./UploadTilemapModal"
import PublishTilesetModal from "./PublishTilesetModal"
import InviteCollaboratorsModal from "./InviteCollaboratorsModal"

const ModalTester = () => {
    return (
        <Box>
            <VerifyEmail/>
            <PasswordResetModal/>
            <EmailChangeModal/>
            <UserContestsModal/>
            <CommunityContestsModal/>
            <CommunityMembersModal/>
            <ChangeUsernameModal/>
            <ChangeEmailModal/>
            <CreateContestModal/>
            <CreateCommunityModal/>
            <CreateForumPostModal/>
            <UploadTilemapModal/>
            <PublishTilesetModal/>
            <InviteCollaboratorsModal/>
        </Box>
    )
}

export default ModalTester