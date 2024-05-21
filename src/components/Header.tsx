import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({handleAddNewBtn, handleSearchInputChange}) => {

  return (
    <div className='header'>
      <h1>Participants Details</h1>
    
      <div className="row">
       <div>
        <input type="text" placeholder="Search..." onChange={handleSearchInputChange}/>
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
       </div>

        <div>
          <button className="add-new" onClick={handleAddNewBtn} >
            <FontAwesomeIcon icon={faPlus}/>
            <span className="button-text">Add new</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header


