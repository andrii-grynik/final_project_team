import React, { useState, useEffect } from "react";
import axios from "axios";

function ChallengeList(props) {
  const { userId } = props;
  const [currentChallenges, setCurrentChallenges] = useState([]);
  const [expiredChallenges, setExpiredChallenges] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user_challenge`,
          { withCredentials: true }
        );
        const challenges = response.data;
        const currentDate = new Date().getTime();
        const expired = [];
        const active = [];
        challenges.forEach((challenge) => {
          //console.log("challenge", challenge);
          if (
            currentDate >=
            new Date(challenge.expiration_date.toString()).getTime()
          ) {
            expired.push(challenge);
          } else {
            active.push(challenge);
          }
        });
        setCurrentChallenges(active);
        setExpiredChallenges(expired);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [userId]);
  //console.log(expiredChallenges);
  //console.log(currentChallenges);


  const handleDelete = async (id) => {
    //console.log("Clicked");
   //console.log("challenges", challenges);
    try {
      await axios({
        baseURL: `http://localhost:3001/challenge`,
        url: `/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const newExpired = expiredChallenges.filter(
        (challenge) => challenge.id !== id
      );
      setExpiredChallenges(newExpired);
      const newCurrent = currentChallenges.filter(
        (challenge) => challenge.id !== id
      );
      setCurrentChallenges(newCurrent);
    } catch (error) {
      console.error(error);
    }
    
  };


  return (
    <div>
      <h2>Current Challenges</h2>
      {currentChallenges.map((challenge) => (
        <div className="card" key={challenge.id}>
          <h3>{challenge.title}</h3>
          <p>{challenge.description}</p>
          <p>Points: {challenge.points}</p>
          <p>Expiration Date: {challenge.expiration_date}</p>
          <button onClick={() => handleDelete(challenge.id)}>Delete</button>
        </div>
      ))}
      <h2>Expired Challenges</h2>
      {expiredChallenges.map((challenge) => (
        <div className="card" key={challenge.id}>
          <h3>{challenge.title}</h3>
          <p>{challenge.description}</p>
          <p>Points: {challenge.points}</p>
          <p>Expiration Date: {challenge.expiration_date}</p>
          <button onClick={() => handleDelete(challenge.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ChallengeList;
