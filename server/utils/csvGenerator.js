function quoteValue(value) {
  if (value === undefined || value === null) {
    return '""';
  }
  return `"${String(value).replace(/"/g, '""')}"`;
}

function buildCsv(records, headers) {
  const rows = records.map((record) =>
    headers.map((header) => quoteValue(record[header])).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

module.exports = {
  buildCsv,
};
