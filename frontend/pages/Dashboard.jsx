import Card from "../components/Card";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard Overview</h2>

      <Card>
        <h3>Streak</h3>
        <p>7 days logged</p>
      </Card>

      <Card>
        <h3>Progress Summary</h3>
        <p>Total Entries: 15</p>
        <p>Average Weight: 145 lbs</p>
        <p>Avg Body Fat: 18%</p>
      </Card>

      <Card>
        <h3>Recent Workout</h3>
        <p>Leg Day – 4 exercises</p>
        <p>Last logged: 2 days ago</p>
      </Card>
    </div>
  );
}

export default Dashboard;
