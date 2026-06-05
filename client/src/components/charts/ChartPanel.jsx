import {
    Box,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const palette = ['#1976d2', '#f48fb1', '#ffb300', '#66bb6a', '#8e24aa'];

function ChartPanel({ summary }) {
  if (!summary) return null;

  const categoryData = Object.entries(summary.totalAmountPerCategory).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Box sx={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', mt: 2 }}>
      <Card sx={{ minHeight: 360 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Spending by Category
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card sx={{ minHeight: 360 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Category Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={palette[index % palette.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ChartPanel;
