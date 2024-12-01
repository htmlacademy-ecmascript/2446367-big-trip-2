const getElementByType = (elements, type) => elements.find((element) => element.type === type);

const getElementById = (elements, itemsId) => {
  if (Array.isArray(itemsId)) {
    return elements.filter((element) => itemsId.find((id) => element.id === id));
  }

  return elements.find((element) => element.id === itemsId);
};

const capitalizeFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

export {
  getElementByType,
  getElementById,
  capitalizeFirstLetter,
};
