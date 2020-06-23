import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/index";
import ForgotPassword from "./components/ForgotPassword";
import { base } from "./helpers/ultils";
import * as config from "./appsetting.json";
import { SimpleChatProvider, SimpleChatContext } from "./context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./helpers/extensions";

function App() {
  return (
    <BrowserRouter>
      <SimpleChatProvider>
        <AuthenticateToRedirect></AuthenticateToRedirect>
      </SimpleChatProvider>
    </BrowserRouter>
  );
}

function AuthenticateToRedirect() {
  const { state, dispatch } = React.useContext(SimpleChatContext);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (isReady === false) {
      const credential = base.getCookie(config.cookie.credential);

      const info = base.getCookie(config.cookie.userInfo);

      if (credential) {
        const userInfo = JSON.parse(unescape(atob(info)));

        if (userInfo) {
          dispatch({
            type: "signedIn",
            payload: {
              displayName: userInfo.name,
            },
          });
        }
      } else {
      }

      setIsReady(true);
    }
  }, []);
  return (
    <React.Fragment>
      {state.hasLogged === true ? (
        <div>123</div>
      ) : (
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          {/* <Route path="/register">
          <Home />
        </Route> */}
        </Switch>
      )}
    </React.Fragment>
  );
}

export default App;
