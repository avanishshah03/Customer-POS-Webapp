import { MenuItem } from "@mui/material";
import { create } from "zustand";
import { serverUrl } from "./config/constant";
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
  amount: number;
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
  changeIngredientName: (id: number, newName: string) => void;
  changeIngredientStock: (id: number, newStock: number) => void;
  changeIngredientRestock: (id: number, newRestock: number) => void;
  changeAmountOrdered: (id: number, newAmountOrdered: number) => void;
  changeIngredientPrice: (id: number, newPrice: number) => void;
  changeIngredientGF: (id: number) => void;
  changeIngredientVegan: (id: number) => void;
  deleteIngredient: (id: number) => void;
  addMenuItem: (item: MenuItem) => void;
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

  // deleteMenuItem: (id: number) => {
  //     fetch(base + "/menuItems/" + id, {
  //         method: "DELETE",
  //     })
  //         .then(response => {
  //             if (!response.ok) {
  //                 throw new Error("HTTP error " + response.status);
  //             }
  //             set((state) => ({
  //                 menuItems: state.menuItems.filter((item) => item.id !== id),
  //             }));
  //         })
  //         .catch(error => {
  //             console.error("Failed to delete menu item: ", error);
  //         });
  // },

  changeIngredientName: (id: number, newName: string) => {
    return set((state) => ({
      ingredients: state.ingredients.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName };
        }
        return item;
      }),
    }));
  },
  changeIngredientStock: (id: number, newStock: number) => {
    return set((state) => ({
      ingredients: state.ingredients.map((item) => {
        if (item.id === id) {
          return { ...item, stock: newStock };
        }
        return item;
      }),
    }));
  },
  changeIngredientRestock: (id: number, newRestock: number) => {
    return set((state) => ({
      ingredients: state.ingredients.map((item) => {
        if (item.id === id) {
          return { ...item, restock: newRestock };
        }
        return item;
      }),
    }));
  },
  changeAmountOrdered: (id: number, newAmountOrdered: number) => {
    return set((state) => ({
      ingredients: state.ingredients.map((item) => {
        if (item.id === id) {
          return { ...item, amountOrdered: newAmountOrdered };
        }
        return item;
      }),
    }));
  },
  changeIngredientPrice: (id: number, newPrice: number) => {
    return set((state) => ({
      ingredients: state.ingredients.map((item) => {
        if (item.id === id) {
          return { ...item, price: newPrice };
        }
        return item;
      }),
    }));
  },
  changeIngredientGF: (id: number) => {
    set((state) => ({
      ingredients: state.ingredients.map((item) => {
        if (item.glutenFree === true) {
          if (item.id === id) {
            return { ...item, glutenFree: false };
          }
        } else {
          if (item.id === id) {
            return { ...item, glutenFree: true };
          }
        }
        return item;
      }),
    }));
  },
  changeIngredientVegan: (id: number) => {
    set((state) => ({
      ingredients: state.ingredients.map((item) => {
        if (item.vegan === true) {
          if (item.id === id) {
            return { ...item, vegan: false };
          }
        } else {
          if (item.id === id) {
            return { ...item, vegan: true };
          }
        }
        return item;
      }),
    }));
  },
  deleteIngredient: (id: number) => {
    set((state) => ({
      ingredients: state.ingredients.filter((item) => item.id !== id),
    }));
  },
}));
