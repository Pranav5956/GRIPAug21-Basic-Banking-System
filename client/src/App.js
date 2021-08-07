import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, useLocation } from "react-router-dom";

import AccountHistory from "./pages/AccountHistory";
import Accounts from "./pages/Accounts";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SlideRoutes from "react-slide-routes";
import Transfer from "./pages/Transfer";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <SlideRoutes location={location} duration={400} timing="ease-in-out">
        <Route path="/" component={Home} exact />
        <Route path="/accounts" exact component={Accounts} />
        <Route path="/transfer/:accountId?" component={Transfer} />
        <Route path="/accounts/:accountId" exact component={AccountHistory} />
      </SlideRoutes>
    </div>
  );
}

export default App;
