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
            return <div id='login-container'>
                <Link to="/login">
                    <Button style={customButtonStyle} className="button-hover-effect">
                        Login
                    </Button>
                </Link>
            </div>
        }
        return <div></div>
    }

    const logout = () => {
        localStorage.clear();
        document.location.reload();

    }

    return (
        <div className="landing-page background-image">
            <div id="google_translate_element" ></div>
            <div className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>

                <iframe
                    width="450"
                    height="250"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDcZD_C1oXCSy1uDSqquetSFBqgcv7d0SQ&q=Mess+Waffles,College+Station,TX"
                    allowFullScreen
                    style={mapStyles}
                ></iframe>
                <h1>MESS WAFFLES</h1>
                <div id='order-here-comp'>
                    <Link to="/customer">
                        <Button style={customButtonStyle} id="order-here" className="button-hover-effect">
                            Order Here
                        </Button>
                    </Link>
                </div>

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
                    (<EmployeeLogin />)
                    : (
                        <Button style={customButtonStyle} className="button-hover-effect" onClickCapture={logout}>
                            <Link to="/">
                                Logout
                            </Link>
                        </Button>
                    )
                }

            </div>
            <script src="script.js"></script>
      <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement(
                {pageLanguage: 'en'},
                'google_translate_element'
            );
        } 
  </script>
  <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        </div>

        
    );
};

export default LandingPage;