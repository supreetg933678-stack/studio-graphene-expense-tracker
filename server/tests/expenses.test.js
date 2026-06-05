const fs = require('fs');
const os = require('os');
const path = require('path');
const request = require('supertest');

const tempDataPath = path.join(os.tmpdir(), 'expense-tracker-test-data.json');
process.env.DATA_FILE_PATH = tempDataPath;
process.env.NODE_ENV = 'test';

const app = require('../app');

beforeEach(() => {
  fs.writeFileSync(tempDataPath, '[]', 'utf8');
});

afterAll(() => {
  if (fs.existsSync(tempDataPath)) {
    fs.unlinkSync(tempDataPath);
  }
});

describe('Expense Tracker API', () => {
  test('returns an empty list when no expenses exist', async () => {
    const response = await request(app).get('/api/expenses');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('creates, retrieves, updates, and deletes an expense', async () => {
    const payload = {
      amount: 42.5,
      category: 'Food',
      date: new Date().toISOString(),
      note: 'Dinner'
    };

    const createResponse = await request(app).post('/api/expenses').send(payload);
    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toMatchObject({
      amount: 42.5,
      category: 'Food',
      note: 'Dinner',
    });
    expect(createResponse.body.id).toBeDefined();

    const expenseId = createResponse.body.id;

    const getResponse = await request(app).get(`/api/expenses/${expenseId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(expenseId);

    const updateResponse = await request(app)
      .put(`/api/expenses/${expenseId}`)
      .send({ ...payload, amount: 50 });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.amount).toBe(50);

    const deleteResponse = await request(app).delete(`/api/expenses/${expenseId}`);
    expect(deleteResponse.status).toBe(204);

    const afterDeleteResponse = await request(app).get(`/api/expenses/${expenseId}`);
    expect(afterDeleteResponse.status).toBe(404);
  });

  test('returns valid summary data and CSV export', async () => {
    const payload = {
      amount: 15,
      category: 'Transport',
      date: new Date().toISOString(),
      note: 'Taxi'
    };

    await request(app).post('/api/expenses').send(payload);

    const summaryResponse = await request(app).get('/api/expenses/summary');
    expect(summaryResponse.status).toBe(200);
    expect(summaryResponse.body.totalSpentThisMonth).toBe(15);
    expect(summaryResponse.body.totalExpenses).toBe(1);
    expect(summaryResponse.body.totalAmountPerCategory.Transport).toBe(15);

    const csvResponse = await request(app).get('/api/expenses/export/csv');
    expect(csvResponse.status).toBe(200);
    expect(csvResponse.headers['content-type']).toMatch(/text\/csv/);
    expect(csvResponse.text).toContain('amount,category,date,note,createdAt,updatedAt');
  });

  test('rejects invalid expense payloads', async () => {
    const payload = {
      amount: -10,
      category: 'Unknown',
      date: 'not-a-date'
    };

    const response = await request(app).post('/api/expenses').send(payload);
    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Amount must be greater than zero.');
    expect(response.body.errors).toContain('Category must be one of Food, Transport, Bills, Entertainment, Other.');
    expect(response.body.errors).toContain('Date must be a valid ISO date.');
  });
});
