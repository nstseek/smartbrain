import React from 'react';

class SignIn extends React.Component{

    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    onSignIn = () => {
        fetch("https://secret-beach-89404.herokuapp.com/signin", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.message === 'logged in'){
                this.props.setID(res.id);
                this.props.signInFunc();
            }
            else {
                alert("user could not log in");
            }
        });
    }

    render(){
        return (
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <div className="pa4 black-80">
                        {/* <fieldset id="sign_up" className="ba b--transparent ph0 mh0"> */}
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        {/* </fieldset> */}
                        <div className="">
                        <input onClick={this.onSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p style={ {cursor: 'pointer'} } onClick={this.props.registerClick} className="f6 link dim black db">Register</p>
                        </div>
                    </div>
                </article>
            </div>
        );
    }

}

export default SignIn;