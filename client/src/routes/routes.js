import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from '../containers';
import {
  LoginPage,
  SelectVisualizationPage,
  VisualizationsPage,
  ViewVisualizationPage,
  AccountSettingsPage,
  DashboardPage,
} from '../pages';

const routes = (
  <Switch>
    <PublicRoute exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={VisualizationsPage} />
    <ProtectedRoute path="/visualizations/:id" component={ViewVisualizationPage} />
    <ProtectedRoute exact path="/select-visualization" component={SelectVisualizationPage} />
    <ProtectedRoute exact path="/select-visualization/:id" component={ViewVisualizationPage} />
    <ProtectedRoute exact path="/account-settings" component={AccountSettingsPage} />

    <Route path="/dashboard/:id" component={DashboardPage} />
  </Switch>
);

export default routes;