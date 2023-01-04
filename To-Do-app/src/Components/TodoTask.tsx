import React, { useEffect, useState } from 'react'
import { ITask } from '../Interface'
import EditIcon from '@mui/icons-material/Edit'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Grid, TextField, makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from "react-hook-form"

const useStyles = makeStyles({

    validText: {
        fontSize: 13,
        color: '#ee2b2b'
    }
})
interface IProps {
    task: ITask
    description: string
    id: number
    date: Date

    onDelete(taskIdToDelete: number): void
    onEdit(taskEditId: number, taskEditName: string, taskEditDescription: string): void
}

const TodoTask = ({ task, onDelete, onEdit }: IProps) => {

    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, setValue, formState, formState: { errors } } = useForm<ITask>({ mode: 'onChange' })

    useEffect(
        () => {
            setValue("taskName", task.taskName)
            setValue("description", task.description)
        }, [task])

    const openDeleteModal = () => {
        setOpen(true)
    }

    const closeDeleteModal = () => {
        setOpen(false)
    }

    const [save, setSave] = useState(false)

    const openEditModal = () => {
        setSave(true)
    }

    const closeEditModal = () => {
        setSave(false)
    }

    const onSave = (data: ITask) => {
        if (data.taskName != null && data.description != null)
            onEdit(task.id, data.taskName, data.description)
    }

    return (
        <>
            <Grid>
                <div className='tableTaskList'>
                    <div className="tableTask">
                        <td>{task.id}.</td>
                        <td>{task.taskName}</td>
                        <td>{task.description}</td>
                        <td>{task.date.toLocaleString()}</td>
                        <td>
                            <EditIcon onClick={openEditModal} id='btn-edit' />
                            <HighlightOffIcon onClick={openDeleteModal} id='btn-delete' />

                            {/* Delete Dialog */}
                            <Dialog open={open} onClose={closeDeleteModal} >
                                <DialogTitle>
                                    {"Confirm Delete"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to delete?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeDeleteModal}>Disagree</Button>
                                    <Button id="btn-agree" onClick={() => {
                                        onDelete(task.id); closeDeleteModal()
                                    }}>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            {/* Edit Dialog */}

                            <Dialog open={save} onClose={closeEditModal}>
                                <form onSubmit={handleSubmit(onSave)}>
                                    <DialogTitle>Edit Task</DialogTitle>

                                    <DialogContent>
                                        <TextField
                                            {...register('taskName', { required: true })}
                                            autoFocus
                                            margin='normal'
                                            label='TaskName'
                                            name='taskName'
                                            type='text'
                                            fullWidth
                                            variant='outlined'
                                        />
                                        {errors.taskName && <span className={classes.validText}>This field cannot be Empty</span>}
                                        <TextField
                                            {...register('description', { required: true })}
                                            autoFocus
                                            margin='normal'
                                            label='Description'
                                            name='description'
                                            type='text'
                                            fullWidth
                                            variant='outlined'
                                        />
                                        {errors.description && <span className={classes.validText}>This field cannot be Empty</span>}
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={closeEditModal}>Cancel</Button>
                                        <Button type='submit' variant='contained' color='primary' disabled={!formState.isValid}
                                            onClick={() => {
                                                onEdit(task.id, task.taskName, task.description);
                                                // const multipleValues = getValues(["taskName", "description"]);
                                                closeEditModal()
                                            }}
                                        >
                                            Save</Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </td>
                    </div>
                </div>
            </Grid>
        </>
    )
}

export default TodoTask