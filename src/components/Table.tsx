import React from 'react';
import { Participants } from '../model/Participant.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsToEye, faEdit, faEye, faEyeDropper, faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
  list: Participants[];

  // Functions to handle delete  & update events
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
};

const Table: React.FC<Props> = ({ list, onDelete, onUpdate }) => {
  return (
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
  );
};

// Function to format the name with spaces between words
const formatName = (name: string) => {
  return name.replace(/([A-Z])/g, ' $1').trim();
};

export default Table;
