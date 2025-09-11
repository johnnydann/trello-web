import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
// import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import TrelloIcon from '~/assets/trello.png'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'


function RegisterForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const submitRegister = (data) => {
        console.log('🚀 ~ submitRegister:', data)
    }


    return (
        <form onSubmit={handleSubmit(submitRegister)} >
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
                    <Box sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
                        <Avatar
                            src={TrelloIcon}
                            alt="Trello"
                            sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}
                        />
                    </Box>

                    <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', color: theme => theme.palette.grey[500] }}>
                        Register New Account
                    </Box>

                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Enter Email..."
                                type="text"
                                variant="outlined"
                                error={!!errors['email']}
                                {...register('email', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: EMAIL_RULE,
                                        message: EMAIL_RULE_MESSAGE
                                    }
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'email'} />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                fullWidth
                                label="Enter Password..."
                                type="password"
                                variant="outlined"
                                error={!!errors['password']}
                                {...register('password', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: PASSWORD_RULE,
                                        message: PASSWORD_RULE_MESSAGE
                                    }
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'password'} />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                fullWidth
                                label="Confirm Password..."
                                type="password"
                                variant="outlined"
                                error={!!errors['password_confirmation']}
                                {...register('password_confirmation', {
                                    validate: (value) => {
                                        if (value === watch('password')) return true
                                        return 'Password comfirmation dose not match'
                                    }
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
                        </Box>

                        <CardActions sx={{ marginTop: '1em', display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="submit" variant="contained" color="primary">Register</Button>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined">Login</Button>
                            </Link>
                        </CardActions>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default RegisterForm
