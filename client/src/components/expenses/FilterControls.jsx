import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const filterOptions = ['This Month', 'Last Month', 'Custom Range'];

function FilterControls({ categories, categoryFilter, setCategoryFilter, dateRange, setDateRange, customRange, setCustomRange }) {
  return (
    <Box sx={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', alignItems: 'end', mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="category-filter-label">Category</InputLabel>
        <Select
          labelId="category-filter-label"
          value={categoryFilter}
          label="Category"
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map((category) => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="date-range-label">Date Range</InputLabel>
        <Select
          labelId="date-range-label"
          value={dateRange}
          label="Date Range"
          onChange={(event) => setDateRange(event.target.value)}
        >
          {filterOptions.map((option) => (
            <MenuItem value={option} key={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {dateRange === 'Custom Range' && (
        <Box sx={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
          <TextField
            label="From"
            type="date"
            value={customRange.from || ''}
            onChange={(event) => setCustomRange((prev) => ({ ...prev, from: event.target.value }))}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="To"
            type="date"
            value={customRange.to || ''}
            onChange={(event) => setCustomRange((prev) => ({ ...prev, to: event.target.value }))}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
      )}

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Filter expenses by category or date range to explore spending trends.
      </Typography>
    </Box>
  );
}

export default FilterControls;
