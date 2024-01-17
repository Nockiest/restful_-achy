const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Import the function that contains the axios.post call
const {  submitMove  } = require('../../client/index.js');

describe('submitMove', () => {
  let axiosMock;

  beforeEach(() => {
    // Create a new instance of axios-mock-adapter before each test
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    // Reset the mock adapter after each test
    axiosMock.reset();
  });

  it('should handle successful post request', async () => {
    // Mock a successful response from the server
    axiosMock.onPost('your-post-endpoint').reply(200, { board: 'mocked board data' });

    // Call the function that makes the axios.post request
    const result = await submitMove();

    // Assert the expected result or side effects
    expect(result).toEqual({ board: 'mocked board data' });
    // Add more assertions as needed
  });

  it('should handle post request error', async () => {
    // Mock an error response from the server
    axiosMock.onPost('new_move').reply(500, { error: 'mocked error' });

    // Call the function that makes the axios.post request
    try {
      await submitMove();
    } catch (error) {
      // Assert the expected error or side effects
      expect(error.response.data).toEqual({ error: 'mocked error' });
      // Add more assertions as needed
    }
  });
});