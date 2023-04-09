import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ModalMovie from "../modalMovie/ModalMovie";
import { useState } from "react";

export default function Movie(props) {

      const imgUrl = 'https://image.tmdb.org/t/p/w780'; 
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`${imgUrl}${props.trending.poster_path}`} />
        <Card.Body>
          <Card.Title>{props.trending.title}</Card.Title>
          <Card.Text>{props.trending.overview}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            add to favorite
          </Button>
        </Card.Body>
      </Card>
      <ModalMovie show={show} handleClose={handleClose} trending={props.trending} imgUrl={imgUrl} />
    </>
  );
}

