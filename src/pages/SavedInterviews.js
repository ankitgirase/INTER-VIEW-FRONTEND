import axios from "axios";
import React, { useEffect, useState } from "react";
import InterviewCard from "../components/InterviewCard";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedInterviews = () => {
  const [savedInterviews, setSavedInterviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedInterviews = async () => {
      try {
        const response = await axios.get(
          `https://inter-viewbackend.onrender.com/interviews/savedInterviews/${userID}`
        );
        console.log(response.data.savedInterviews);
        setSavedInterviews(response.data.savedInterviews);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
        setIsLoaded(true);
      }
    };

    fetchSavedInterviews();
  }, []);

  if(!isLoaded){
    return (<h3 style={{
      marginTop:"50px"
    }}>Loading...</h3>)
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Saved Interviews</h1>

      {savedInterviews.length !== 0 &&
        savedInterviews?.map((item) => (
          <div
            style={{
              width: "500px",
              maxWidth: "100%",
              height: "auto",
            }}
          >
            <InterviewCard
              key={item._id}
              {...item}
              isSaved={true}
              showSavedRecipeButton={false}
            />
          </div>
        ))}
      {savedInterviews.length == 0 && <p>No saved interview</p>}  
    </div>
  );
};

export default SavedInterviews;
