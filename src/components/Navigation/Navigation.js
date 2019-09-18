import React from 'react';

class Navigation extends React.Component{
    
    render(){
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={this.props.signOutFunc} className='f3 link dim black underline pa3 pointer'>{this.props.value}</p>
            </nav>
        );
    }

}

export default Navigation;