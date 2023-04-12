import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ChangePasswordScreen from "./screens/ChangePasswordScreen/ChangePasswordScreen";
import HomePageScreen from "./screens/HomePageScreen/HomePageScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ShipmentManagementScreen from "./screens/ShipmentManagementScreen/ShipmentManagementScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/shipment-management">
          <ShipmentManagementScreen />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/register">
          <RegisterScreen />
        </Route>
        <Route path="/change-password">
          <ChangePasswordScreen />
        </Route>

        <Route path="/">
          <HomePageScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
