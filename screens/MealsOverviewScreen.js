import { useLayoutEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/mealsList/MealItem";
import MealsList from "../components/mealsList/MealsList";
import { MEALS, CATEGORIES } from "../data/dummy-data";
//import { useRoute } from "@react-navigation/native"

const MealsOverviewScreen = ({ route, navigation }) => {
  //const route = useRoute()
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return (
    <MealsList items={displayedMeals} />
  );
};

export default MealsOverviewScreen;

