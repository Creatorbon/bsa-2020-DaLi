import React from 'react';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

const chooseIcon = (type, styles) => {
  switch (type) {
    case 'LINE_CHART': {
      return <TimelineOutlinedIcon style={styles} />;
    }
    case 'BAR_CHART': {
      return <EqualizerOutlinedIcon style={styles} />;
    }
    case 'TABLE': {
      return <TableChartOutlinedIcon style={styles} />;
    }
    default: {
      return null;
    }
  }
};

export default chooseIcon;