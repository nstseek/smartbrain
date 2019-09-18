import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

class Logo extends React.Component{

    render(){
        return (
            <div className='ma4 mt0'>
                <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 60, width: 60 }} >
                    <div className="Tilt-inner">
                        <img src={brain} alt='logo' style={{height: '50px', width: '50px', paddingTop: '5px'}}></img>
                    </div>
                </Tilt>
            </div>
        );
    }

}

export default Logo;