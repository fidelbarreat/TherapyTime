import React from 'react';
import { Container, Row, Card} from 'react-bootstrap';

function Features() {

    const features = [{
        name: "Seguridad",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
        url: ""
    },{
        name: "Transparencia",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
        url: ""
    },{
        name: "X",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo velit, facilisis in nibh non, tincidunt tristique velit. Cras non tellus nisl. Vestibulum elementum id nunc quis ullamcorper",
        url: ""
    }]

    return(
        <Container>
            <Row className="justify-content-md-center">
            {features.map(feature => {
                return (
                <Card className="card" style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                    <img src={feature.url} width="100%"/>
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