import React, { Component } from 'react';
import ReactCustomCrop from './components/ReactCustomCrop/react-custom-crop';
import './App.scss';

class App extends Component {

  state = {
    crop: {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    },
  }

  onChange = (crop) => {
    this.setState({crop});
  }

  render() {
    return (
      <div className='background-div'>
        <ReactCustomCrop
          src='http://fullcircletreeandshrub.com/wp-content/uploads/2015/12/tumblr_static_winter_tree_by_epickittyness-d3dpj76.jpg'
          crop={this.state.crop}
          onChange={this.onChange}
          minWidth={5}
          minHeight={5}
        />
      </div>
    );
  }
}

export default App;
