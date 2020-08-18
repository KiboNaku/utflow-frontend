import React from 'react';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import TabPanel from '../TabPanel'
import CourseScheduleEntry from './CourseScheduleEntry'
import './CourseSchedule.css'

class CourseSchedule extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            courseSchedule: props.courseSchedule,
            currentTab: 0,
            open: true
        }

        this.handleCollapse = this.handleCollapse.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(event, newValue) {
        this.setState({ currentTab: newValue })
    }

    handleCollapse() {
        this.setState((prevState) => ({
            open: !prevState.open
        }))
    }

    render() {

        let arrowIcon = this.state.open ? 
        <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        
        const currentSemList = this.state.courseSchedule.currentSem.map(course => {
            return (
                <CourseScheduleEntry {...course} />
            )
        })
        const futureSemList = this.state.courseSchedule.futureSem.map(course => {
            return (
                <CourseScheduleEntry {...course} />
            )
        })

        let noCourses = (
            <h5 className="none-scheduled">
                This course is not scheduled for this semester <br></br><br></br>
            </h5>
        )

        let currentSem = (
            <table className='table table-hover table-responsive schedule-table'>
                <thead>
                    <tr>
                        <th scope="col">Unique #</th>
                        <th scope="col">Professor</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSemList}
                </tbody>
            </table>
        )

        let futureSem = (
            <table className='table table-hover table-responsive schedule-table'>
                <thead>
                    <tr>
                        <th scope="col">Unique #</th>
                        <th scope="col">Professor</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {futureSemList}
                </tbody>
            </table>
        )

        let result = (
            <div className="semSchedule">
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.currentTab}
                        variant="fullWidth"
                        centered
                        name="currentTab"
                        onChange={this.handleTabChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#bf5700'
                            }
                        }}
                    >
                        <Tab className="schedule-tabs" label="Summer 2020" aria-controls='tabpanel-0' />
                        <Tab className="schedule-tabs" label="Fall 2020" aria-controls='tabpanel-1' />
                    </Tabs>
                </AppBar>

                <div className="semSchedule">
                    <TabPanel index={0} value={this.state.currentTab}>
                        {currentSemList.length > 0 ? currentSem : noCourses}
                    </TabPanel>
                </div>

                <div className="semSchedule">
                    <TabPanel index={1} value={this.state.currentTab}>
                        {futureSemList.length > 0 ? futureSem : noCourses}
                    </TabPanel>
                </div>
            </div>
        )

        return (
            <div className="courseSchedule">
                <div className="course-card">
                    <div className="card-header course-header" /*onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#schedule-collapse"*/>
                        <h4 className="details-header"> Course Schedule</h4>
                    </div>
                    <div className="collapse show" id="schedule-collapse" role="tabpanel">
                        <div className="card-body card-table">
                            {result}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseSchedule;