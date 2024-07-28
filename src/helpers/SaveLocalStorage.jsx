export const SaveLocalStorage = (key, item) => {
  let elementos = JSON.parse(localStorage.getItem(key));
  if (Array.isArray(elementos)) {
    elementos.push(item);
  } else {
    elementos = [item];
  }
  localStorage.setItem(key, JSON.stringify(elementos));
  return item;
};
