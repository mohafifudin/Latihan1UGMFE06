import './App.css';

import React from "react";

import axios from "axios";

class App extends React.Component {
  state = {
    listCategory: [],
    isLoading: true,
    errors: null
  };

  getCategories() {
  // We're using axios instead of Fetch
  axios
    // The API we're requesting data from
    .get("https://www.themealdb.com/api/json/v1/1/categories.php")
    // Once we get a response, we'll map the API endpoints to our props
    .then(response =>
      response.data.categories.map(meal => ({
        id: `${meal.idCategory}`,
        name: `${meal.strCategory}`,
        image: `${meal.strCategoryThumb}`,
        desc: `${meal.strCategoryDescription}`
      }))
    )
    // Let's make sure to change the loading state to display the data
    .then(listCategory => {
      this.setState({
        listCategory,
        isLoading: false
      });
    })
    // We can still use the `.catch()` method since axios is promise-based
    .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const { isLoading, listCategory } = this.state;
    return (
      <React.Fragment>
        <h2>All Food Categories</h2>
        <div>
          {!isLoading ? (
            listCategory.map(meal => {
              const {id, name, image, desc} = meal;
              return (
                <div key={id}>
                  <p>{name}</p>
                  <div>
                    <img src={image} alt={name} width="50px" height="50px" />
                    <p>{desc}</p>
                    <button>Liat Menu</button>
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
