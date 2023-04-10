import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export default function FavList() {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    getFavMovies();
  }, []);

  async function getFavMovies() {
    let url = `${process.env.REACT_APP_SERVER_URL}/getMovies`;
    let response = await fetch(url, {
      method: "GET",
    });

    let data = await response.json();
    setFavMovies(data);
  }

  async function handleDelete(id) {
    let url = `${process.env.REACT_APP_SERVER_URL}/deleteMovies/${id}`;

    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      getFavMovies();
    }
  }

  async function handleUpdate(event, id) {
    event.preventDefault();
    let url = `${process.env.REACT_APP_SERVER_URL}/updateMovies/${id}`;
    let movie = favMovies?.filter((movie) => movie?.id == id);
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalComments: movie?.length ? movie[0]?.personalcomments : null,
      }),
    });
    getFavMovies();
  }

  const updateMovie = (value, id) => {
    let moviesTmp = favMovies;
    moviesTmp?.map((movie) => {
      if (movie?.id === id) {
        movie.personalcomments = value;
      }
    });
    setFavMovies(moviesTmp);
  };

  return (
    <>
      <h2> this is favorite movies Page</h2>
      {favMovies &&
        favMovies.map((trending, index) => {
          return (
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{trending.title}</Card.Title>
                <Card.Text>{trending.personalcomments}</Card.Text>
                <Form.Group
                  className="mb-3"
                  controlId={`textArea_with_id_${trending?.id}`}
                >
                  <Form.Label>Write your comment:</Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      updateMovie(event.target.value, trending.id)
                    }
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => handleDelete(trending.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={(event) => handleUpdate(event, trending.id)}
                >
                  Update
                </Button>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
}
