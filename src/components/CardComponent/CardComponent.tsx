import Card from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';

function CardComponent(props: any) {
  return (
    <Card style={{ width: '15rem' }}>
    <Card.Img variant="top" src="https://images.pexels.com/photos/1684880/pexels-photo-1684880.jpeg?auto=compress&cs=tinysrgb&w=800" />
    <Card.Body>
      {
        props.ShowTitle === 'true' &&
        <Card.Title>{props.Title}</Card.Title>
      }
      
      {
        props.ShowDescription === 'true' &&
        <Card.Text>
          {props.Description}
        </Card.Text>
      }
      {props.ShowButton === 'true' && <Button variant="primary">Go somewhere</Button>}
    </Card.Body>
  </Card>

  );
}

export default CardComponent;