import React, { Component } from 'react'
import {  Button, Paper, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import Banner from '../Banner/Banner';
import './PickViolators.css'

class PickViolators extends Component {

    state = {
        statusBar : 73,
        violators : []
    }


    componentDidMount() {
        this.props.dispatch({type: 'FETCH_VALUES'});

        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
        })
    }


    handleNext = () => {
        if(this.state.violators ) {

            let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let pickViolatorTime = nextTime - this.state.time 

            this.props.dispatch({type: 'SET_NEW_VALUES', name: 'violators', payload: this.state.violators});
            this.props.dispatch({type: 'SET_NEW_TIME', name: 'pickViolatorTime', payload: pickViolatorTime });
            this.props.history.push("/OrderViolatorsInstructions")
        } else  {
            return alert('Please select 5 values that are least important to you.')
        }
    }

    handleSelect = (event) => {
        for(let i = 0; i < this.state.violators.length; i++) {
            if(event.target.value === this.state.violators[i]) {
                this.setState({
                    violators: this.state.violators.filter((_,j) => j !== i)
                })
                return;
            }
        }
        if(this.state.violators.length === 5) {
            return;
        }
        this.setState({
            violators: [...this.state.violators, event.target.value]
        })
        console.log(this.state.violators)
    }

    render() {
        let coreValues = this.props.coreValues
        let newArray = this.props.values.filter((value) => {
            for(let newValue of coreValues) {
                if(newValue === value.id) {
                    return false;
                }
            }
            return true;
        })

        
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>        
                <Paper>
                    <div className="violators">
                        <h2 className="header">Select five violator values</h2>
                        <ul className= "violist">
                            {newArray.map(value => {
                            return <li key={value.id} 
                                        onClick={this.handleSelect} 
                                        className={this.state.violators.includes(value.id) ? "highlight" : "unhighlight"} 
                                        value={value.id}>{value.values}</li>
                            })}
                        </ul>
                    </div>
                </Paper>
                <Grid container justify="center">
                    <Button
                        disabled={this.state.violators.length !== 5}
                        onClick={this.handleNext}
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
                </Grid>
                <p className="valueCount">{this.state.violators.length} / 5 values selected</p>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer,
        coreValues: reduxState.newValuesReducer.orderCore
    }
}
export default connect(mapStateToProps)(PickViolators);

