import React from 'react';
import styled from 'styled-components';
import {useHistory} from "react-router";
import {PAGES} from "../routes";
import {loginAdminRequest} from "../http/auth/login-admin.request";

const AuthPageWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1E1E1E;
`;

const InputForm = styled.input`
  width: 317px;
  height: 31px;

  background: rgba(0, 0, 0, 0.62);
  box-shadow: 0 4px 36px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(49px);

  border: none;
  border-radius: 10px;

  padding-left: 10px;
  padding-right: 10px;

  margin: 10px;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 13px;

  color: #FFFFFF;

  :focus {
    outline: none
  }
;
`;

const InputLabel = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-size: 22px;
  font-weight: 300;
  color: #FFFFFF;
`;

const ErrorMessage = styled.div`
  color: red;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
`;

export interface IAuthProps {

}

export const Auth: React.FC<IAuthProps> = () => {
    const history = useHistory();
    const [token, setToken] = React.useState('');
    const [loginFailed, setLoginFailed] = React.useState(false);
    const [apiEndpoint, setApiEndpoint] = React.useState(localStorage["api_endpoint"]);
    const tokenInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <AuthPageWrapper>
            {/*<InputLabel style={{marginTop: -70}}>Login</InputLabel>*/}
            <InputLabel>Login</InputLabel>
            <InputForm
                value={apiEndpoint}
                placeholder="Enter API endpoint"
                type="text"
                onChange={(e) => {
                    setApiEndpoint(e.target.value);
                    setLoginFailed(false);
                }}
                onKeyPress={e => {
                    if (e.key === "Enter") {
                        tokenInputRef.current?.focus();
                    }
                }}
            />
            <InputForm
                value={token}
                placeholder="Enter your token"
                type="text"
                onChange={(e) => {
                    setToken(e.target.value);
                    setLoginFailed(false);
                }}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        localStorage["api_endpoint"] = apiEndpoint;
                        loginAdminRequest({key: token})
                            .then((response) => {
                                localStorage.auth_token = response.token
                                history.push(PAGES.home);
                            })
                            .catch(() => setLoginFailed(true));
                    }
                }}
                ref={tokenInputRef}
            />
            {loginFailed ? (<ErrorMessage>Authorization failed.</ErrorMessage>) : null}
        </AuthPageWrapper>
    );
};

export default Auth;
