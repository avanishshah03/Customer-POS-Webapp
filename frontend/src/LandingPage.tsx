import React, { useContext } from 'react';
import './LandingPage.css';
import { AuthContext } from './Auth';
import { Button } from '@mui/material';
import { Link } from 'wouter';


const LandingPage: React.FC = () => {
    const customButtonStyle = {
        color: 'white',
    };

    const { role } = useContext(AuthContext);
    const EmployeeLogin = () => {

        if (role === '') {
            return <Link to="/login">
                <Button style={customButtonStyle} className="button-hover-effect">
                    Login
                </Button>
            </Link>
        }
        return <div></div>
    }

    const logout = () => {
        localStorage.clear();
        document.location.reload();

    }

    return (
        <div className="landing-page background-image">
            <div className="content">
                <h1>MESS WAFFLES</h1>
                <Link to="/customer">
                    <a>
                        <Button style={customButtonStyle} className="button-hover-effect">
                            Order Here
                        </Button>
                    </a>
                </Link>

                {role !== "" ?
                    (
                        <Link to="/server">
                            <Button style={customButtonStyle} className="button-hover-effect">
                                Server page
                            </Button>
                        </Link>
                    )
                    : (<div></div>)
                }
                {role === '' ?
                    (<EmployeeLogin />)
                    : (
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










