import React from "react"
import '../style/App.css'
import { Participants, participatorsList } from "../model/Participant.type"
import Form from "./Form";
import Home from "./Home";

function App() {
  const [formType, setFormType] = React.useState({
    isCreationType: true,
    isUpdationType: false,
  });

  const [isFormPage, setIsFormPage] = React.useState(false);
  const [participant, setParticipant] = React.useState(participatorsList as Participants[]);
  const [prToUpdate, setPrToUpdate] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState('');

  function handleAddNewBtnClick(){
    // Pop up the form page & also mention the form type..
    setIsFormPage(true);  
    setFormType({isCreationType: true, isUpdationType: false});
    setPrToUpdate({}); // Reset the participant to update
  }

  function handleBackBtnClick(){
    // Close the form page.
    setIsFormPage(false);
  }

  // Function to handle deletion of a participant
  const handleDelete = (id: number) => {
    const updatedParticipants = participant.filter(participant => participant.id !== id);
    setParticipant(updatedParticipants); 
  };

  // Function to handle updating participant information
  const handleUpdate = (id: number) => {
    // First, pop up the form page & mention the form type..
    setIsFormPage(true);  
    setFormType({isCreationType: false, isUpdationType: true});

    // Find the participant to update
    const participantToUpdate = participant.filter(participant => participant.id === id);
    
    // Pass the new participantToUpdate in the form component
    setPrToUpdate(participantToUpdate);   
  };

  // Function for handling searching
  const handleSearching = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }

  // Filter data based on searchQuery
  const filteredParticipants = participant.filter(participant => 
    participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {!isFormPage ? 
        <Home 
          handleAddNew={handleAddNewBtnClick} 
          list={filteredParticipants}  
          handleDelete={handleDelete} 
          handleUpdate={handleUpdate} 
          handleSearchInputChange={handleSearching}
        /> 
      : 
        <Form 
          handleBack={handleBackBtnClick} 
          formType={formType} 
          participantToUpdate={prToUpdate} 
        />
      } 
    </>
  )
}

export default App