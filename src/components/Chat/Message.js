import React from 'react';
import PropTypes from 'prop-types';
import { formatRelative } from 'date-fns';

const formatDate = date => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({
  createdAt = null,
  text = '',
  nombre = '',
  photoURL = '',
}) => {
  if (!text) return null;

  return (
    <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
      
      {photoURL ? (
        <img
          src={photoURL}
          alt="Avatar"
          className="rounded-full mr-4"
          width={45}
          height={45}
        />
      ) : null}
      
      <div>

        <div className="flex items-center mb-1">
          {nombre ? (
            <p className="mr-2 text-primary-500 msg-nombre"><b>{nombre}</b></p>
          ) : null}
          <p className="msg-text">{text}</p>
          {createdAt?.seconds ? (
            <span className="text-gray-500 text-xs msg-hora">
              {formatDate(new Date(createdAt.seconds * 1000))}
            </span>
          ) : null}
        </div>

        
      
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  nombre: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;