import React, { useState, useEffect } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-project-120ad.firebaseio.com/ingredients.json')
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);

  useEffect(() => {
    console.log('Rendering');
  });
  const addIngredientHandler = (ingedient) => {
    fetch('https://react-hooks-project-120ad.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingedient),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('response', response);
        return response.json();
      })
      .then((responseData) => {
        console.log('responseData', responseData);
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          {
            id: responseData.name,
            ...ingedient,
          },
        ]);
      });
  };

  const removeIngredientHandler = (id) => {
    setUserIngredients(userIngredients.filter((ing) => ing.id !== id));
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={(id) => removeIngredientHandler(id)}
        />
      </section>
    </div>
  );
};

export default Ingredients;
