import {
	Button,
  Dialog,
	DialogActions,
  DialogContent,
	DialogTitle,
  Typography,
} from "@mui/material";
  
const RemoveItemConfirm = ({
	open,
	name,
  onSubmit,
	onClose,
}) => (
  <Dialog
		open={open}
	  onClose={onClose}
  >
		<DialogTitle>
			<Typography variant="h5">
		  	{`Remove Queue Item: ${name}`}
			</Typography>
		</DialogTitle>
		<DialogContent>
			<Typography variant="subtitle1">
			  This will permenantly remove the item from the queue.
		  </Typography>
	  </DialogContent>
		<DialogActions>
		  <Button
			  onClick={() => onSubmit()}
			>
			  Confrim
		  </Button>
		  <Button
				onClick={() => onClose()}
			>
			  Cancel
		  </Button>
	  </DialogActions>
	</Dialog>
);

export default RemoveItemConfirm; 