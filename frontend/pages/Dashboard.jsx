import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

function Dashboard() {
    const [workouts, setWorkouts] = useState([]);
    const [weekStats, setWeekStats] = useState([]);
    const [loggedThisWeek, setLoggedThisWeek] = useState(0);

    useEffect(() => {
        async function fetchWorkouts() {
            try {
                const res = await fetch("http://localhost:4000/api/workouts");
                if (!res.ok) throw new Error("Failed to fetch workouts");
                const data = await res.json();

                const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
                setWorkouts(sorted);

                const today = new Date();
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                startOfWeek.setHours(0, 0, 0, 0);

                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                endOfWeek.setHours(23, 59, 59, 999);

                const dummyWeek = Array(7).fill(false);
                let countThisWeek = 0;

                sorted.forEach(w => {
                    const workoutDate = new Date(w.date);
                    if (workoutDate >= startOfWeek && workoutDate <= endOfWeek) {
                        const day = workoutDate.getDay();
                        dummyWeek[day] = true;
                        countThisWeek++;
                    }
                });

                setWeekStats(dummyWeek);
                setLoggedThisWeek(countThisWeek);

            } catch (err) {
                console.error("Error loading workouts:", err);
            }
        }

        fetchWorkouts();
    }, []);

    const formatFullDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });

    return (
        <div>
            <center>
            <h1>Dashboard</h1>

            <br />

            <Button
                name="+ Quick Log Workout"
                onClick={() => window.location.href = "/workouts"}
            /></center>

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
                                backgroundColor: weekStats[i] ? "#030bfc" : "#ccc"
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
                    <ul style={{ paddingLeft: "1rem" }}>
                        {workouts.slice(0, 3).map((w, i) => (
                            <li key={i} style={{ marginBottom: "1.2rem" }}>
                                <strong>{formatFullDate(w.date)}</strong>
                                <ul style={{ marginTop: "0.25rem" }}>
                                    {w.exercises.map((ex, j) => (
                                        <li key={j}>
                                            {ex.exerciseName.toLowerCase()}: {ex.sets}x{ex.reps} @ {ex.weight}{ex.unit}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Button name="View All Workouts" onClick={() => window.location.href = "/workouts"} />
                </div>
            </Card>

            <br />

            {/* Stats */}
            <Card>
                <h2 style={{ textAlign: "center" }}>Stats</h2>
                <div style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "1rem",
                    gap: "2rem",
                    flexWrap: "wrap"
                }}>
                    <div style={{
                        padding: "1rem",
                        border: "1px solid var(--accent-color)",
                        borderRadius: "10px",
                        boxShadow: "0 0 8px var(--accent-color)",
                        minWidth: "140px",
                        textAlign: "center"
                    }}>
                        <p style={{ margin: 0 }}>🏋️ Total</p>
                        <strong>{workouts.length}</strong>
                    </div>
                    <div style={{
                        padding: "1rem",
                        border: "1px solid var(--accent-color)",
                        borderRadius: "10px",
                        boxShadow: "0 0 8px var(--accent-color)",
                        minWidth: "140px",
                        textAlign: "center"
                    }}>
                        <p style={{ margin: 0 }}>📅 This Week</p>
                        <strong>{loggedThisWeek}</strong>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Dashboard;
