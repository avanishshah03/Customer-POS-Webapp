import React, { useContext } from 'react';
import './LandingPage.css';
import { AuthContext } from './Auth';
import { Button } from '@mui/material';
import { Link} from 'wouter';


const LandingPage: React.FC = () => {
    const customButtonStyle = {
        color: 'white',
    };

    const { role } = useContext(AuthContext);
    const EmployeeLogin = () => {
        
        if (role === '') 
        {
            return  <Link to="/login">
                        <div id='login-container'>
                            <Button style={customButtonStyle} className="button-hover-effect">
                                Login
                            </Button>
                        </div>
                        
                    </Link>
        }
        return <div></div>
    }

    const logout = () =>{
        localStorage.clear();
        document.location.reload();

    }
    
    return (
        <div className="landing-page background-image">
            <div className="content">
                <h1>MESS WAFFLES</h1>
                <Link to="/customer">
                    <div id='order-here-comp'>
                        <Button style={customButtonStyle} id="order-here" className="button-hover-effect">
                            Order Here
                        </Button>
                    </div>
                </Link>

                {role === "ROLE_manager" ?
                (
                    <div>
                        <Link to="/managerItems">
                        <Button style={customButtonStyle} className="button-hover-effect">
                            manager temp
                        </Button>

                        </Link><Link to="/managerIngredients">
                            <Button style={customButtonStyle} className="button-hover-effect">
                                manager ingredients
                            </Button>
                        </Link>
                        <Link to="/server">
                        <Button style={customButtonStyle} className="button-hover-effect">
                            Server page
                        </Button>
                    </Link>
                    </div>
                    
                )
                :
                (
                    <div></div>
                )
                }
                { role === 'ROLE_server' ?
                (
                    <Link to="/server">
                        <Button style={customButtonStyle} className="button-hover-effect">
                            Server page
                        </Button>
                    </Link>
                )
                :
                (
                    <div></div>
                )
                }

                {role === '' ? 
                (
                    <EmployeeLogin />

                )
                :
                (
                    <Link to="/">
                        <Button style={customButtonStyle} className="button-hover-effect" onClickCapture={logout}>
                            Logout 
                        </Button>
                    </Link>
                )
                }

            </div>
        </div>
    );
};

export default LandingPage;










