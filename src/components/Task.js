import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '100px',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            width: theme.spacing(50),
            height: theme.spacing(30),
        },
    },

    paper: {
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
        paddingLeft: "20px",
        
    },

    field: {
        marginTop: '20px',
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
    },

    inputStyle: {
        // fontWeight: 'bold'
    }
}));


function Task(props) {
    const classes = useStyles();
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [isDisabled, setDisabled] = useState(true)
    const [edit, setEditDisabled] = useState(false)
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/list/${props.match.params.id}`)
            .then((res) => {
                console.log(res)
                setTitle(res.data.title)
                setDescription(res.data.description)
                setStatus(res.data.tag)
            })
            .catch((err) => console.log(err))
    },[count])

    const handleEdit=()=>{
        setEditDisabled(true)
        setDisabled(false)
    }

    const handleSave=()=>{
        axios.patch(`http://localhost:5000/list/${props.match.params.id}`, {
            title: title,
            description: description,
            tag: status
        })
        .then((res) => {
            console.log(res)
            setCount(count+1)
        })
        .catch((err) => console.log(err))
        setEditDisabled(!edit)
        setDisabled(true)
    }

    const handleDelete=()=> {
        axios.delete(`http://localhost:5000/list/${props.match.params.id}`)
        .then((res) => {
            console.log(res.data)
            props.history.push('/home')
            props.notifyOnDelete(`Deleted Task titled ${title}`)
        })
        .catch((err) => console.log(err))
    }
    return (
        <div className={classes.root}>
            <Paper >
               <div className={classes.field}>Title: <input className={classes.inputStyle} id="title" name="title" value={title} disabled={isDisabled} onChange={(e) => setTitle(e.target.value)} /></div>
               <div className={classes.field}>Description: <input  className={classes.inputStyle} id="description" name="description" value={description} disabled={isDisabled} onChange={(e) => setDescription(e.target.value)} /></div>
               <div className={classes.field}>Status: <input className={classes.inputStyle}id="status" name="status" value={status} disabled={isDisabled} onChange={(e) => setStatus(e.target.value)}/></div>

               <div className={classes.field}><Button variant="contained" color="primary" disabled={edit} onClick={handleEdit}>Edit</Button><Button variant="contained" color="primary" disabled={isDisabled} onClick={handleSave}>Save</Button></div>
               <DialogActions>
                   <DeleteForeverOutlinedIcon style={{color: "#b22222", fontSize: '35px', cursor: "pointer"}} onClick={() => handleDelete()}></DeleteForeverOutlinedIcon>
               </DialogActions>
            </Paper>
        </div>
    );
}

export default Task;