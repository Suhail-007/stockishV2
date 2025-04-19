import { createSlice } from '@reduxjs/toolkit';

import { DashboardInitialState } from './types/dashboardSlice.type';

const initialState: DashboardInitialState = {
  id: 'dashboardState',
  totalActiveUsers: 0,
  totalAmount: 0,
  totalCancelledOrders: [],
  totalDeliveredOrders: [],
  totalInActiveUsers: 0,
  totalOrders: 0,
  totalPendingOrders: [],
  totalProfit: 0,
  lastFiveOrders: [],
  usersBalanceMonthly: 0
};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {}
});

export const {} = dashboard.actions;
export default dashboard.reducer;
