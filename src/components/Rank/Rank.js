import React from 'react';

class Rank extends React.Component{

    render(){
        return (
            <div>
                <div className="white f3">
                    {'Your total entries are ...'}
                </div>
                <div className="white f1">
                    {`#${this.props.entries}`}
                </div>
            </div>
        );
    }

}

export default Rank;