import { useState, useEffect } from "react";

const QUICK_ACCESS_KEY = "quickAccessItems";
const MAX_QUICK_ACCESS_ITEMS = 10;

export const useQuickAccess = () => {
  const [quickAccessItems, setQuickAccessItems] = useState(() => {
    try {
      const items = window.localStorage.getItem(QUICK_ACCESS_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        QUICK_ACCESS_KEY,
        JSON.stringify(quickAccessItems)  // Fixed extra parenthesis here
      );
    } catch (error) {  // Added missing curly brace
      console.error(error);
    }
  }, [quickAccessItems]);

  const addQuickAccessItem = (item) => {
    setQuickAccessItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.name === item.name && i.content === item.content
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        const [existingItem] = newItems.splice(existingItemIndex, 1);
        return [existingItem, ...newItems];
      }

      let newItems = [item, ...prevItems];
      
      if (newItems.length > MAX_QUICK_ACCESS_ITEMS) {
        newItems = newItems.slice(0, MAX_QUICK_ACCESS_ITEMS);
      }

      return newItems;
    });
  };

  return [quickAccessItems, addQuickAccessItem];
};