import { MenuItem } from "@mui/material";
import { create } from "zustand";
import axios, {
  handleErrors,
  handleErrorsNoRedirect,
} from "./config/axiosConfig";

interface CartEntry {
  itemId: number;
  quantity: number;
}

export interface MenuItem {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  vegan: boolean;
  glutenFree: boolean;
  size: string;
  extrasauce: boolean;
  ingredients: Ingredient[];
}

export interface ItemCategory {
  id?: number;
  name: string;
}

export interface Order {
  id?: number;
  price: number;
  time: string;
  userId: number;
  status: string;
  items: Map<number, number>;
}

export interface Ingredient {
  id?: number;
  name: string;
  stock: number;
  restock: number;
  amountOrdered: number;
  price: number;
  glutenFree: boolean;
  vegan: boolean;
}

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

interface Store {
  checkout: () => void;
  addCartEntry: (id: number) => void;
  incrementCartEntryQuantity: (id: number) => void;
  decrementCartEntryQuantity: (id: number) => void;
  changeItem: (id: number, newItem: MenuItem) => void;
  deleteMenuItem: (id: number) => void;
  setIngredients: (ingredients: Ingredient[]) => void;
  changeIngredient: (id: number, newIngredient: Ingredient) => void;
  deleteIngredient: (id: number) => void;
  addMenuItem: (item: MenuItem) => void;
  addIngredient: (ingredient: Ingredient) => void;
  menuItems: MenuItem[];
  cart: CartEntry[];
  itemCategories: ItemCategory[];
  ingredients: Ingredient[];
}

let menuItemsResponse: Promise<MenuItem[]> = axios
  .get("/menuItems")
  .then((res) => res.data, handleErrorsNoRedirect);
let menuItems: MenuItem[] = await menuItemsResponse;
let itemCategoriesPromise: Promise<ItemCategory[]> = axios
  .get("/itemCategories")
  .then((res) => res.data, handleErrorsNoRedirect);
let itemCategories: ItemCategory[] = await itemCategoriesPromise;
let ingredientsPromise: Promise<Ingredient[]> = axios
  .get("/ingredients")
  .then((res) => res.data, handleErrorsNoRedirect);
let ingredients: Ingredient[] = await ingredientsPromise;
console.log("ingredients", ingredients);

export const useMenuStore = create<Store>((set) => ({
  cart: [],
  itemCategories: itemCategories,
  menuItems: menuItems,
  ingredients: ingredients,
  setIngredients: (ingredients: Ingredient[]) => set({ ingredients }),
  setMenuItems: (items: MenuItem[]) => set({ menuItems: items }),

  addMenuItem: (item: MenuItem) => {
    axios.post("/menuItems", {
      ...item,
      ingredientIds: [],
      quantities: [],
    });
    set((state) => ({ menuItems: [...state.menuItems, item] }));
  },

  checkout: () => {
    set((state) => {
      let items: any = {};
      state.cart.map((entry) => {
        items[entry.itemId] = entry.quantity;
      });
      axios
        .post("/orders", {
          price: state.cart.reduce((acc, entry) => {
            const item = state.menuItems.find(
              (item) => item.id === entry.itemId
            );
            if (item) {
              return acc + item.price * entry.quantity;
            } else {
              return acc;
            }
          }, 0),
          time: new Date().toISOString(),
          userId: 0, // TODO: SETUP USER SYSTEM, IF IT IS JUST THE CUSTOMER THEN IT IS 0
          items,
        })
        .then((res) => {
          console.log(res);
        }, handleErrors);
      return {
        cart: [],
      };
    });
  },

  addCartEntry: (id: number) => {
    set((state) => {
      if (state.cart.findIndex((entry) => entry.itemId === id) === -1) {
        return {
          cart: [...state.cart, { itemId: id, quantity: 1 }],
        };
      } else {
        return {
          cart: state.cart.map((entry) => {
            if (entry.itemId === id) {
              return { ...entry, quantity: entry.quantity + 1 };
            } else {
              return entry;
            }
          }),
        };
      }
    });
  },
  incrementCartEntryQuantity: (id: number) => {
    set((state) => ({
      cart: state.cart
        .map((entry) => {
          if (entry.itemId == id) {
            return { ...entry, quantity: entry.quantity + 1 };
          }
          return entry;
        })
        .filter((entry) => entry.quantity > 0),
    }));
  },
  decrementCartEntryQuantity: (id: number) => {
    set((state) => ({
      cart: state.cart
        .map((entry) => {
          if (entry.itemId == id) {
            return { ...entry, quantity: entry.quantity - 1 };
          }
          return entry;
        })
        .filter((entry) => entry.quantity > 0),
    }));
  },
  changeItem: (id: number, newItem: MenuItem) => {
    axios.post("/menuItems", {
      ...newItem,
      id,
    });
    return set((state) => ({
      menuItems: state.menuItems.map((item) => {
        if (item.id === id) {
          return { ...newItem, id };
        }
        return item;
      }),
      cart: state.cart,
      itemCategories: state.itemCategories,
    }));
  },

  deleteMenuItem: (id: number) => {
    axios.delete("/menuItems", { params: { id } });
    set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== id),
    }));
  },

  addIngredient: (ingredient: Ingredient) => {
    axios.post("/ingredients", {
      ...ingredient,
    });
    set((state) => ({ ingredients: [...state.ingredients, ingredient] }));
  },

  changeIngredient: (id: number, newIngredient: Ingredient) => {
    axios.post("/ingredients", {
      ...newIngredient,
      id,
    });
    return set((state) => ({
      ingredients: state.ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          return { ...newIngredient, id };
        }
        return ingredient;
      }),
      cart: state.cart,
      itemCategories: state.itemCategories,
    }));
  },

  deleteIngredient: (id: number) => {
    axios.delete("/ingredients", { params: { id } });
    set((state) => ({
      ingredients: state.ingredients.filter((item) => item.id !== id),
    }));
  },
}));
