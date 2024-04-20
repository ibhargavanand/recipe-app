import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import RecipeCarousel from './recipeCarousel';

const RecipeInstructionsModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [instructions, setInstructions] = useState(props.instructions.flat());
  useEffect(() => {
    if (props.show) {
      handleShow();
    }
  }, []);
  return (
    <>
      <Modal className='recipe-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RecipeCarousel instructions={instructions} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default RecipeInstructionsModal;
