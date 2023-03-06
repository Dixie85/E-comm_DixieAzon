import axios from "axios";

async function getAllStores() {
  try {
    const response = await axios.get("http://localhost:8000/api/store", {
      headers: {
        getAllStores: true,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error, 'getAllStoresAXIOS');
  }
}

export default getAllStores