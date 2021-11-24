import { useSelector } from 'react-redux';

import QueueItem from './QueueItem';

const QueueList = ({ pending }) => {
    const pendingItems = useSelector((state) => state.queueReducer.pending);
		const workingItem = useSelector((state) => state.queueReducer.working_item);
    const completedItems = useSelector((state) => state.queueReducer.completed);
		
		let combinedPending = [];
		if (workingItem) {
			combinedPending = [workingItem, ...pendingItems];
		}
    let items;
    if (pending) {
      items = combinedPending;
    } else {
      items = completedItems;
    }

    return (
      <div>
        {
          items.map((item, index) => (
            <QueueItem
              item={item}
              index={index}
            />     
          ))
        }
      </div>
    )
};

export default QueueList;