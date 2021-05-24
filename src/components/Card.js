import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        
        '& > *': {
            margin: theme.spacing(),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            width: theme.spacing(120),
            height: theme.spacing(7),
        },
    },

    paper: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingLeft: "20px",
        fontWeight: 'bold'
    }
}));


function Card(props) {
    // console.log(props)
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper} onClick={() => props.history.push(`/tasks/${props.item.id}`)}>
                {props.item.title}
            </Paper>
        </div>
    );
}

export default withRouter(Card);