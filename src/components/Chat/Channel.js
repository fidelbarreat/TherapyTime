import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useFirestoreQuery } from './hooks';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
// Components
import Message from './Message';

import "./Chat.css"

const Channel = ({ user = null }) => {
    let {id} = useParams();
  const db = firebase.firestore();
  const messagesRef = db.collection('messages');
  const messages = useFirestoreQuery(
    messagesRef.orderBy('createdAt', 'desc').limit(100)
  );

  const [newMessage, setNewMessage] = useState('');

  const inputRef = useRef();
  const bottomListRef = useRef();

  const { uid, nombre } = user;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = e => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        nombre,
      });
      // Clear input field
      setNewMessage('');
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <Container className = "justify-content-center">
      <Row>
					<Card className="card">
						<Card.Body>
							<Card.Title>Chat</Card.Title>
							{/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
							<Card.Text>
              <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
            <Link to={`/Feedback/${id}`}><p className="mb-1">No olvides dejar tu feedback</p></Link> 
            <a href="https://meet.google.com/new" target="_blank"><Button>Videollamada</Button></a>
            </div>
          </div>
          <ul className="mesages_container">
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map(message => (
                <li key={message.id} className={`msg`}>
                  <Message {...message} />
                </li>
              ))}
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
      <div className="mb-6 mx-4">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md msg-form"
        >
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage}
            className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ??????
          </button>
        </form>
      </div>
    </div>
							</Card.Text>
						</Card.Body>
					</Card>
      </Row>
    
                
    </Container>
    
    </>
  );
};

Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

export default Channel; 