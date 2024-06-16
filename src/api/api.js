// api.js
import config from '../config/config';

const fetchLatestResults = async () => {
  const url = config.API_URL_LATESTRESULTS;
  const requestBody = {
    "CompanyId": "GoldenCasket",
    "MaxDrawCountPerProduct": 1,
    "OptionalProductFilter": ["Powerball"]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest results:', error);
    throw error;
  }
};

export default fetchLatestResults;
