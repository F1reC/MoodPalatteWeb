const API_URL = '/api';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjksImVtYWlsIjoiMUBxcS5jb20ifSwiZXhwIjoxNzMyMjgxNjg2fQ.215rL-I9yzARvSDI4cX7Uefd0268yomKBq0yP5_4Xg4';

export async function fetchAddresses() {
  try {
    const response = await fetch(`${API_URL}/Address/adresses`, {
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
    
    const data: AddressResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch addresses: ${error.message}`);
    }
    throw new Error('Failed to fetch addresses: Unknown error');
  }
} 