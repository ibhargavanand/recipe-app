import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RecipeInstructionsModal from './recipeInstructionsModal';

const RecipePage = (props) => {
  const currentRecipeIndex = window['index'] || 2; //Hardcoded index 2 for testing purpose - To be removed
  const { recipeDataState } = useSelector((state) => state.recipeDataState);
  const selectedRecipe = recipeDataState[currentRecipeIndex];
  const [recipe, setRecipe] = useState(selectedRecipe);
  const [isPrepAvailable, setIsPrepAvailable] = useState(false);
  useEffect(() => {
    selectedRecipe.instructions.map((item) => {
      if (item.name === 'Preparation') {
        setIsPrepAvailable(true);
      }
    });
  }, []);

  let prepInstructions =
    isPrepAvailable &&
    recipe.instructions.map((item) => {
      if (item.name === 'Preparation') {
        return item.itemListElement;
      } else return null;
    });

  prepInstructions = isPrepAvailable && prepInstructions.filter((item) => item !== null);

  let howToInstructions =
    isPrepAvailable &&
    recipe.instructions.map((item) => {
      if (item.name !== 'Preparation') {
        return item.itemListElement;
      } else return null;
    });

  howToInstructions = isPrepAvailable && howToInstructions.filter((item) => item !== null);
  const [showInstructionsPrep, setShowInstructionsPrep] = useState(false);
  const [showInstructionsHowTo, setShowInstructionsHowTo] = useState(false);

  console.log(selectedRecipe);

  return (
    <>
      <h2 className='recipe-title'>{recipe.name}</h2>
      <div className='recipe-main-image'>
        <img src={recipe.images[0]} />
      </div>
      <h2 className='recipe-ingredients-title'>List of ingredients :</h2>
      <div>
        <ul className='recipe-ingredients-list'>
          {recipe.ingredientList.map((ingredient, index) => (
            <li className='recipe-ingredients-item' key={index}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      {isPrepAvailable ? (
        <>
          {' '}
          <button
            onClick={() => {
              setShowInstructionsPrep(true);
            }}
            className='recipe-instructions-button'
          >
            Click here to view guided instructions - For Preperation
          </button>
          <div>
            {showInstructionsPrep ? (
              <RecipeInstructionsModal
                name='Preparation'
                show={showInstructionsPrep}
                instructions={prepInstructions}
              />
            ) : (
              ''
            )}
          </div>
          <button
            onClick={() => {
              setShowInstructionsHowTo(true);
            }}
            className='recipe-instructions-button'
          >
            Click here to view guided instructions - For How To Section
          </button>
          <div>
            {showInstructionsHowTo ? (
              <RecipeInstructionsModal
                name={recipe.name}
                show={showInstructionsHowTo}
                instructions={howToInstructions}
              />
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setShowInstructionsHowTo(true);
            }}
            className='recipe-instructions-button'
          >
            Click here to view guided instructions
          </button>
          <div>
            {showInstructionsHowTo ? (
              <RecipeInstructionsModal
                name={recipe.name}
                show={showInstructionsHowTo}
                instructions={recipe.instructions}
              />
            ) : (
              ''
            )}{' '}
          </div>
        </>
      )}
    </>
  );
};
export default RecipePage;
