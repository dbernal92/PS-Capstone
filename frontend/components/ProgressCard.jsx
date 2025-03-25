import Card from './Card';

function ProgressCard({ entry }) {
  return (
    <Card>
      <p><strong>Date:</strong> {entry.date}</p>
      <p><strong>Weight:</strong> {entry.weight} lbs</p>
      <p><strong>Body Fat %:</strong> {entry.bodyFatPercentage}%</p>
    </Card>
  );
}

export default ProgressCard;