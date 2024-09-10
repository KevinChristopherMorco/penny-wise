import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Account from "./components/pages/Account";
import Expense from "./components/pages/Expense";

import MobileNavigation from "./components/partials/MobileNavigation";
import NavigationProvider from "./hooks/general/navigation/useActiveNavigation";
import StorageProvider from "./hooks/storage/useStorage";

function App() {
  return (
    <StorageProvider>
      <NavigationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/manage-income" element={<Account />}></Route>
            <Route path="/manage-expense" element={<Expense />}></Route>
          </Routes>
          <MobileNavigation />
        </BrowserRouter>
      </NavigationProvider>
    </StorageProvider>
  );
}

export default App;
