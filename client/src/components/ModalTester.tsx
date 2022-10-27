import PasswordResetModal from "./PasswordResetModal"
import VerifyEmail from "./VerifyEmail"
import EmailChangeModal from "./EmailChangeModal"
import UserContestsModal from "./UserContestsModal"
import CommunityContestsModal from "./CommunityContestsModal"
import CommunityMembersModal from "./CommunityMembersModal"
import ChangeUsernameModal from "./ChangeUsernameModal"
import ChangeEmailModal from "./ChangeEmailModal"


import Box from '@mui/material/Box'

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

        </Box>
    )
}

export default ModalTester