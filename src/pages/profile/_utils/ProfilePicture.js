import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	profile: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		marginTop: 15,
		marginBottom: 15,
		margin: 'auto'
	},
	selection: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		marginBottom: 15
	}
}));

function ProfilePicture(props) {
	const classes = useStyles();
	return (
		<div>
			<span className='d-flex justify-content-center'>
				<Avatar
					alt={props.name}
					src={props.profilePic === '' ? null : require('./../../../res/img/' + props.profilePic)}
					type='button'
					data-toggle="modal"
					data-target={'#change-profile-pic'}
					className={classes.profile} />
			</span>
		</div>
	)
}

export function SelectionPicture(props) {
	const classes = useStyles();
	return (
		<Avatar
			alt={props.name}
			src={props.profilePic === '' ? null : require('./../../../res/img/' + props.profilePic)}
			type='button'
			className={classes.selection} 
			onClick={() => props.onProfilePicChange(props.profilePic)}
			/>
	)
}

export default ProfilePicture