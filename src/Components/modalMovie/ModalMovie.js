import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";

export default function ModalMovie(props) {
  const commentRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    let userComment = commentRef.current.value;

    let newTrending = { ...props.trending, userComment };
    props.commentHandler(newTrending, newTrending.id);
  }

  async function addToFavHandler(e) {
    e.preventDefault();

    let url = `${process.env.REACT_APP_SERVER_URL}/addMovie`;

    let data = {
      title: props.trending.title,
      personalComments: props.trending.comment,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.trending.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`${props.imgUrl}${props.trending.poster_path}`}
            className="img-fluid"
          />
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write your comment:</Form.Label>
              <Form.Control ref={commentRef} as="textarea" rows={3} />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => submitHandler(e)}
            >
              Submit
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => addToFavHandler(e)}
            >
              add to favorite
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
