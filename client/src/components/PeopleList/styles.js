import { makeStyles } from '@material-ui/core/styles';

export const colorStyles = makeStyles({
  admin: {
    backgroundColor: '#7073a9',
  },
  user: {
    backgroundColor: '#519ee3',
  },
});

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: '0 4rem',
    boxSizing: 'border-box',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '20px',
  },
  dots: {
    cursor: 'pointer',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  panel: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
  },
  tabs: {
    justifyContent: 'flex-start',
  },
  tab: {
    textTransform: 'none',
    color: '#000',
  },
  select: {
    width: '100%',
    fontSize: 14,
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: '3px solid #1CD1A1',
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before': {
      borderBottom: '3px solid #1CD1A1',
    },
    '&.Mui-disabled:before': {
      border: 'none',
    },
  },
}));
