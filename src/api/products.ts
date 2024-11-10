const API_URL = '/api';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjksImVtYWlsIjoiMUBxcS5jb20ifSwiZXhwIjoxNzMyMjgxNjg2fQ.215rL-I9yzARvSDI4cX7Uefd0268yomKBq0yP5_4Xg4';

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
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
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
    throw new Error('Failed to fetch products: Unknown error');
  }
}

export async function addProduct(formData: FormData) {
  try {
    const response = await fetch(`${API_URL}/products/add`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_TOKEN,
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to add product: ${error.message}`);
    }
    throw new Error('Failed to add product: Unknown error');
  }
}