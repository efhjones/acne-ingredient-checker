import React, { useState } from "react";
import "./App.css";
import acneIngredients from "./AcneIngredientList";
const splitByCommas = text => {
  return text.split(",");
};

const checkAcneIngredients = productIngredients => {
  const ingredientsToCheck = acneIngredients;
  const acneicIngredients = productIngredients.filter(productIngredient => {
    const isFoundInList =
      ingredientsToCheck.filter(acneIngredient => {
        const lowercaseProductIngredient = productIngredient.toLowerCase();
        const lowercaseAcneIngredient = acneIngredient.toLowerCase();
        const isFound = lowercaseAcneIngredient.includes(
          lowercaseProductIngredient
        );
        const isFoundReverse = lowercaseProductIngredient.includes(
          lowercaseAcneIngredient
        );
        return isFound || isFoundReverse;
      }).length > 0;
    return isFoundInList;
  });
  return acneicIngredients;
};

const App = () => {
  const [ingredientsFound, setIngredientsFound] = useState([]);
  const onSubmit = e => {
    e.preventDefault();
    setIngredientsFound([]);
    const text = e.currentTarget[0].value;
    const list = splitByCommas(text);
    const acneicIngredients = checkAcneIngredients(list);
    const ingredientsFound =
      acneicIngredients.length > 0 ? acneicIngredients : ["Non found!"];
    setIngredientsFound(ingredientsFound);
  };
  return (
    <div className="App">
      <header className="">Does This Have That</header>
      <form onSubmit={onSubmit}>
        <textarea
          className="ingredient-input"
          type="text"
          placeholder="Enter ingredients here"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {ingredientsFound.map((ingredient, i) => {
          return <li key={`${i} ingredient`}>{ingredient}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
