import { AlertColor } from "@mui/material";
import { SnackAction, SnackActionType } from "./SnackAction";

export interface SnackState {
    severity: AlertColor,
    message: string,
    open: boolean
}

export class SnackStore {
    private readonly _snack: SnackState
    private readonly _setSnack: (snack: SnackState) => void

    constructor(snack: SnackState, setSnack: (state: SnackState) => void) {
        this._snack = snack
        this._setSnack = setSnack
    }

    public getSeverity(): AlertColor {
        return this._snack.severity
    }

    public getMessage(): string {
        return this._snack.message
    }

    public open(): boolean {
        return this._snack.open
    }

    public showSuccessMessage(message: string): void {
        this.handleAction({
            type: SnackActionType.showSuccessMessage,
            payload: {
                message: message
            }
        })
    }

    public showInfoMessage(message: string): void {
        this.handleAction({
            type: SnackActionType.showInfoMessage,
            payload: {
                message: message
            }
        })
    }

    public showWarningMessage(message: string): void {
        this.handleAction({
            type: SnackActionType.showWarningMessage,
            payload: {
                message: message
            }
        })
    }

    public showErrorMessage(message: string) {
        this.handleAction({
            type: SnackActionType.showErrorMessage,
            payload: {
                message: message
            }
        })
    }

    public clearMessage(): void {
        this.handleAction({
            type: SnackActionType.clearMessage
        })
    }

    protected handleAction(action: SnackAction): void {
        switch(action.type) {
            case SnackActionType.showSuccessMessage: {
                this._setSnack({
                    severity: 'success',
                    message: action.payload.message,
                    open: true
                })
                break
            }
            case SnackActionType.showInfoMessage: {
                this._setSnack({
                    severity: 'info',
                    message: action.payload.message,
                    open: true
                })
                break
            }
            case SnackActionType.showWarningMessage: {
                this._setSnack({
                    severity: 'warning',
                    message: action.payload.message,
                    open: true
                })
                break
            }
            case SnackActionType.showErrorMessage: {
                this._setSnack({
                    severity: 'error',
                    message: action.payload.message,
                    open: true
                })
                break
            }
            case SnackActionType.clearMessage: {
                this._setSnack({
                    severity: this._snack.severity,
                    message: this._snack.message,
                    open: false
                })
            }
        }
    }
}