import { SignUp } from "@clerk/nextjs";
import { Box } from "@mui/material";

export default function SignUpPage() {
    return (     
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{height: "100vh"}}>
            <SignUp />
        </Box>
    )
}