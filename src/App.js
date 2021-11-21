import {
  withStyles,
} from '@mui/styles';

import Header from './components/Header';
import QueueContainer from './components/QueueContainer';

const styles = () => ({
  app: {
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    top: '92px',
    overflowY: 'auto',
    position: 'relative',
    width: '100%',
  }
})

const App = ({classes}) => {
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.content}>
         <QueueContainer />
      </div>
    </div>
  );
}

export default withStyles(styles)(App);
