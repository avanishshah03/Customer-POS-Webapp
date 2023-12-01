import React, { useContext } from 'react';
import './LandingPage.css';
import { AuthContext } from './Auth';
import { Button } from '@mui/material';
import { Link } from 'wouter';


console.log(import.meta.env.VITE_REACT_APP_API_KEY);

const LandingPage: React.FC = () => {
    const customButtonStyle = {
        color: 'white',
    };
    const { role } = useContext(AuthContext);
    const logout = () => {
        localStorage.clear();
        document.location.reload();

    }

    return (
        <div className="landing-page background-image">
            <div id="google_translate_element" ></div>
            <div className="content">

                <div style={{ gridColumn: 2, gridRow: 1 }}>
                    <h1>MESS WAFFLES</h1>
                    <h3>`Fall` in love with our Waffles.</h3>
                </div>
                <iframe
                    // width="450"
                    // height="250"
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_REACT_APP_API_KEY}&q=Mess+Waffles,College+Station,TX`}
                    allowFullScreen
                    style={{ filter: 'brightness(0.8)', gridColumn: 1, gridRow: 2, width: "100%", height: "100%", borderRadius: '10px', margin: "1em" }}
                ></iframe>
                <div style={{ gridColumn: 2, gridRow: 2 }}>
                    <Link to="/customer">
                        <Button style={customButtonStyle} id="order-here" className="button-hover-effect">
                            Order Here
                        </Button>
                    </Link>
                </div>

                <div style={{ gridColumn: 3, gridRow: 3, alignSelf: "center" }}>
                    {role !== "" ?
                        (
                            <Button style={customButtonStyle} className="button-hover-effect">
                                <Link to="/server">
                                    Server page
                                </Link>
                            </Button>
                        )
                        : (<div></div>)
                    }
                    {role === '' ?
                        (
                            <Link to="/login" >
                                <Button style={customButtonStyle} className="button-hover-effect">
                                    Login
                                </Button>
                            </Link>
                        )
                        : (
                            <Button style={customButtonStyle} className="button-hover-effect" onClickCapture={logout}>
                                <Link to="/">
                                    Logout
                                </Link>
                            </Button>
                        )
                    }
                </div>

            </div>
           
        </div >

        
    );
};

export default LandingPage;