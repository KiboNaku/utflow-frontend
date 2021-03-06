import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const propTypes = {
    // average eCIS score for the course
    eCIS: PropTypes.number,

	// percentage of ratings that have positive approval for the course
	percentLiked: PropTypes.number,

    // average difficulty rating for the course
    difficulty: PropTypes.number,

    // average usefulness rating for the course
    usefulness: PropTypes.number,

    // average workload rating for the course
    workload: PropTypes.number,
	
	// number of ratings for the course
	numRatings: PropTypes.string
}

function CourseRatings(props) {

    const StyledRating = withStyles({
        iconFilled: {
            color: '#bf5700',
        },
    })(Rating);

    // determine rating values depending on whether they are null or if they exist
    const percentLikedValue = props.percentLiked === null ? 100 : props.percentLiked
    const percentLiked = props.percentLiked === null ? "N/A" : props.percentLiked.toString() + "%"

    const difficultyValue = props.difficulty === null ? 0 : props.difficulty
    const difficulty = props.difficulty === null ? "N/A" : props.difficulty

    const workloadValue = props.workload === null ? 0 : props.workload
    const workload = props.workload === null ? "N/A" : props.workload

    const usefulnessValue = props.usefulness === null ? 0 : props.usefulness
    const usefulness = props.usefulness === null ? "N/A" : props.usefulness

    const eCISValue = props.eCIS === null ? 0 : props.eCIS
    const eCIS = props.eCIS === null ? "N/A" : props.eCIS

    const numRatings = props.numRatings

    // change progress bar appearance depending on whether percentLiked is null
    const progressClass = props.percentLiked === null ? "progress-bar progress-bar-striped" : "progress-bar"
    
    return (
        <div className="course-ratings">
            <h3 className="rating-heading"> User Ratings ({numRatings})</h3>
            <div className="rating">
                <p className="p-rating"> Liked: {percentLiked} </p>
                <div className="progress" style={{backgroundColor: 'gray'}}>
                    <div
                        className={progressClass}
                        role="progressbar"
                        style={{ width: `${percentLikedValue}%`, backgroundColor: props.percentLiked === null ? "gray": "#fbfbfb" }}
                        aria-valuenow={percentLikedValue}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                    </div>
                </div>
            </div>
            <div className="userRatings">
                <div className="rating">
                    <p className="p-rating"> eCIS: {eCIS} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={eCISValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon style={{color: "gray"}} fontSize="large" />}
                        readOnly
                    />
                </div>
                <div className="rating">
                    <p className="p-rating"> Usefulness: {usefulness} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={usefulnessValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon style={{color: "gray"}} fontSize="large" />}
                        readOnly
                    />
                </div>
            </div>
            <div className="userRatings">
                <div className="rating">
                    <p className="p-rating"> Workload: {workload} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={workloadValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon style={{color: "gray"}} fontSize="large" />}
                        readOnly
                    />
                </div>
                <div className="rating">
                    <p className="p-rating"> Difficulty: {difficulty} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={difficultyValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon style={{color: "gray"}} fontSize="large" />}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}

CourseRatings.propTypes = propTypes

export default CourseRatings;