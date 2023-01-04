import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IUser } from '../Interface'

const useStyles = makeStyles({
    validText: {
        fontSize: 13,
        color: '#ee2b2b'
    }
})

interface IProps {
    open: boolean
    handleClickClose(): void
    u?: IUser | null
    updateTask(user: IUser): void
}

function EditForm({ open, handleClickClose, u, updateTask }: IProps) {
    console.log("USerrrrrrrrrr", u)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<IUser>()
    const classes = useStyles()
    const onSave = (data: IUser) => {
        console.log("Dataaaaaaaaaaaaaaaaaaaa", data)
        updateTask(data)
    };

    useEffect(() => {
        if (u) {
            setValue("email", u.email)
            setValue("first_name", u.first_name)
        }
    }, [u])

    return (
        <Dialog open={open} onClose={handleClickClose}>
            <form onSubmit={handleSubmit(onSave)}>
                <DialogTitle>Edit Profile</DialogTitle>

                <DialogContent>
                    <TextField
                        {...register('email', { required: true })}
                        autoFocus
                        margin='normal'
                        label='Email'
                        name='email'
                        type='text'
                        fullWidth
                        variant='outlined'
                    />
                    {errors.email && <span className={classes.validText}>This field cannot be Empty</span>}
                    <TextField
                        {...register('first_name', { required: true })}
                        autoFocus
                        margin='normal'
                        label='FirstName'
                        name='first_name'
                        type='text'
                        fullWidth
                        variant='outlined'
                    />
                    {errors.first_name && <span className={classes.validText}>This field cannot be Empty</span>}
                </DialogContent>

                <DialogActions>
                    <Button type='submit'>Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditForm