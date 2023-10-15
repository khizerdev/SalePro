import { useRoutes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "routes/routes";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "components/layouts/auth-layout";
import GuestLayout from "components/layouts/guest-layout";
import Login from "pages/Login";
import Dashboard from "pages/admin/Dashboard";
import Users from "pages/admin/Users/Users";

const App = () => {
  //   const isLoggedIn = false;

  //   const routing = useRoutes(routes(isLoggedIn));

  //   return <>{routing}</>;

  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/dashboard" element={<AuthLayout />}>
        <Route path="users" element={<Users />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
