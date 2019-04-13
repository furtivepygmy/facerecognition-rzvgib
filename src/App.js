import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
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
    input: ''
  };

  onInputChange = event => {
    console.log(event.target.value);
  };

  onSubmit = () => {
    app.models
      .predict(
        'a403429f2ddf4b49b307e318f00e528b',
        'https://samples.clarifai.com/face-det.jpg'
      )
      .then(
        response => {
          console.log(response);
        },
        err => {
          console.log(err);
        }
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={options} />
        <Navigation />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onSubmit}
        />
        <FaceRecognition imageURL={this.state.input} />
      </div>
    );
  }
}

export default App;
