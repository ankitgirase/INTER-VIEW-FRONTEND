import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./InterviewCard.css";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

const InterviewCard = ({ companyName, role, difficulty, offer, process, rounds, _id, isSaved, showSavedRecipeButton }) => {
  const [hover, setHover] = useState(false);
  const [saved, setSaved] = useState(false);

  const userID = useGetUserID();

  // setSaved(userID.savedInterviews?.include(_id))

  useEffect(()=>{
    setSaved(isSaved);
  },[isSaved])

  
  const handleSave = async() => {
    if(saved) return alert(`${companyName} is already saved`)
    try {
      const response = await axios.put("http://localhost:3001/interviews",{
        userID,
        interviewID: _id
      });
      console.log(response);
      setSaved(true);
      alert(`interview for ${companyName} added successfully !`)
    } catch (error) {
      console.error(error)
    }
  };
  
  const handleRemove = async() => {
    try {
      const response = await axios.delete("http://localhost:3001/interviews",{
        data:{
        interviewID: _id,
        userID
        }
      });
      alert("Interview deleted.");
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  };
  // const handleRemove = async () =>{
  //   axios.delete("http://localhost:3001/interviews", {
  //     data:
  //     {
  //       interviewID: _id,
  //       userID
  //     }
  //   }
  //   )
  //     .then(response => {
  //       console.log('Data deleted successfully');
  //       console.log('Updated saved interviews:', response.data.savedInterviews);
  //     })
  //     .catch(error => {
  //       console.error('Error deleting data:', error);
  //     });
  // }


  const haverHandleTrue = () => {
    setHover(true);
  };
  const haverHandleFalse = () => {
    setHover(false);
  };

  return (
    <div className="interview-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "auto",
          justifyContent: "space-between",
          // maxWidth: "80%",
          textAlign: "center",
        }}
      >
        <h3 className="company-name">{companyName}</h3>
        {showSavedRecipeButton && userID && <button
          style={{
            padding: "5px",
            backgroundColor: !hover&&!saved ? "whitesmoke" : hover&&!saved?"lightgreen":"grey",
            border: "none",
            borderRadius: "2px",
            transition: "background-color 0.1s",

            cursor: hover&&!saved ? "pointer" : "",
          }}
          onMouseEnter={haverHandleTrue}
          onMouseLeave={haverHandleFalse}
          onClick={()=>handleSave()}
        >
          {!saved?"Save":"Saved"}
        </button>}
        {!showSavedRecipeButton && userID && <button
          style={{
            padding: "5px",
            backgroundColor: "orange",
            border: "none",
            borderRadius: "2px",
            cursor: hover ? "pointer" : "",
          }}
          onMouseEnter={haverHandleTrue}
          onMouseLeave={haverHandleFalse}
          onClick={()=>handleRemove()}
        >
          Remove
        </button>}
      </div>
      <p className="role">
        Role: <strong>{role}</strong>
      </p>
      <p className="offer">
        Offer Type: <strong>{offer}</strong>
      </p>
      <p className="rounds">
        No. of Rounds: <strong>{rounds}</strong>
      </p>
      <p className="process">
        Process: <p></p>
        <strong>{process}</strong>
        <p></p>
      </p>
      <p className="difficulty">
        Difficulty Level: <strong>{difficulty}</strong>
      </p>
    </div>
  );
};

InterviewCard.propTypes = {
  companyName: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  offer: PropTypes.string.isRequired,
  process: PropTypes.string.isRequired,
  rounds: PropTypes.number.isRequired,
};

export default InterviewCard;
