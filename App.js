import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = "2acd65189feef3d774ca342f47eb6c1e";

class App extends Component {
  state = {
    recipes: []

  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);
    const data = await api_call.json();
    this.setState({ recipes: data.recipes});
    console.log(this.state.recipes)
  }
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Phantom_Open_Emoji_1f355.svg/1024px-Phantom_Open_Emoji_1f355.svg.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Table Tonight</h1>
        </header>
          <Form getRecipe={this.getRecipe} />
         <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
