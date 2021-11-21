import queueConstants from '../constants/queueConstants';
import { v4 as uuidv4 } from 'uuid';

export const addItem = (item) => (dispatch) => {
    const defaultItem = {
        progress: 0,
        status: queueConstants.PENDING,
        id: uuidv4(),
    }
    const newItem = {...item, ...defaultItem};
    
    dispatch(
        {
            type: queueConstants.ADD,
            payload: {
                item: newItem,
            },
        },
    );
};

export const cancelPendingItem = (item, index) => (dispatch) => {
    const newItem = {...item, ...{ status: queueConstants.CANCELED }}
    
    dispatch(
        {
            type: queueConstants.CANCEL,
            payload: {
                item: newItem,
            },
        },
    );
};

export const cancelRunningItem = (item) => (dispatch) => {
    const newItem = {...item, ...{ status: queueConstants.CANCELED }}
    
    dispatch(
        {
            type: queueConstants.RESOLVE,
            payload: {
                item: newItem,
            },
        },
    );
};

export const updateProgress = (progress) => (dispatch) => {
    dispatch(
        {
            type: queueConstants.UPDATE_PROGESS,
            payload: {
                progress,
            },
        },
    );
};

export const completeCurrent = () => (dispatch) => {
    dispatch(
        {
            type: queueConstants.COMPLETE,
        },
    );
};