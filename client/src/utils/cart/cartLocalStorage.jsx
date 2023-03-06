

const setCartLocalStorage = (data) => localStorage.setItem("cart", JSON.stringify(data));

export const getCartLocalStorage = () => JSON.parse(localStorage.getItem("cart") || "[]");

export const removeFromCartLocalStorage = (key) => localStorage.removeItem("cart");

export const clearLocalStorage = () => {
  localStorage.clear();
};

export default setCartLocalStorage;
