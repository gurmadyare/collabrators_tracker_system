import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Participants, participatorsList } from '../model/Participant.type';

const Form = ({ handleBack, formType, participantToUpdate}) => {
  const [participantData, setParticipantData] = React.useState({
    
    name: formType.isCreationType ? '' : participantToUpdate[0].name,
    birthdate: '',
    phone: formType.isCreationType ? '' : participantToUpdate[0].phone,
    gender: '',
    skill: formType.isCreationType ? '' : participantToUpdate[0].skill,
  });   


  function handleChange(event) {
    const { name, value, type } = event.target;
    let newValue = value;

    // Validation for name: allow only letters and spaces
    if (name === 'name' && type === 'text') {
      newValue = value.replace(/[^A-Za-z\s]/ig, '');
    }

    // Validation for phone: allow only numbers and limit length to 9
    if (name === 'phone' && type === 'text') {
      newValue = value.replace(/\D/g, '').slice(0, 9);
    }

    setParticipantData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    // Validation for name: allow only letters
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(participantData.name)) {
      alert('Please enter a valid name (letters only).');
      return;
    }
  
    // Validation for phone: allow only numbers and limit length to 9
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(participantData.phone)) {
      alert('Please enter a valid phone number (9 digits).');
      return;
    }
  
    // Calculate age from birthdate
    const today = new Date();
    const birthDate = new Date(participantData.birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
  
    // Add the participant to the list
    const newParticipant = {
      // Generates unique ID
      id: participatorsList.length + 1,
      name: participantData.name,
      phone: parseInt(participantData.phone),
      age: age,
      gender: participantData.gender,
      skill: participantData.skill
    };
  
    // Update the list with the new participant based on the form type
    if(formType.isCreationType){
      participatorsList.push(newParticipant);

    //Handle updation 
    }else{
      //1) Find the index of the pr to update 
      const index = participatorsList.findIndex((participant) => participant.id === participantToUpdate[0].id);

      //2) Update the participants info 
      participatorsList[index] = {
        ...participatorsList[index],
        name: participantData.name,
        phone: parseInt(participantData.phone),
        age: age,
        gender: participantData.gender,
        skill: participantData.skill
      }
    }
    
  
    // Clear form data after submission
    setParticipantData({
      name: '',
      birthdate: '',
      phone: '',
      gender: '',
      skill: ''
    });
  
    //finally alert succesfully subtitted/updated to the user
    let alertType = "Successfully submitted!"; 

    switch(formType.isCreationType){
      case false:
        alertType = "Successfully updated!";
        break;
    }

    alert(alertType)
  }
  

  return (
    <div className='add-new-card'>
      <button onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1>{ !formType.isCreationType ? 'UPDATE PARTICIPANT' : 'NEW PARTICIPANT'} </h1>

      

    <form onSubmit={handleSubmit}>
      <label>Name: </label> 
      <input type="text" placeholder='Enter your name here...' name='name' onChange={handleChange} value={participantData.name} required/> <br /> <br />

      <label>BirthDate: </label>
      <input type="date" name='birthdate' onChange={handleChange} required/> <br /> <br />

      <label>Tel: </label>
      <input type="text" placeholder='Enter your number here...'    name='phone' onChange={handleChange} value={participantData.phone} required/> <br /> <br />

      <label>Gender: </label>  
      <input type="radio" name='gender' id='male'  value='Male' onChange={handleChange} required/>
      <label htmlFor="male">Male</label>

      <input type="radio" name='gender' id='female'  value='Female' onChange={handleChange} required/>
      <label htmlFor="female">Female</label> <br /><br />


      <label htmlFor='skill'>Skill:  </label>

      <select name="skill" id="skill" value={participantData.skill} onChange={handleChange} required>
        <option value="">Select Skill</option>
        <option value="Frontend Mobile Developer">Frontend Mobile Developer</option>
        <option value="Frontend Web Developer">Frontend Web Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Full Stack Mobile Developer">Full Stack Mobile Developer</option>
        <option value="Full Stack Web Developer">Full Stack Web Developer</option>
        <option value="UI/UX Designer">UI/UX Designer</option>
        <option value="IT Specialist">IT Specialist</option>
      </select> <br /> <br />

      <button>{formType.isCreationType ? 'Submit' : 'Update'}</button>
    </form>
    </div>
  );
};

export default Form;
