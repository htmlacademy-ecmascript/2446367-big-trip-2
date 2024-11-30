// получение случайного элемента массива
const getRandomArrayElements = (items) => items[Math.floor(Math.random() * items.length)];

const getElementByType = (elements, type) => elements.find((element) => element.type === type);

const getElementById = (elements, itemsId) => {
  if (Array.isArray(itemsId)) {
    return elements.filter((element) => itemsId.find((id) => element.id === id));
  }

  return elements.find((element) => element.id === itemsId);
};

const randomBoolean = () => Math.random() < 0.5;

const capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

export {
  getRandomArrayElements,
  getElementByType,
  getElementById,
  randomBoolean,
  capitalizeFirstLetter,
};
