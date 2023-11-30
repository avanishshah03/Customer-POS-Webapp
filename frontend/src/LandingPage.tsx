import React, { useContext } from 'react';
import './LandingPage.css';
import { AuthContext } from './Auth';
import { Button } from '@mui/material';
import { Link } from 'wouter';


const LandingPage: React.FC = () => {
    const customButtonStyle = {
        color: 'white',
    };
    const mapStyles = {
        border: 'none',
        filter: 'brightness(0.7)',
    };

    const { role } = useContext(AuthContext);
    const EmployeeLogin = () => {

        if (role === '') {
            return <Link to="/login">
                <div id='login-container'>
                    <Button style={customButtonStyle} className="button-hover-effect">
                        Login
                    </Button>
                </div>

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
            <div className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>

                <iframe
                    width="450"
                    height="250"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDcZD_C1oXCSy1uDSqquetSFBqgcv7d0SQ&q=Mess+Waffles,College+Station,TX"
                    allowFullScreen
                    style={mapStyles}
                ></iframe>
                <h1>MESS WAFFLES</h1>
                <Link to="/customer">
                    <div id='order-here-comp'>
                        <Button style={customButtonStyle} id="order-here" className="button-hover-effect">
                            Order Here
                        </Button>
                    </div>
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