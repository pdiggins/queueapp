import { useState } from 'react';

import {
  Tab,
  Box,
} from '@mui/material';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab'

import QueueList from './QueueList';

const QueueContainer = () => {
	const [tabValue, setTabValue] = useState('0');

	return (
		<>
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={tabValue}>
					<Box
						sx={{ borderBottom: 1, borderColor: 'divider' }}
					>
						<TabList
							onChange={(e, newValue) => setTabValue(newValue)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#ff9800',
                }
              }}
              textColor="inherit"
						>
							<Tab
								label="Started/Pending"
								value='0'
							/>
							<Tab
								label="Completed"
								value='1'
							/>
						</TabList>
					</Box>
					<TabPanel value='0' index={0}>
						<QueueList
							pending={true}
						/>
					</TabPanel>
					<TabPanel value='1' index={1}>
						<QueueList
							pending={false}
						/>
					</TabPanel>
				</TabContext>
			</Box>
		</>
	)
};

export default QueueContainer;