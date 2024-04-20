import Carousel from 'react-bootstrap/Carousel';

const RecipeCarousel = (props) => {
  let instructions = props.instructions;
  let completeInstructions = [];
  if (instructions[0].hasOwnProperty('itemListElement')) {
    instructions.forEach((eachInstruction) => {
      completeInstructions.push(eachInstruction.itemListElement);
    });
    completeInstructions = completeInstructions.flat();
  } else {
    completeInstructions = instructions;
  }
  return (
    <Carousel data-bs-theme='dark' interval={null}>
      {completeInstructions.map((eachStep, index) => (
        <Carousel.Item key={index}>
          <div className='recipe-carousel-main-text'>{eachStep.text}</div>
          <Carousel.Caption>
            <h3>Step {index + 1}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default RecipeCarousel;
