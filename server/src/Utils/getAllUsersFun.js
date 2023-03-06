import axios from "axios";

async function getAllUser() {
  try {
    const response = await axios.get("http://localhost:8000/api/user", {
      headers: {
        getAllUser: true,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export default getAllUser