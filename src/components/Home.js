import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '100px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    field: {
        marginTop: '20px',
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
    },
  }));


function Home(props){
    const classes = useStyles();
    const [list, setList] = useState([])
    const [count, setCount] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    let not_started=[], in_progress=[], completed=[];

    if(list.length>0){
        not_started = list.filter((item) => {
            if(item.tag == "not started")
                return item;
        })
    
        in_progress = list.filter((item) => {
            if(item.tag == "in progress")
                return item;
        })
    
        completed = list.filter((item) => {
            if(item.tag == "completed")
                return item;
        })
    }

    
    
    const handleOnDragEnd=(result)=> {
        console.log(result)
        if(result.destination!=null){
            axios.patch(`https://to-do-app-json-server.herokuapp.com/list/${result.draggableId}/`, {
            tag: `${result.destination.droppableId}`
            }).then(resp => {

                console.log(resp.data);
            }).catch(error => {

                console.log(error);
            });  

            setCount(count+1);
        }
        
}


    useEffect(() => {
        axios.get("https://to-do-app-json-server.herokuapp.com/list")
        .then((res) => {
            console.log(res.data)
            setList(res.data)
        })
        .catch((err) => console.log(err))
    },[count])


    const handleClickOpen = (status) => {
        setOpen(true);
        setStatus(status)
};
    
      const handleClose = () => {
        setOpen(false);
};

const handleSubmit = () => {
    if(title=="" || description==""){
        alert("Title and Descripton cannot be empty");
    }

    else{
        const id=uuidv4();
        axios.post(`https://to-do-app-json-server.herokuapp.com/list`, {
            id: id,
            title: title,
            description: description,
            tag: status
        })
        .then((res) => {
                console.log(res)
                setCount(count+1)
                props.notifyOnCreate(`New task titled ${title} created`);
        })
        .catch((err) => console.log(err))

        handleClose();
        setTitle(""); 
        setDescription("")
        setStatus("")
    }
}

    return (
        <div className={classes.root}>
            
            <Grid container spacing={3}>
            <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
                <Grid item xs={12} sm={4} lg={4}>
                    <div className="flex-container">
                        <div className="chip-not-started">Not Started</div>
                        <span style={{marginLeft: '5px', opacity: "0.5"}}>{not_started.length}</span>
                        <span style={{marginLeft: '5px', opacity: "0.5" , marginTop: '0px', marginLeft: 'auto'}}>...</span>
                        <span style={{marginLeft: '5px', opacity: "0.5", fontSize: '25px', cursor: "pointer"}} onClick={()=>handleClickOpen("not started")}>+</span>
                    </div>
                        
                            <Droppable droppableId="not started">
                               {(provided) => (
                                    <ul className="not started" style={{listStyle:"none"}} {...provided.droppableProps} ref={provided.innerRef}>
                                        {not_started.map((item, index) => {
                                            return(
                                                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                                   {(provided) => (
                                                       <li x ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                       <Card item={item} />
                                                       </li>
                                                   )}     
                                                    
                                                </Draggable>
                                            )}
                               )} 
                                {provided.placeholder}
                                </ul>
                               )}
                            </Droppable>
                            <div className="flex-container">
                            <span style={{marginLeft: "30px", opacity: "0.5", fontSize: '18px', cursor: "pointer"}} onClick={()=>handleClickOpen("not started")}>+ New</span>
                            </div>
                    
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                    <div className="flex-container">
                        <div className="chip-in-progress">In progress</div>
                        <span style={{marginLeft: '5px', opacity: "0.5"}}>{in_progress.length}</span>
                        <span style={{marginLeft: '5px', opacity: "0.5" , marginTop: '0px', marginLeft: 'auto'}}>...</span>
                        <span style={{marginLeft: '5px', opacity: "0.5", fontSize: '25px', cursor: "pointer"}} onClick={()=>handleClickOpen("in progress")}>+</span>
                    </div>
                       
                    
                    {/* <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}> */}
                            <Droppable droppableId="in progress">
                               {(provided) => (
                                    <ul className="in progress" style={{listStyle:"none"}} {...provided.droppableProps} ref={provided.innerRef}>
                                        {in_progress.map((item, index) => {
                                            return(
                                                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                                   {(provided) => (
                                                       <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                       <Card item={item} />
                                                       </li>
                                                   )}     
                                                    
                                                </Draggable>
                                            )}
                               )} 
                                {provided.placeholder}
                                </ul>
                               )}
                            </Droppable>
                        {/* </DragDropContext> */}
                        <div className="flex-container">
                        <span style={{marginLeft: '30px', opacity: "0.5", fontSize: '18px', cursor: "pointer"}} onClick={()=>handleClickOpen("in progress")}>+ New</span>
                        </div>
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                    <div className="flex-container">
                        <div className="chip-completed">Completed </div>
                        <span style={{marginLeft: '5px', opacity: "0.5"}}>{completed.length}</span>
                        <span style={{marginLeft: '5px', opacity: "0.5" , marginTop: '0px', marginLeft: 'auto'}}>...</span>
                        <span style={{marginLeft: '5px', opacity: "0.5", fontSize: '25px', cursor: "pointer"}} onClick={()=>handleClickOpen("completed")}>+</span>
                    </div>
                    {/* <DragDropContext> */}
                            <Droppable droppableId="completed">
                               {(provided) => (
                                    <ul className="completed" style={{listStyle:"none"}} {...provided.droppableProps} ref={provided.innerRef}>
                                        {completed.map((item, index) => {
                                            return(
                                                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                                   {(provided) => (
                                                       <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                       <Card item={item} />
                                                       </li>
                                                   )}     
                                                    
                                                </Draggable>
                                            )}
                               )} 
                                {provided.placeholder}
                                </ul>
                               )}
                            </Droppable>
                            <div className="flex-container">
                            <span style={{marginLeft: '30px', opacity: "0.5", fontSize: '18px', cursor: "pointer"}} onClick={()=>handleClickOpen("completed")}>+ New</span>
                            </div>
                </Grid>
                </DragDropContext>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id='add_task'>Add Task</DialogTitle>
                <DialogContent >
                    <div className={classes.field}>Title: <input className={classes.inputStyle} id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                    <div className={classes.field}>Description: <input  className={classes.inputStyle} id="description" name="description" value={description}  onChange={(e) => setDescription(e.target.value)}/></div>
                    <div className={classes.field}>Status: <input className={classes.inputStyle}id="status" name="status" value={status} /></div>
                </DialogContent>
                <DialogActions>
                    <div><Button variant="contained" color="primary" onClick={() => handleSubmit()}>Add</Button></div>
                </DialogActions>
            </Dialog>
        </div>
    );

} 

export default withRouter(Home);