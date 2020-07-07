import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/index";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import ChatBox from "./components/ChatBox";
import { base } from "./helpers/Utils";
import * as config from "./appsetting.json";
import { SimpleChatProvider, SimpleChatContext } from "./context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./helpers/Extensions";

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
        <ChatBox></ChatBox>
      ) : (
        <Switch>
          <Route exact path={["/", "/login"]}>
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      )}
    </React.Fragment>
  );
}

export default App;
