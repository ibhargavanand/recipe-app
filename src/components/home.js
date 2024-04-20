import { useState } from 'react';
import RecipeCard from './recipeCard';
import { useDispatch } from 'react-redux';
import { setRecipeDataState } from '../redux/recipeDataSlice';

const Home = () => {
  const [fetchUrl, setFetchUrl] = useState('');
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [recipeRef, setRecipeRef] = useState([]);
  const dispatch = useDispatch();

  const handleUrlChange = (event) => {
    setFetchUrl(event.target.value);
  };

  // implement try catch to handle error - TBD
  const handleFetchButtonClick = async () => {
    try {
      let data = await fetch('/api/' + fetchUrl);
      data = await data.text();
      let parser = new DOMParser();
      let doc = parser.parseFromString(data, 'text/html');
      // data = await data.json();
      console.log('data is ', doc);
    } catch (error) {
      console.log('Error occured', error);
    }
  };

  const fetchAllRecipes = async () => {
    try {
      let data = await fetch('/api/');
      data = await data.text();
      let parser = new DOMParser();
      let doc = parser.parseFromString(data, 'text/html');
      let allLinks = doc.querySelectorAll('a');
      const possibleRecipeList = [];
      allLinks.forEach((eachLink) => {
        let eachHref = eachLink.getAttribute('href');
        if (eachHref.includes('www.indianhealthyrecipes.com/') && eachHref.length > 43) {
          possibleRecipeList.push(eachHref);
        } // Make it dynamic later
      });

      setShowLoader(true);

      let payload = await Promise.all(
        possibleRecipeList.map((possibleRecipeLink) => {
          return checkIfALinkIsRecipe(possibleRecipeLink);
        })
      );
      payload = payload.filter((item) => item !== false);

      setShowLoader(false);
      setFetchedRecipes(payload);
      dispatch(setRecipeDataState(payload));
      //   setFetchedRecipes(confirmedRecipeList);
    } catch (error) {
      console.log('Error occured in fetching all recipes', error);
    }
  };

  const checkIfStructuredLink = (doc) => {
    if (
      JSON.parse(doc.querySelectorAll('script[type="application/ld+json"]')[0].innerHTML)['@graph']
        .length > 0
    ) {
      return true;
    }
  };

  const checkIfItContainsRecipeType = (doc) => {
    const graphArray = JSON.parse(
      doc.querySelectorAll('script[type="application/ld+json"]')[0].innerHTML
    )['@graph'];
    let isRecipe = false;
    let recipeObj = {};
    graphArray.length &&
      graphArray.map((item) => {
        if (item['@type'] === 'Recipe') {
          isRecipe = true;
          recipeObj = {
            name: item.name,
            ingredientList: item.recipeIngredient,
            instructions: item.recipeInstructions,
            images: item.image,
          };
        }
      });

    return [isRecipe, recipeObj];
  };

  const checkIfALinkIsRecipe = async (link) => {
    let newLink = link.replace('https://www.indianhealthyrecipes.com/', '');
    let data = await fetch('/api/' + newLink);
    data = await data.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, 'text/html');

    const checkStructuredLink = checkIfStructuredLink(doc);
    const [isRecipe, recipeObj] = checkIfItContainsRecipeType(doc);
    if (isRecipe) {
      return recipeObj;
    } else {
      return isRecipe;
    }
  };

  return (
    <>
      <span>Enter Url to fetch recipe from </span>
      <input
        onChange={handleUrlChange}
        type='text'
        disabled={true}
        value='https://www.indianhealthyrecipes.com/'
      />
      {/* <button onClick={handleFetchButtonClick}>Fetch</button> */}
      <button onClick={fetchAllRecipes}>Fetch All recipes</button>
      <span>
        <b>Currently hardcoded because of CORS Limitations</b>
      </span>
      <h2>Fetched Recipes are : </h2>
      {showLoader ? <h2>Loading ...</h2> : ''}
      <div className='all-recipes'>
        {fetchedRecipes.map((item, index) => (
          <div className='each-recipe'>
            <RecipeCard images={item.images} name={item.name} index={index} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
