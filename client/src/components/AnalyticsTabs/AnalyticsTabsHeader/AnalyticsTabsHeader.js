import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

const useStyles = makeStyles(() => ({
  tabsHeader: {
    boxShadow: 'none',
    backgroundColor: 'inherit',
    color: '#509ee3',
    fontWeight: 900,
    paddingBottom: 0,
  },
  selected: {},
  indicator: {
    backgroundColor: '#509ee3',
  },
}));

const TabsHeader = ({ value, children, onChange }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.tabsHeader} position="static" color="default">
      <Tabs value={value} onChange={onChange} classes={{ indicator: classes.indicator }}>
        {children}
      </Tabs>
    </AppBar>
  );
};

TabsHeader.propTypes = {
  value: PropTypes.number,
  children: PropTypes.node,
  onChange: PropTypes.func,
};

export default TabsHeader;
