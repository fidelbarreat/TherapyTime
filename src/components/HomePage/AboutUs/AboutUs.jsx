import React from 'react';
import logo from '../../../images/logo-therapytime.png';
import icon1 from '../../../images/icon-1.svg';
import icon2 from '../../../images/icon-2.svg';
import icon3 from '../../../images/icon-3.svg';
import iconCalendar from '../../../images/icon-calendar.svg';
import iconChat from '../../../images/icon-chat.svg';
import iconSearch from '../../../images/icon-search.svg';
import iconStar from '../../../images/icon-star.svg';
import image from '../../../images/about-us-pic.png'
import styled from 'styled-components';

const AboutUs = () => {
	return (
		<AboutUsContainer>
            <AboutUsInfo>
                <img src={logo} alt =""/>
                <p>TherapyTime, somos una plataforma que cuenta con un equipo de psicólogos certificados listos para brindar el servicio de terapia psicológica online a través de chat y videollamada, como también brindamos las herramientas para que nuestros especialistas tengan una eficaz gestión de citas. De esta manera, logramos tener un alcance a cualquier parte del mundo. Nuestro objetivo es brindar un servicio de calidad, seguro para todos los pacientes.</p>
            </AboutUsInfo>

            <StepsInfo>
                <h1>Cuida tu salud mental en 3 sencillos pasos:</h1>
                <Step>
                    <StepContent>
                        <img src={icon1} alt=""/>
                    </StepContent>
                    <StepContent>
                        <p>Busca y consigue el especialista de tu preferencia</p>
                    </StepContent>
                    <StepContent>
                        <img src={iconSearch} alt=""/>
                    </StepContent>
                </Step>
                <Step>
                    <StepContent>
                        <img src={icon2} alt=""/>
                    </StepContent>
                    <StepContent>
                        <p>Reserva tu cita fácilmente; elige la fecha y hora que más te convenga</p>
                    </StepContent>
                    <StepContent>
                        <img src={iconCalendar} alt=""/>
                    </StepContent>
                </Step>
                <Step>
                    <StepContent>
                        <img src={icon3} alt=""/>
                    </StepContent>
                    <StepContent>
                        <p>Contacta directamente a los especialistas a través de chats en vivo</p>
                    </StepContent>
                    <StepContent>
                        <img src={iconChat} alt=""/>
                    </StepContent>
                </Step>
            </StepsInfo>
            <EncouragingStep>
                    <Step>
                        <StepContent>
                            <img src={iconStar} alt=""/>
                        </StepContent>
                        <StepContent>
                            <p>¿Qué esperas para formar parte de esta comunidad?</p>
                        </StepContent>
                        <StepContent>
                            <img src={iconStar} alt=""/>
                        </StepContent>
                    </Step>
                </EncouragingStep>
            <Finale>
                <img src={image} alt =""></img>
            </Finale>
        </AboutUsContainer>
        
	);
}

const AboutUsContainer = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const AboutUsInfo = styled.div`
    text-align: center;
    margin: auto 20%;
`;

const StepsInfo = styled.div`
    text-align: center;
    font-style: italic;
    margin-top: 2%;
    h1 {
        font-size: 30px;
        text-align: center;
        color: purple;
        font-style: normal;
        font-weight: bold;}
`;

const Step = styled.div`
    display: flex;
    flex-flow: row;
    align-items:center;
    text-align: center;
    justify-content: center;
    margin: 5px 0px;
`;

const StepContent = styled.div`
    font-size: 20px;
    p{
        margin: 0 10px; 
    }
`;

const EncouragingStep = styled.div`
    font-weight: bold;
    margin: 15px 0px;
`;

const Finale = styled.div`
    margin-top: 2%;
    img {
        width: 100%;
    }
`;

export default AboutUs;