import React from 'react';
import { Container, Row, Card} from 'react-bootstrap';
import logo from '../../../images/logo-therapytime.png';
import privacidad from '../../../images/confidencial2.jpg';
import seguridad from '../../../images/privado3.jpg';
import soporte from '../../../images/soporte2.jpg';
import "./features.css";

function Features() {

    const features = [{
        name: "Privacidad",
        description: "Toda la información que es brindada en el espacio terapéutico entra en un pacto de confidencialidad con los especialistas, esto implica que dicha información no puede ser difundida en público o a terceros sin la autorización del usuario. Resulta uno de los elementos más importantes que se implementa en nuestras consultas. ",
        url: privacidad
    },{
        name: "Seguridad",
        description: "Garantizamos la seguridad de los datos de nuestros usuarios, es fundamental para nosotros brindar un marco de seguridad y confianza. De la misma forma, el establecer un contacto humano reconfortante y disponible. Queremos proporcionar a los usuarios la mejor atención posible.",
        url: seguridad
    },{
        name: "Soporte",
        description: "Ofrecemos servicio de soporte las 24 horas al día, los 7 días a la semana para todos nuestros usuarios. En cualquier momento que necesite solucionar un problema o realizar una pregunta estaremos disponibles para brindarle ayuda. Garantizamos una atención al cliente sin demoras, eficaz y de calidad. ",
        url: soporte
    }]

    return(
        <Container>
            <Row className="justify-content-md-center">
            {features.map(feature => {
                return (
                <Card className="card" style={{ width: '18rem', margin: '10px' }}>
                <Card.Body className ="cardbody">
                    <img className="imagen" src={feature.url} width="100%"/>
                  <Card.Title className ="cardtitle">{feature.name}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                  <Card.Text className ="cardtext">
                    {feature.description}
                  </Card.Text>
                </Card.Body >
              </Card>
                )
            })}
            
            </Row>
        </Container>
    );
}

export default Features;