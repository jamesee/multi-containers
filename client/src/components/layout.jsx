import { NavBar } from './navbar';
import { useAuth } from "../domains/auth";
import { Redirect} from 'react-router-dom';

export const Layout = (props) => {

  const auth = useAuth();

  return (

    <div>
      { auth.status === "authenticated"? <NavBar /> : <Redirect to = "/" />}
      <main >{props.children}</main>
    </div>
  );
}

