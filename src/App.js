import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import SignIn from './components/SignIn/SignIn.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Register from './components/Register/Register.js';

const app = new Clarifai.App({
  apiKey: "c0d51ed6fc0647028a1e841d485a8ca9"
});

const particlesParam = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: false,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse'
      },
      onclick: {
        enable: false,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: 'https://cdn.lifehack.org/wp-content/uploads/2015/01/alpha-woman-1024x768.jpeg',
      imageURL: 'https://cdn.lifehack.org/wp-content/uploads/2015/01/alpha-woman-1024x768.jpeg',
      box: {},
      route: 'signin',
      id: '',
      entries: ''
    };
  }

  calculateFaceLocation = (coordinates) => {
    const img = document.getElementById("inputImg");
    const imgSize = [Number(img.width), Number(img.height)];
    
    return {
      left: coordinates.left_col * imgSize[0],
      top: coordinates.top_row * imgSize[1],
      right: imgSize[0] - (coordinates.right_col * imgSize[0]),
      bottom: imgSize[1] - (coordinates.bottom_row * imgSize[1])
    }
  }

  displayFaceBox = (boxcoord) => {
    this.setState( {box: boxcoord} );
  }

  onInputChange = (event) => {
    this.setState( {input: event.target.value} );
  }

  onDetectClick = () => {
    fetch("https://secret-beach-89404.herokuapp.com/image", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    }).then( res => {
      fetch(`https://secret-beach-89404.herokuapp.com/profile/${this.state.id}`)
        .then(res => res.json())
        .then(res => this.setState({entries: res}));
    });
    this.setState( {imageURL: this.state.input} );
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      (response) => {
        this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions[0].region_info.bounding_box));
      },
      function(err) {
        console.log(err);
      }
    );
  }

  onSignInApp = () => {
    this.setState( {route: 'home'} );
    fetch(`https://secret-beach-89404.herokuapp.com/profile/${this.state.id}`)
      .then(res => res.json())
      .then(res => this.setState({entries: res}));
  }

  onSignOut = () => {
    this.setState( {route: 'signin'} );
  }

  onRegisterClick = () => {
    this.setState( {route: 'register' } );
  }

  setID = (id) => {
    this.setState({
      id: id
    });
  }

  render() {
    const fillBody = () => {
      if (this.state.route === 'signin'){
        return (
          <div>
            <Navigation value={""} registerFunc={this.onRegisterClick} signOutFunc={this.onSignOut}/>
            <Logo/>
            <SignIn setID={this.setID} registerClick={this.onRegisterClick} signInFunc={this.onSignInApp}/>
          </div>          
        );
      }
      else if (this.state.route === 'home'){
        return (
          <div>
              <Navigation value={"Sign out"} registerFunc={this.onRegisterClick} signOutFunc={this.onSignOut}/>
              <Logo/>
              <Rank entries={this.state.entries}/>
              <ImageLinkForm changeFunc={this.onInputChange} clickFunc={this.onDetectClick}/>
              <FaceRecognition boxCoord={this.state.box} imgURL={this.state.imageURL}/>
            </div>
        );
      }
      else if(this.state.route === 'register'){
        return (
          <div>
            <Navigation value={""} registerFunc={this.onRegisterClick} signOutFunc={this.onSignOut}/>
            <Logo/>
            <Register home={this.onSignOut}/>
          </div>          
        );
      }
    }
    const body = fillBody();
    return (
      <div className="App">
        
        <Particles className="particles" params={particlesParam} />

        {body}       
      </div>
    );
  }
}

export default App;
