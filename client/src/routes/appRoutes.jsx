import DashboardPage from '../pages/DashboardPage';
import ExpensesPage from '../pages/ExpensesPage';

const appRoutes = [
  { path: '/', element: <DashboardPage />, label: 'Dashboard' },
  { path: '/expenses', element: <ExpensesPage />, label: 'Expenses' },
];

export default appRoutes;
