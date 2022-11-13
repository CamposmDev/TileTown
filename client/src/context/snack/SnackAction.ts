export type SnackAction =
| ShowSuccessMessage
| ShowInfoMessage
| ShowWarningMessage
| ShowErrorMessage
| ClearMessage

export enum SnackActionType {
    showSuccessMessage = 'SHOW_SUCCESS_MESSAGE',
    showInfoMessage = 'SHOW_INFO_MESSAGE',
    showWarningMessage = 'SHOW_WARNING_MESSAGE',
    showErrorMessage = 'SHOW_ERROR_MESSAGE',
    clearMessage = 'CLEAR_MESSAGE'
}

export type ShowSuccessMessage = {
    type: SnackActionType.showSuccessMessage,
    payload: {
        message: string
    }
}

export type ShowInfoMessage = {
    type: SnackActionType.showInfoMessage,
    payload: {
        message: string
    }
}

export type ShowWarningMessage = {
    type: SnackActionType.showWarningMessage,
    payload: {
        message: string
    }
}

export type ShowErrorMessage = {
    type: SnackActionType.showErrorMessage,
    payload: {
        message: string
    }
}

export type ClearMessage = {
    type: SnackActionType.clearMessage
}