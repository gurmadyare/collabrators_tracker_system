import React from 'react'
import Header from './Header'
import Table from './Table'

const Home = ({handleAddNew, list, handleDelete, handleUpdate, handleSearchInputChange}) => {
  return (
    <>
      <Header handleAddNewBtn={handleAddNew} handleSearchInputChange ={handleSearchInputChange}/> 
      <Table list={list} onDelete={handleDelete} onUpdate={handleUpdate}/>
    </>
  )
}

export default Home