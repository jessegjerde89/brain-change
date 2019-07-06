import React, { Component } from 'react'
import {  Grid, Button, Paper, Typography } from '@material-ui/core';
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner';
import './EliminationInstructions3.css'

class EliminationInstructions3 extends Component {

    state = {
        statusBar: 25
    }

    render() {
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>
                    <Paper justify="center" className ="paper">
                        <div className="instructions">
                        <Typography variant="h5" 
                            component="h2" 
                            // className="instructions" 
                            >
                            On the next screen you will see the updated list of values. 
                            This time, remove 5 values that are the least important to you.  
                        </Typography>
                        </div>
                    <div className="giph">

                    </div>

                    
                    <div className="button">
                        <Button  
                            color="primary"
                            variant="contained"
                            onClick={() => this.props.history.push('/Elim3')}
                            >
                            Next
                        </Button> 
                    </div>
                </Paper>
       
            </div>
        )
    }
}

export default EliminationInstructions3
