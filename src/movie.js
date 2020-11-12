import React, { Component } from 'react';
import Draggable from 'react-draggable'
import './App.css';
import axios from 'axios';

const key = "745ed04060bd0e8ad6d8d4ed996ef976"
class Movie extends Component {
  constructor(props) {
    super(props)
    this.getMovies = this.getMovies.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClick2 = this.handleOnClick2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.getTopMovies = this.getTopMovies.bind(this);
    this.display = this.display.bind(this);
    this.state = {
      year: '',
      region: '',
      array: [],
      title_true: [],
      description_true: [],
      release_date_true: [],
      movies: [],
      MovieLoad: false,
      TopMovies: false,
    };
  }

  getMovies() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&year=${this.state.year}`)
      .then((response) => {
        let title_true = [];
        let description_true = [];
        let release_date_true = [];
        let i = 0;
        while (i < 3) {
        title_true.push({"title" : response.data.results[i].title})
        description_true.push({"overview" : response.data.results[i].overview})
        release_date_true.push({"release_date" : response.data.results[i].release_date})
        this.setState({title_true : title_true, description_true : description_true, release_date_true : release_date_true})
        i++
      }
      this.setState({MovieLoad : true})
      })
      .catch((error) => {
        console.log(error);
      });

  }


  getTopMovies() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&region=${this.state.region}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then((response) => {
        let movies = [];
        let i = 0;
        while (i < 3) {
          movies.push({"original_title" : response.data.results[i].original_title})
          this.setState({movies : movies})
          i++
        }
        console.log(this.state.movies[1].original_title)
        this.setState({TopMovies : true})
      })
      .catch(function (error){
        console.log(error);
      })
  }

handleChange(event){
this.setState({
  year: event.target.value,
  });
}

handleChange2(event){
  this.setState({
    region: event.target.value,
    });
  }

handleOnClick(event) {
  event.preventDefault();
  this.setState({MovieLoad : false})
  this.getMovies();
}

handleOnClick2(event) {
  event.preventDefault();
  this.setState({TopMovies : false})
  this.getTopMovies();
}

display() {
return (
  <div>
    <p>{this.state.title_true[0].title}</p>
    <p>{this.state.description_true[0].overview}</p>
    <p>{this.state.release_date_true[0].release_date}</p>
    <p>{this.state.title_true[1].title}</p>
    <p>{this.state.description_true[1].overview}</p>
    <p>{this.state.release_date_true[1].release_date}</p>
    <p>{this.state.title_true[2].title}</p>
    <p>{this.state.description_true[2].overview}</p>
    <p>{this.state.release_date_true[2].release_date}</p>
  </div>
)
}

  render() {
    return (
      <div>

      <Draggable>
        <div className="container">
            <div className="split">
              <form onSubmit={this.handleOnClick}>
                <input type='text' placeholder="ex: 1994,2000,2020..."
                value={this.state.year} onChange={this.handleChange}/>
                <button>Set year</button>
              </form>
            {this.state.MovieLoad === true ?
            this.display() : <p></p> }
          </div>
        </div>
      </Draggable>

    <Draggable>
       <div className="container">
          <div className="split">
            <form onSubmit={this.handleOnClick2}>
              <input type='text' placeholder="ex: US,FR,JP..."
              value={this.state.region} onChange={this.handleChange2}/>
              <button>Set region</button>
            </form>
          {this.state.TopMovies === true ?
          <div>
            <p>{this.state.movies[0].original_title}</p>
            <p>{this.state.movies[1].original_title}</p>
            <p>{this.state.movies[2].original_title}</p>
          </div>
            : <p></p>}
        </div>
      </div>
    </Draggable>
    <button onClick={this.props.toggleVisibility}> fermer </button>

    </div>
    );
  }
}


export default Movie;
