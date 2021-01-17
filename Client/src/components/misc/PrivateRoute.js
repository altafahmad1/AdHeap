import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./../../context/UserContext";

const PrivateRoute = ({ component: Comp, path, ...rest }) => {
  const { userData } = useContext(UserContext);
  return (
    <Route path={path} {...rest} 
    render={props => {  
       return userData.isLoggedIn ? (<Comp {...props} />) : (userData.isLoading ? 'Loading...' : <Redirect to="/SignUp_In" />)
      }}
    />
  );
};

export default PrivateRoute;