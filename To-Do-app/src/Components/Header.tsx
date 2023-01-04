import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    header: {
        textAlign: 'center',
        color: 'white',
        fontSize: '25px',
        padding: '10px',
        backgroundColor: '#162f40'
    },
})

function Header() {
    const classes = useStyles();
    return (
            <Grid className={classes.header}>To Do List</Grid>
    )
}

export default Header