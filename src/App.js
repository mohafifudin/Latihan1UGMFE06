import './App.css';

import React from "react";

import axios from "axios";

class App extends React.Component {
  state = {
    listMeals: [],
    isLoading: true,
    errors: null
  };

  getUsers() {
  // We're using axios instead of Fetch
  axios
    // The API we're requesting data from
    .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
    // Once we get a response, we'll map the API endpoints to our props
    .then(response =>
      response.data.meals.map(meal => ({
        name: `${meal.strMeal}`,
        image: `${meal.strMealThumb}`
      }))
    )
    // Let's make sure to change the loading state to display the data
    .then(listMeals => {
      this.setState({
        listMeals,
        isLoading: false
      });
    })
    // We can still use the `.catch()` method since axios is promise-based
    .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { isLoading, listMeals } = this.state;
    return (
      <React.Fragment>
        <h2>Random User</h2>
        <div>
          {!isLoading ? (
            listMeals.map(meal => {
              const {name, image } = meal;
              return (
                <div>
                  <p>{name}</p>
                  <div>
                    <img src={image} alt={name} width="50px" height="50px" />
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
