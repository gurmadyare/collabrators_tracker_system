import React from 'react';
import { Participants } from '../model/Participant.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
  list: Participants[];

  // Functions to handle delete  & update events
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
};

const Table: React.FC<Props> = ({ list, onDelete, onUpdate }) => {
  return (
    <>
     <table className="participant-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Skill</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.map((participant) => (
          <tr key={participant.id}>
            <td>{participant.id}</td>
            <td>{formatName(participant.name)}</td>
            <td>+252 {participant.phone}</td>
            <td>{participant.age}</td>
            <td>{participant.gender}</td>
            <td>{participant.skill}</td>

            <td className="actions">
              <button className="update" onClick={() => onUpdate(participant.id)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>

              <button className="delete" onClick={() => onDelete(participant.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* If the searching participant is not found  */}
      {list.length == 0 && 
        <div className='not-found-container'>
          <img src="public/IMG_0121.png" alt="" />
          <p>No participator was found <br /> based on your search!</p>
        </div>
        
      }
    </>
  
  );
};

// Function to format the name with spaces between words
const formatName = (name: string) => {
  return name.replace(/([A-Z])/g, ' $1').trim();
};

export default Table;
