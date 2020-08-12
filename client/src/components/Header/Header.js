import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from '../../containers/LoginPageContainer/actions';
import AddDashboardModal from '../AddDashboardModal/AddDashboardModal';

import './styles.css';

const Header = ({ logout }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState(null);
  const [addDashboradModalVisible, setAddDashboradModalVisible] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddMenuClick = (event) => {
    setAddMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    logout();
    setAnchorEl(null);
  };

  const addVisualization = () => {
    history.push('/select-visualization');
    setAddMenuAnchorEl(null);
  };

  const hideAddDashboardModal = () => {
    setAddDashboradModalVisible(false);
  };

  const showAddDashboardModal = () => {
    // history.push('/select-visualization');
    setAddMenuAnchorEl(null);
    setAddDashboradModalVisible(true);
  };

  return (
    <header>
      <AddIcon className="header-icons" fontSize="large" onClick={handleAddMenuClick} />
      <Menu
        id="add-menu"
        anchorEl={addMenuAnchorEl}
        keepMounted
        open={Boolean(addMenuAnchorEl)}
        onClose={() => setAddMenuAnchorEl(null)}
      >
        <MenuItem onClick={addVisualization}>
          <BarChartIcon />
          Add Visualization
        </MenuItem>
        <MenuItem onClick={showAddDashboardModal}>
          <DashboardIcon />
          Add Dashboard
        </MenuItem>
      </Menu>
      <SettingsIcon className="header-icons" fontSize="large" onClick={handleClick} />
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleClose} disabled>
          Account Setting
        </MenuItem>
        <MenuItem onClick={handleClose} disabled>
          Admin
        </MenuItem>
        <MenuItem onClick={handleClose}>Sign out</MenuItem>
      </Menu>
      <AddDashboardModal
        isVisible={addDashboradModalVisible}
        closeModal={hideAddDashboardModal}
        addDashboard={console.log}
      />
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(Header);
