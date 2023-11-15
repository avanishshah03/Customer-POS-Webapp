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
                    <a>
                        <Button style={customButtonStyle} className="button-hover-effect">
                            Order Here
                        </Button>
                    </a>

                </Link>
                <Link to="/login">
                    <Button style={customButtonStyle} className="button-hover-effect">
                        Employee Login
                    </Button>
                </Link>
                <Link to="/managerItems">
                    <Button style={customButtonStyle} className="button-hover-effect">
                        manager temp
                    </Button>
                </Link>
                <Link to="/managerIngredients">
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
        </div>
    );
};

export default LandingPage;










