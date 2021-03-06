import React, {useState, useEffect} from 'react';

import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const [User, setUser] = useState(false);

    return (
        <Paper className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                <Link href="/"><a>News</a></Link>
                </Typography>
                { User ? <Button color="inherit">Logout</Button> : <Button color="inherit">Login</Button>}
            </Toolbar>
            </AppBar>
        </Paper>
    );
}

export default NavBar;
