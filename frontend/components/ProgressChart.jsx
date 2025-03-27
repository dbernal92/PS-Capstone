// frontend/components/ProgressChart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function ProgressChart({ entries }) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return <p>No chart data available.</p>;
  }

  const sorted = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = sorted.map((entry) =>
    new Date(entry.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  );

  const weightData = sorted.map((entry) => entry.weight || 0);
  const bodyFatData = sorted.map((entry) => entry.bodyFatPercentage || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Weight (lbs)',
        data: weightData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Body Fat %',
        data: bodyFatData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default ProgressChart;
