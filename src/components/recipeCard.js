import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RecipeCard = (props) => {
  const handleViewRecipe = () => {
    let newWindow = window.open('/recipe', '_blank');
    newWindow['index'] = props.index;
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.images[0]} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        {/* <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text> */}
        <Button variant='primary' onClick={handleViewRecipe}>
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
};
export default RecipeCard;
