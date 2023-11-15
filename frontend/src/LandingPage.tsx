import React from 'react';
import './LandingPage.css';
import { Button } from '@mui/material';
import { Link, Route } from 'wouter';

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
                <Link to="/managerItems">
                    <Button style={customButtonStyle}>
                        manager temp
                    </Button>
                </Link>
                <Link to="/managerIngredients">
                    <Button style={customButtonStyle}>
                        manager ingredients
                    </Button>
                </Link>
                <Link to="/server">
                    <Button style={customButtonStyle}>
                        Server page
                    </Button>
                </Link>

            </div>
        </div>
    );
};

export default LandingPage;










