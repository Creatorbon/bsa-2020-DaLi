import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useStyles } from './styles';

const PeoplePageMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.menu}>
      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <NavLink
            exact
            activeClassName={classes.activeLink}
            className={classes.link}
            to={{
              pathname: '/admin/people',
            }}
            key="people"
          >
            People
          </NavLink>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <NavLink
            activeClassName={classes.activeLink}
            className={classes.link}
            to={{
              pathname: '/admin/people/groups',
            }}
            key="groups"
          >
            Groups
          </NavLink>
        </MenuItem>
      </MenuList>
    </div>
  );
};

export default PeoplePageMenu;
