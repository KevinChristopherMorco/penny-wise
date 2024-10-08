import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Account from "./components/pages/Account";
import Expense from "./components/pages/Expense";

import MobileNavigation from "./components/partials/MobileNavigation";
import NavigationProvider from "./hooks/general/navigation/useActiveNavigation";
import StorageProvider from "./hooks/storage/useStorage";
import ExpenseSummary from "./components/expense/ExpenseSummary";
import ExpenseProvider from "./hooks/user-actions/expense/useManageExpense";
import ClientError from "./alerts/status/ClientError";
import Transaction from "./components/pages/Transaction";
import TransactionCardView from "./components/transaction/TransactionCardView";
import Budget from "./components/pages/Budget";
import ThemeProvider from "./hooks/general/theme/useTheme";
import Analysis from "./components/pages/Analysis";
import Settings from "./components/pages/Settings";

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <StorageProvider>
          <ExpenseProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/manage-account" element={<Account />}></Route>
                <Route
                  path="/manage-account/:accountId"
                  element={<ExpenseSummary />}
                ></Route>
                <Route path="/manage-expense" element={<Expense />}></Route>
                <Route path="/transactions" element={<Transaction />}></Route>
                <Route path="/manage-budget-plan" element={<Budget />}></Route>
                <Route path="/analysis" element={<Analysis />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route
                  path="/transactions/:transactionId"
                  element={<TransactionCardView />}
                ></Route>
                <Route path="*" element={<ClientError />} />
              </Routes>
              <MobileNavigation />
            </BrowserRouter>
          </ExpenseProvider>
        </StorageProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
