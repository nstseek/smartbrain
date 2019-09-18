import React from 'react'
import './FaceRecognition.css';

class FaceRecognition extends React.Component{

    render(){
        return (
            <div className="center">
                <div className='absolute shadow-2 mt2'>
                    <img id="inputImg" alt='imageURL' src={this.props.imgURL} width='500px' height='auto'/>
                    <div style={this.props.boxCoord} className="bounding-box"></div>
                </div>  

            </div>
        );
    }

}

export default FaceRecognition;