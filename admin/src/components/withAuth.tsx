import React from 'react';
import {checkAdminRequest} from "../http/auth/check-admin.request";
import Auth from "../pages/Auth";


const withAuth = (WrappedComponent: React.FunctionComponent | React.ComponentClass) => {
    return class extends React.Component<any, any> {
        constructor(props: any) {
            super(props);
            this.state = {
                isValidating: true,
                success: false
            }
        }

        componentDidMount() {
            checkAdminRequest().then(data => this.setState({isValidating: false, ...data}));
        }

        render() {
            if (this.state.isValidating) {
                return <>Loading...</>;
            }
            else {
                return this.state.success ? <WrappedComponent {...this.props}/> :
                    this.state.statusCode === 401 ? <Auth/> : <></>;
            }
        }
    }
};

export default withAuth;
