import React, { useState } from "react";
import axios from 'axios';
import './CreateInterview.css'
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

const CreateInterview = () => {
  
  const userID = useGetUserID();
  const [interview, setInterview] = useState({
    companyName: "",
    role:"",
    offer: "",
    rounds: 0,
    process: "",
    difficulty: "",
    userOwner: userID,
  }) 

  const navigate = useNavigate();


  const handleChange = (event) =>{
      const { name, value} = event.target;
      setInterview({...interview, [name]: value});
  }

  const onSubmit = async (e) =>{
        e.preventDefault();
        // console.log(interview)
        try {
          await axios.post("http://localhost:3001/interviews", interview);
          // console.log(int);
          alert("Interview added successfully");
          navigate('/')
        } catch (error) {
          console.error(error)
        }
  }

  return (
    <div className="create-interview">
      <h2>Add New Interview</h2>
      <form  onSubmit={onSubmit}>
        <label htmlFor="companyName">Company Name</label>
        <input type="text" id="companyName" name="companyName" placeholder="Ex - Microsoft" onChange={handleChange} />

        <label htmlFor="role">Role</label>
        <input type="text" id="role" name="role" placeholder="Ex - SDE, SWE, AE" onChange={handleChange} />

        <label htmlFor="offer">Offer</label>
        <input type="text" id="offer" name="offer" placeholder="OnCampus / OffCampus"  onChange={handleChange} />

        <label htmlFor="rounds">No. of Rounds</label>
        <input type="number" name="rounds"  onChange={handleChange} />

        <label htmlFor="process">Process</label>
        <textarea name="process" id="process" cols="40" rows="10"  onChange={handleChange} ></textarea>

        <label htmlFor="difficulty">Difficulty Level</label>
        <input type="text" id="difficulty" name="difficulty" placeholder="Simple / Moderate / Difficult"  onChange={handleChange} />

        <button type="submit">Add Interview</button>
      </form>
    </div>
  );
};

export default CreateInterview;
