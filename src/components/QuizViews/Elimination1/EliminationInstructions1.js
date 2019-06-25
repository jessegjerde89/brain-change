import React, { Component } from 'react'
import { Link } from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

import './EliminationInstructions1.css'

export class EliminationInstructions1 extends Component {
    render() {
        return (
            <div>
                <div className="instructions">
                
                On the next screen there will be a list of values. 
                Remove the 9 values that are the least important to you.
                
                 </div>

                 <div className="giph">

                </div>
                
            <Link to="/Elim1"> 
                <Button
                    color="primary"
                    variant="contained"
                    >
                    Next
                </Button> 
            </Link>
            </div>
        )
    }
}

export default EliminationInstructions1