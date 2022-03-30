import React from 'react' 
import { useNavigate, Route} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ component: Component, ...rest}) {
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth()

  return (
  <Route
   {...rest}
    render={(props) => {
      if (isLoggedIn) {
        return <Component {...props} />;
      } else {
         navigate('/signin')

         return <p>heeheheh</p>
      }
    }
  } 
    />
    )
}

