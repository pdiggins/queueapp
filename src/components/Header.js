import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    AppBar,
    IconButton,
    Grid,
    Toolbar,
    Typography,
} from '@mui/material';

import {
    withStyles,
  } from '@mui/styles';

import {
    orange,
} from '@mui/material/colors';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';

import AddItemDialog from './dialogs/AddItem';

import { addItem } from '../actions/queueActions';

const styles = () => ({
    text: {
      color: orange[500],
    },
    appbar: {
        backgroundColor: "#2a3eb1",
    },
  });

const Header = ({classes}) => {
    const dispatch = useDispatch();
    const pendingItems = useSelector((state) => state.queueReducer.pending);
    const [addItemDialog, setAddItemDialog] = useState(false);

    const onAddItemClose = (item) => {
        setAddItemDialog(false);
    }

    const onAddItemSubmit = (item) => {
        setAddItemDialog(false);
        dispatch(addItem(item));
    }

    const onRefresh = () => {
        console.log("Would trigger a refresh from the server once the server is implemented.")
    }

    const currentJob = (exists, name) => {
        if (exists) {
            return (
                <>
                    <Typography variant="subtitle1" className={classes.text} >
                        {`Current Job: ${name}`}
                    </Typography>
                </>
            )
        }
        return (
            <Typography variant="subtitle1" className={classes.text} >
                There are no jobs currently running.
            </Typography>
        )
    }

    const jobExists = pendingItems.length > 0;
    let jobName = '';
    if (jobExists) {
        jobName = pendingItems[0].itemName;
    }

    return (
        <div>
            <AppBar
                position="fixed"
                data-cy="app-bar"
                className={classes.appbar} 
            >
                <Toolbar>
                    <Grid
                        container
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <Typography variant="h6" className={classes.text}>
                                Task Print Queue
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton
                                aria-label="add"
                                onClick={() => setAddItemDialog(true)}
                                sx={{ color: orange[500] }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                            <IconButton
                                aria-label="refresh"
                                onClick={() => onRefresh()}
                                sx={{ color: orange[500] }}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Grid
                    container
                    justifyContent="center"
                >
                    {currentJob(jobExists, jobName)}
                </Grid>
            </AppBar>
            <AddItemDialog
                open={addItemDialog}
                onClose={onAddItemClose}
                onSubmit={onAddItemSubmit}
            />
        </div>
    );
}; 

export default withStyles(styles)(Header);