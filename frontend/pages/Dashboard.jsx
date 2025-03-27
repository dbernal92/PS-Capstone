import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

function Dashboard() {
    const [workouts, setWorkouts] = useState([]);
    const [weekStats, setWeekStats] = useState([]);
    const [loggedThisWeek, setLoggedThisWeek] = useState(0);


    // Simulate fetching recent workouts from localStorage or mock data
    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const res = await fetch("http://localhost:4000/api/workouts");
                if (!res.ok) throw new Error("Failed to fetch workouts");
                const data = await res.json();
                setWorkouts(data);
    
                // Get start and end of current week (Sun - Sat)
                const today = new Date();
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                startOfWeek.setHours(0, 0, 0, 0);
    
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                endOfWeek.setHours(23, 59, 59, 999);
    
                // Fill weekly activity (Sun to Sat)
                const dummyWeek = Array(7).fill(false);
                let countThisWeek = 0;
    
                data.forEach(w => {
                    const workoutDate = new Date(w.date);
                    if (workoutDate >= startOfWeek && workoutDate <= endOfWeek) {
                        const day = workoutDate.getDay();
                        dummyWeek[day] = true;
                        countThisWeek++;
                    }
                });
    
                setWeekStats(dummyWeek);
                setLoggedThisWeek(countThisWeek); // ← You’ll need to track this in state
    
            } catch (err) {
                console.error("Error loading workouts:", err);
            }
        }
    
        fetchWorkouts();
    }, []);
    

    return (
        <div>
            <h1>Dashboard</h1>

            {/* Quick Button */}
            <Button
                name="+ Quick Log Workout"
                onClick={() => window.location.href = "/workouts"}
            />

            <br /><br />

            {/* This Week's Activity */}
            <Card>
                <h2>This Week</h2>
                <div style={{ display: "flex", gap: "1rem" }}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <strong>{day}</strong>
                            <div style={{
                                marginTop: "4px",
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                backgroundColor: weekStats[i] ? "#4caf50" : "#ccc"
                            }} />
                        </div>
                    ))}
                </div>
            </Card>

            <br />

            {/* Recent Workouts */}
            <Card>
                <h2>Recent Workouts</h2>
                {workouts.length === 0 ? (
                    <p>No workouts yet.</p>
                ) : (
                    <ul>
                        {workouts.slice(0, 3).map((w, i) => (
                            <li key={i}>
                                <strong>Workout {i + 1} – {new Date(w.date).toLocaleDateString()}</strong>
                                <ul>
                                    {w.exercises.map((ex, j) => (
                                        <li key={j}>
                                            {ex.exerciseName}: {ex.sets}x{ex.reps} @ {ex.weight}{ex.unit}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                )}
            </Card>

            <br />

            {/* Optional: Streak/Stats */}
            <Card>
                <h2>Stats</h2>
                <p>Total logged workouts: {workouts.length}</p>
                <p>Logged this week: {loggedThisWeek}</p>
            </Card>
        </div>
    );
}

export default Dashboard;
