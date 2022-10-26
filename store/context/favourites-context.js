import { createContext, useState } from "react";

export const FavouritesContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

const FavouritesContextProvider = ({ children }) => {
  const [favouriteMealId, setFavouriteMealId] = useState([]);

  function addFavourite(id) {
    setFavouriteMealId((currentFavId) => [...currentFavId, id]);
  }

  function removeFavourite(id) {
    setFavouriteMealId((currentFavId) =>
      currentFavId.filter((mealId) => mealId !== id)
    );
  }

  const value = {
    ids: favouriteMealId,
    addFavourite,
    removeFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
