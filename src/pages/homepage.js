import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import { Router } from 'react-router';
import { borderRadius, fontSize, fontStyle } from '@material-ui/system';

import treeImage from '../assets/tree_transparent.png'
import sierpinskiImage from '../assets/sierpinski_transparent.png'

const useStyles = makeStyles((theme) => ({
    pageTitle: {
        marginTop: theme.spacing(2),
        backgroundColor: "#a5b9d9",
        borderRadius: 50,
        marginBottom: theme.spacing(5),
        textAlign: "center",
        fontSize: "500%"
    },
    buttonContainer: {
        backgroundColor: "#c2d8fc",
        backgroundImage: "linear-gradient(90deg, #c2d8fc, white)",
        padding: theme.spacing(3),
        marginBottom: theme.spacing(5),
        borderRadius: 15,
        fontSize: 30
    },
    containerTitle: {
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(0),
        fontSize: "200%"
    },
    horizontalLine: {
        border: 0,
        clear:"both",
        width: "100%",               
        backgroundImage: "linear-gradient(90deg, blue, white)",
        height: "2px",
        marginBottom: theme.spacing(4)
    },
    linkbutton: {
        padding: theme.spacing(4),
        marginRight: theme.spacing(15),
        textAlign: "center",
        borderRadius: 50,
        fontSize: 20
    },
    buttonText: {
        marginTop: theme.spacing(2)
    }
}));

function GridLinkButton({classes, to, text, image}) {
    return (
        <Grid item>
            <Button
                className={classes.linkbutton}
                variant="contained"
                color="primary"
                component={Link}
                to={to}
            >
                <Grid container direction="column" justify="flex-start" className={classes.insideButtonGrid}>
                    <img src={image}/>
                    <div className={classes.buttonText}>{text}</div>
                </Grid>
            </Button>
        </Grid>
    )
}

const Home = () => {
    const classes = useStyles();

    return (
        <div>
            <h1 className={classes.pageTitle}> Fractal Playground </h1>
            
            <Grid container direction="column" className={classes.buttonContainer} >
                <Grid item> <h2 className={classes.containerTitle}> 2D Fractals </h2> </Grid>
                <hr className={classes.horizontalLine}/>
                <Grid item> <Grid container direction="row">
                    <GridLinkButton classes={classes} image={treeImage} text="Fractal Tree" to="fractal-playground/tree"  />
                    <GridLinkButton classes={classes} image={sierpinskiImage} text="Sierpinski Triangles" to="/fractal-playground/sierpinski" />
                    <GridLinkButton classes={classes} text="Mandelbrot Set" to="/mandelbrot" />
                    <GridLinkButton classes={classes} text="L-Systems" to="/lsystems" />
                </Grid> </Grid>
            </Grid>

            <Grid container direction="column" className={classes.buttonContainer} >
                <Grid item> <h2 className={classes.containerTitle}> 3D Fractals </h2> </Grid>
                <hr className={classes.horizontalLine}/>
                <Grid item> <Grid container direction="row">
                    <GridLinkButton classes={classes} text="Mandelbrot 3D" to="/tree"  />
                    <GridLinkButton classes={classes} text="Dummy" to="/sierpinski" />
                    <GridLinkButton classes={classes} text="TBD Set" to="/mandelbrot" />
                    <GridLinkButton classes={classes} text="Something" to="/lsystems" />
                </Grid> </Grid>
            </Grid>


        </div>
    )
}

export default Home
