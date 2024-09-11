import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Account from "./components/pages/Account";
import Expense from "./components/pages/Expense";

import MobileNavigation from "./components/partials/MobileNavigation";
import NavigationProvider from "./hooks/general/navigation/useActiveNavigation";
import StorageProvider from "./hooks/storage/useStorage";
import ExpenseSummary from "./components/expense/ExpenseSummary";

function App() {
  return (
    <StorageProvider>
      <NavigationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/manage-account" element={<Account />}></Route>
            <Route
              path="/manage-account/:accountId"
              element={<ExpenseSummary />}
            ></Route>
            <Route path="/manage-expense" element={<Expense />}></Route>
            <Route path="*" element={<Home />} />
          </Routes>
          <MobileNavigation />
        </BrowserRouter>
      </NavigationProvider>
    </StorageProvider>
  );
}

export default App;
