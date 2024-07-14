export const SaveLocalStorage = (key, item) => {
  console.log(item);
  //conseguir elementos en localStorage
  let elementos = JSON.parse(localStorage.getItem(key));
  //comprar si es un array
  if (Array.isArray(elementos)) {
    elementos.push(item);
  } else {
    //crear array
    elementos = [item];
  }
  //guardar en el localStorage
  localStorage.setItem(key, JSON.stringify(elementos));
  //devolver objeto
  return item;
}; 