import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
	Grid,
  IconButton,
	LinearProgress,
  Paper,
	Typography,
} from '@mui/material';

import {
	red,
} from '@mui/material/colors';

import {
  withStyles,
} from '@mui/styles';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import QueueIcon from '@mui/icons-material/Queue';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import queueConstants from '../constants/queueConstants';

import {
	cancelPendingItem,
	cancelRunningItem,
	completeCurrent,
	updateProgress,
} from '../actions/queueActions';

const styles = () => ({
	icon: {
		verticalAlign: "middle",	
	}
})

const QueueList = ({ classes, item, index}) => {
	const dispatch = useDispatch();

	let durationInSeconds = item.duration;
	if (item.timeFormat === "minutes") {
		durationInSeconds = durationInSeconds * 60;
	}

	useEffect(() => {
		if (item.status === queueConstants.STARTED) {
			if (item.progress === 100) {
				dispatch(completeCurrent());
			} else {
				const timer=setTimeout(() => {
					const newProgress = item.progress+1;
					// setProgress(newProgress);
					dispatch(updateProgress(newProgress));
				}, 10*durationInSeconds);
				return () => clearTimeout(timer);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item])

	const actionIcon = (status) => {
		if (status === queueConstants.PENDING) {
			return (
				<IconButton
					aria-label="remove"
					onClick={() => dispatch(cancelPendingItem(item, index-1))}
				>
            <DeleteIcon />
          </IconButton>
			);
		}
		if (status === queueConstants.STARTED) {
			return (
				<IconButton
					aria-label="remove"
					onClick={() => dispatch(cancelRunningItem(item))}
				>
            <RemoveCircleIcon sx={{ color: red[500] }} />
          </IconButton>
			);
		}
		if (status === queueConstants.COMPLETED) {
			return (
        <CheckCircleIcon color="success" />
			)
		}
		if (status === queueConstants.CANCELED) {
			return (
        <RemoveCircleIcon />
			);
		}
		return null;
	};
    
  return (
    <Paper>
      <Grid
				container
				justifyContent="center"
				alignItems="center"
				spacing={3}
			>
        <Grid item xs={2}>
					<Typography varient="body1" align="left">
						<QueueIcon className={classes.icon} />
						{`Job Name: ${item.itemName}`}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Typography varient="body1" align="left">
          	<ScheduleIcon className={classes.icon} />
						{`Duration: ${item.duration} ${item.timeFormat}`}
					</Typography>
        </Grid>
        <Grid item xs={4}>
					<Typography varient="body1">
						{`Status: ${item.status}`}
					</Typography>
					{item.status === queueConstants.STARTED && 
						<LinearProgress
							variant="determinate"
							value={item.progress}
						/>
					}
        </Grid>
				<Grid item xs={3} >
					<div />
				</Grid>
        <Grid item xs={1}>
					{actionIcon(item.status)}
        </Grid>
      </Grid>
    </Paper>
  )
};

export default withStyles(styles)(QueueList);