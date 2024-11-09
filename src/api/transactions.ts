const API_URL = '/api';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjksImVtYWlsIjoiMUBxcS5jb20ifSwiZXhwIjoxNzMyMjgxNjg2fQ.215rL-I9yzARvSDI4cX7Uefd0268yomKBq0yP5_4Xg4';

export async function fetchTransactions() {
  try {
    const response = await fetch(`${API_URL}/transaction/history`, {
      method: 'GET',
      headers: {
        'Authorization': AUTH_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data: TransactionResponse = await response.json();
    return data.data.rows;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }
    throw new Error('Failed to fetch transactions: Unknown error');
  }
} 