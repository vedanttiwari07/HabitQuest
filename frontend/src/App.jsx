import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    const fetchGoals = async() => {
      try {
        const res = await axios.get("api/goals")
        setGoals(res.data)
      } catch(error) {
        console.log("Error fetching goals", error)
      }
    }

    fetchGoals();
  }, []);


  
  return (
    <>
      <h1>Goals and Habit Tracker</h1>
      <div className="goalscontainer">
      {goals.map((goal) => (
        <div key={goal._id}>
          <h3>{goal.title}</h3>
          <p>Description: {goal.description}</p>
          <p>Progress: {goal.progress}</p>
          <p>Habits Required: {goal.habits || "None"}</p>
        </div>
      ))}
      </div>
    </>
  )
}

export default App
