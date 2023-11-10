import React from 'react';
import './LandingPage.css';
import { Button } from '@mui/material';
import { Link, Route } from 'wouter';
import App from './Customer';
import SignIn from "./LoginPage";
import { ManagerItems } from "./components/ManagerItems";

const LandingPage: React.FC = () => {
    const customButtonStyle = {
        color: 'white',
    };

    return (

        <div className="landing-page background-image">
            <div className="content">
                <h1>MESS WAFFLES</h1>
                <Link to="/customer">
                    <Button style={customButtonStyle}>
                        Order Here
                    </Button>
                </Link>
                <Link to="/login">
                    <Button style={customButtonStyle}>
                        Employee Login
                    </Button>
                </Link>
                <Link to="/manager">
                    <Button style={customButtonStyle}>
                        manager temp
                    </Button>
                </Link>

            </div>
        </div>
    );
};

export default LandingPage;










