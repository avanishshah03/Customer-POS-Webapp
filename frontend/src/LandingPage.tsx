import React from 'react';
import './LandingPage.css'; // You will need to create a CSS file for styling
import { Button } from '@mui/material';
import { Link, Route } from 'wouter'; // Remove Route and import Link
import App from './App';
import SignIn from "./LoginPage";

const LandingPage: React.FC = () => {
    const customButtonStyle = {
        color: 'white', // Text color
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

            </div>
        </div>
    );
};

export default LandingPage;













// import React, { useState } from 'react';
// import './LandingPage.css'; // Include the CSS file here
// import { Button } from '@mui/material';

// const images = ['jodie-morgan-v4IwVaaxoFo-unsplash.jpg', 'yuvraj-sachdeva-QeYUVrBOnvM-unsplash.jpg']; // Add your image URLs here

// const LandingPage: React.FC = () => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const customButtonStyle = {
//         color: 'white', // Text color
//     };

//     const changeBackgroundImage = () => {
//         // Change the background image every 5 seconds
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     // Use setInterval to call changeBackgroundImage every 5 seconds
//     setInterval(changeBackgroundImage, 5000);

//     const backgroundImageStyle = {
//         backgroundImage: `url(${images[currentImageIndex]})`,
//     };

//     return (
//         <div className="landing-page" style={backgroundImageStyle}>
//             <div className="content">
//                 <h1>MESS WAFFLES</h1>
//                 <Button style={customButtonStyle}>Order Here</Button>
//                 <Button style={customButtonStyle}>Employee Login</Button>
//             </div>
//         </div>
//     );
// };

// export default LandingPage;

