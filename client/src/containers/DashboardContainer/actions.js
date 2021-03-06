import { GET_DASHBOARD, UPDATE_DASHBOARD, RESET_NOTIFICATION } from './actionsTypes';
import { FETCH_VISUALIZATIONS } from '../AnalyticsContainer/actionsTypes';

export const getDashboard = (id) => {
  return {
    type: GET_DASHBOARD,
    id,
  };
};

export const fetchVisualizations = () => {
  return {
    type: FETCH_VISUALIZATIONS,
  };
};

export const updateDashboard = ({
  dashboardId,
  newVisualizationsId,
  deletedDashboardVisualizationsId,
  updatedDashboardData,
}) => {
  return {
    type: UPDATE_DASHBOARD,
    dashboardId,
    newVisualizationsId,
    deletedDashboardVisualizationsId,
    updatedDashboardData,
  };
};

export const resetNotification = () => {
  return {
    type: RESET_NOTIFICATION,
  };
};
