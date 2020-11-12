import React from 'react';
import "./App.css"
import Display from './display';
import Movie from './movie'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  state = {
    visibility: undefined
  };
toggleVisibility(props) {
if (props === 1){
  this.setState({
    visibility: 1
  });
}
else if (props === 2){
  this.setState({
    visibility: 2
  });
} else {
    this.setState({
      visibility: 0
  })
}
console.log(props)
console.log(this.state.visibility)
}
render() {
  if (this.state.visibility === 1) {
    return (
      <div>
          <Display toggleVisibility={this.toggleVisibility}/>
      </div>
    )
  }
  if (this.state.visibility === 2) {
      return (
        <div>
          <Movie toggleVisibility={this.toggleVisibility}/>
        </div>
      ) } else {
      return (
        <div>
          <button className="button" onClick={(e) => this.toggleVisibility(1)}>Méteo</button>
          <button className="button"onClick={(e) => this.toggleVisibility(2)}>Cinéma</button>
        </div>
      )
    };
  };
}


export default App;
