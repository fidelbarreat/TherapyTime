import React from 'react';
import { Container, Row, Col, Card, Carousel} from 'react-bootstrap';

function Features() {

    const features = [{
        name: "Seguridad",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper"
    },{
        name: "Transparencia",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper"
    },{
        name: "X",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper"
    }]

    return(
        <Container>
            <Row>
                <h2>Características</h2>
            </Row>
            <Row className="justify-content-md-center">
            {features.map(feature => {
                return (
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <img src="https://www.herbazest.com/imgs/d/8/7/551784/pera.jpg" width="100%"/>
                  <Card.Title>{feature.name}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                  <Card.Text>
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
                )
            })}
            
            </Row>
        </Container>
    );
}

export default Features;