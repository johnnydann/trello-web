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
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import {
    EMAIL_RULE,
    EMAIL_RULE_MESSAGE,
    PASSWORD_RULE,
    PASSWORD_RULE_MESSAGE,
    FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const submitLogin = (data) => {
        console.log('🚀 ~ submitLogin:', data)
    }
    console.log('errors: ', errors)

    return (
        <form onSubmit={handleSubmit(submitLogin)}>
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
                        Author: DPN
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

                        {/* <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
                            <Alert severity="success" sx={{ overflow: 'hidden' }}>
                                Your email&nbsp;
                                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                                    dpndev@gmail.com
                                </Typography>
                                    &nbsp;has been verified.<br />Now you can login to enjoy our services! Have a good day!
                            </Alert>

                            <Alert severity="info" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                    An email has been sent to&nbsp;
                                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                                    dpn@gmail.com
                                </Typography>
                                <br />Please check and verify your account before logging in!
                            </Alert>
                        </Box> */}

                        <CardActions sx={{ marginTop: '1em', display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="submit" variant="contained" color="primary">Login</Button>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined">Register</Button>
                            </Link>
                        </CardActions>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default LoginForm
