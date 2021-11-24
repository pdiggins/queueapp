import queueConstants from "../constants/queueConstants";

const defaultQueueState = {
    pending: [],
    completed: [],
    size: 0,
    completed_size: 0,
    empty: true,
    working_item: null,
};

const defaultAction = {};

const queueReducer = (state = defaultQueueState, action = defaultAction) => {
    const { type } = action;
    const newPending = [...state.pending];
    const newCompleted = [...state.completed];
    switch (type) {
        case queueConstants.ADD: {
            const { item } = action.payload;
            let working_item = state.working_item;
            if (state.working_item === null) {
                item.status = queueConstants.STARTED;
                working_item = item;
            } else {
                newPending.push(item);
            }
            return {
                ...state,
                pending: newPending,
                size: state.size + 1,
                empty: false,
                working_item,
            }
        }
        case queueConstants.CANCEL: {
            const { item, index } = action.payload;
            newPending.splice(index, 1);
            newCompleted.push(item);

            return {
                ...state,
                pending: newPending,
                completed: newCompleted,
                size: state.size-1,
                completed_size: state.completed_size+1,
                empty: state.size === 0,
            };
        }
        case queueConstants.RESOLVE: {
            const { item } = action.payload;
            newCompleted.push(item);

            let working_item = null;
            if (newPending.length > 0) {
                working_item = newPending.shift();
                working_item.status = queueConstants.STARTED;
            }

            return {
                ...state,
                pending: newPending,
                completed: newCompleted,
                size: state.size-1,
                completed_size: state.completed_size+1,
                empty: state.size === 0,
                working_item,
            };
        }
        case queueConstants.UPDATE_PROGESS: {
            const { progress } = action.payload;
            const newWorkingItem = {...state.working_item};
            newWorkingItem.progress = progress;

            return {
                ...state,
                pending: newPending,
                completed: newCompleted,
                working_item: newWorkingItem,
            };
        }
        case queueConstants.COMPLETE: {
            const curWorkingItem = {...state.working_item};
            curWorkingItem.status = queueConstants.COMPLETED;

            newCompleted.push(curWorkingItem);
            
            let working_item = null;
            if (newPending.length > 0) {
                working_item = newPending.shift();
                working_item.status = queueConstants.STARTED;
            }
            
            return {
                ...state,
                pending: newPending,
                completed: newCompleted,
                size: state.size-1,
                completed_size: state.completed_size+1,
                empty: state.size === 0,
                working_item,
            };
        }
        default: return state;
    }
};

export default queueReducer;