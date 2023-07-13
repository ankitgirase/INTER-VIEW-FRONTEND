import axios from "axios";
import React, { useEffect, useState } from "react";
import InterviewCard from "../components/InterviewCard";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [interviews, setInterviews] = useState([]);
  const [savedInterviews, setSavedInterviews] = useState([])

  const userID = useGetUserID();


  useEffect(()=>{

    const fetch = async () =>{
        try {
          const response = await axios.get("http://localhost:3001/interviews");
          setInterviews(response.data)
        } catch (error) {
          console.error(error)
        }
    }
    
    fetch();
    const fetchSavedInterviews = async () =>{
      try {
        const response = await axios.get(`http://localhost:3001/interviews/savedInterviews/ids/${userID}`);
        console.log(response.data);
        setSavedInterviews(response.data.savedInterviews)
      } catch (error) {
        console.error(error)
      }
    }
    
    fetchSavedInterviews()

  },[])

  return (<div style={{
    width:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  }}>
          <h1>Interviews</h1>
       {
        
          interviews.map((item)=>(
            <div style={{
              
                width:"500px",
                maxWidth:"100%",
                height:"auto"
             
            }}>
            <InterviewCard key={item._id} {...item} isSaved={savedInterviews?.includes(item._id)} showSavedRecipeButton={true}/>
            </div>
          ))
       }
  </div>);
};

export default Home;
