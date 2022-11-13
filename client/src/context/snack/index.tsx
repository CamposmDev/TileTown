import { createContext, useState } from 'react'
import { SnackState, SnackStore } from './SnackStore'

const SnackContext = createContext<SnackStore>(new SnackStore({severity: 'success', message: '', open: false}, () => {}))

function SnackContextProvider(props: Record<string, any>) {
    const [snack, setSnack] = useState<SnackState>({severity: 'success', message: '', open: false})
    const Snack = new SnackStore(snack, setSnack)
    return (
        <SnackContext.Provider value={Snack}>
            {props.children}
        </SnackContext.Provider>
    )
}

export { SnackContext, SnackContextProvider };
