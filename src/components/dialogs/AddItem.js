import { useState } from 'react';

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	MenuItem,
	TextField,
	Typography
} from '@mui/material';

import {
	withStyles,
} from '@mui/styles';

const styles = () => ({
	topGrid: {
		margin: '20px',
	}
});

const AddItemDialog = ({
	classes,
	open,
	onSubmit,
	onClose,
}) => {
	const [itemName, setItemName] = useState('');
	const [duration, setDuration] = useState(0);
	const [timeFormat, setTimeFormat] = useState('minutes');

	const onClickClose = () => {
		setItemName('');
		setDuration('');
		setTimeFormat('minutes');
		onClose();
	}

	const onClickSubmit = () => {
		const item = {
			itemName,
			duration,
			timeFormat,
		};
		onSubmit(item);
		onClickClose()
	}

	return (
		<Dialog
		open={open}
		onClose={onClickClose}
		>
			<DialogTitle>
				<Typography variant="h5">
					Add Queue Item
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Grid container direction={"column"} spacing={3}>
					<Grid item className={classes.topGrid}>
						<Box mt={1}>
							<TextField
								id="item-name"
								name="item-name"
								label="Item Name"
								helperText="Fill in the full name/description of job to add."
								value={itemName}
								fullWidth
								onChange={(val) => setItemName(val.target.value)}
							/>
						</Box>
					</Grid>
					<Grid item>
						<TextField
							id="item-duration"
							name="item-duration"
							label="Item Duration"
							helperText="Fill in the duration of job as a number."
							type="number"
							value={duration}
							fullWidth
							onChange={(val) => setDuration(val.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							id="time-format"
							name="time-format"
							label="Time Format"
							helperText="Select time format in seconds or minutes."
							select
							value={timeFormat}
							fullWidth
							onChange={(val) => setTimeFormat(val.target.value)}
						>
							{['minutes', 'seconds'].map((val) => (
								<MenuItem key={val} value={val}>
								{val}
							</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => onClickSubmit()}
				>
					Submit
				</Button>
				<Button
					onClick={() => onClickClose()}
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default withStyles(styles)(AddItemDialog); 