import React, { useState } from 'react'
import { Grid, TextField, makeStyles } from '@material-ui/core'
import { ITask } from '../Interface'
import TodoTaskList from './TodoTaskList'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles({

    validText: {
        fontSize: 13,
        color: '#ee2b2b'
    }
})

function AddTask() {

    const classes = useStyles()
    const [todoList, setTodoList] = useState<ITask[]>([])
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        reset()
        setOpen(true)
    }

    const handleClose = () => {
        reset()
        setOpen(false)
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ITask>()
    const onSubmit = (data: ITask) => {
        const id = todoList.length + 1
        const date = new Date()
        const newTask = { taskName: data.taskName, description: data.description, id: id, date: date }
        setTodoList([...todoList, newTask])
        reset()
        handleClose()
    }

    return (
        <Grid>
            <Grid className='btn-flex'>
                <Button id='btn-addtask' variant='contained' onClick={handleClickOpen}>Add Task</Button>
            </Grid>

            <TodoTaskList todoList={todoList} setTodoList={setTodoList} />

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add-Task</DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>

                        <DialogContentText>
                            Please provide the Name of the Task and Description below
                        </DialogContentText>

                        <TextField
                            {...register('taskName', { required: true })}
                            autoFocus
                            margin='normal'
                            label='TaskName'
                            id='TaskName'
                            name='taskName'
                            type='text'
                            fullWidth
                            variant='outlined' />
                        {errors.taskName && <span className={classes.validText}>This field cannot be Empty</span>}

                        <TextField
                            {...register('description', { required: true })}
                            autoFocus
                            margin='normal'
                            label='Description'
                            id='description'
                            name='description'
                            type='text'
                            fullWidth
                            variant='outlined' />
                        {errors.description && <span className={classes.validText}>This field cannot be Empty</span>}

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Grid>
    )
}

export default AddTask

