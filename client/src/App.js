import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
import SignIn from './components/sign-in/SignIn';
import Register from './components/register/Register';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import FaceRecognition from './components/face-recognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: '945947772cfd484a8b0bb5ea0aed8dfe'
});

const options = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 500
      }
    },
    color: {
      value: '#ffffff'
    },
    line_linked: {
      enable: true,
      color: '#ffffff'
    }
  }
};

class App extends Component {
  state = {
    input: '',
    imageURL: '',
    box: {},
    route: 'signin',
    isAuthenticated: false
  };

  calculateFaceLocation = response => {
    const clarifaiFace =
      response.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({ box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    this.setState({ route });
  };

  onAuthChange = () => {
    this.setState({ isAuthenticated: !this.state.isAuthenticated });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={options} />
        <Navigation
          isAuthenticated={this.state.isAuthenticated}
          onAuthChange={this.onAuthChange}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === 'home' ? (
          <div>
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
            />
          </div>
        ) : this.state.route === 'signin' ? (
          <SignIn
            onAuthChange={this.onAuthChange}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Register
            onAuthChange={this.onAuthChange}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
