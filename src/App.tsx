import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import Login from "./views/Login";
import EmployeeView from "./views/EmployeeView";
import HrView from "./views/HrView";
import { authStore } from "./Store/authStore";
import {  QueryClient, QueryClientProvider} from 'react-query';

function App() {
  const isAuth = authStore((state) => state.isAuth);
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/Dashboard" element={<PrivateLayout isAllowed={isAuth} />}>
          <Route index element={<EmployeeView />} />
        </Route>
        <Route path="/Dash" element={<PrivateLayout isAllowed={isAuth} />}>
        <Route index element={<HrView />} />
        </Route>

       
      </Routes> 
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
