import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material"
import { useState } from "react"

const PasswordField = (props: TextFieldProps) => {
    const [show, setShow] = useState(false)
    const handleShowPassword = () => setShow(!show)
    return (
        <TextField 
            {...props} 
            type={show ? "text" : "password"} 
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {show ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
            }}
        />
    )
}

export default PasswordField