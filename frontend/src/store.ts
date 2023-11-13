import { MenuItem } from "@mui/material";
import { create } from "zustand";

interface CartEntry {
  itemId: number;
  quantity: number;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  vegan: boolean;
  glutenFree: boolean;
  size: string;
  extrasauce: boolean;
}

export interface ItemCategory {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  name: string;
}

interface Store {
  checkout: () => void;
  addCartEntry: (id: number) => void;
  incrementCartEntryQuantity: (id: number) => void;
  decrementCartEntryQuantity: (id: number) => void;
  changeItemPrice: (id: number, newPrice: number) => void;
  changeItemName: (id: number, newName: string) => void;
  changeGF: (id: number) => void;
  changeVegan: (id: number) => void;
  changeExtraSauce: (id: number) => void;
  changeSize: (id: number, sizein: string) => void;
  menuItems: MenuItem[];
  cart: CartEntry[];
  itemCategories: ItemCategory[];
}

const base = import.meta.env.PROD
  ? "https://mess-pos-backend.whitefield-0aeef37d.eastus.azurecontainerapps.io"
  : "/api";

let menuItems: MenuItem[] = await (await fetch(base + "/menuItems")).json();
let itemCategories: ItemCategory[] = await (
  await fetch(base + "/itemCategories")
).json();
export const useMenuStore = create<Store>((set) => ({
  cart: [],
  itemCategories: itemCategories,
  menuItems: menuItems,
  // TODO: talk to backend
  setMenuItems: (items: MenuItem[]) => set({ menuItems: items }),

  addMenuItem: (item: MenuItem) => {
    fetch(base + "/menuItems", {
      method: "POST",
      body: JSON.stringify({ ...item, ingredientIds: [], quantities: [] }),
    });
    set((state) => ({ menuItems: [...state.menuItems, item] }));
  },

  checkout: () => {
    set((state) => {
      // FIXME
      fetch(base + "/orders", {
        method: "POST",
        body: JSON.stringify({
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
          orderedItemIds: state.cart.map((entry) => entry.itemId),
          quantities: state.cart.map((entry) => entry.quantity),
        }),
      });
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
  changeItemPrice: (id: number, newPrice: number) => {
    return set((state) => ({
      menuItems: state.menuItems.map((item) => {
        if (item.id === id) {
          return { ...item, price: newPrice };
        }
        return item;
      }),
      cart: state.cart,
      itemCategories: state.itemCategories,
    }));
  },

  changeItemName: (id: number, newName: string) => {
    return set((state) => ({
      menuItems: state.menuItems.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName };
        }
        return item;
      }),
      cart: state.cart,
      itemCategories: state.itemCategories,
    }));
  },

  changeGF: (id: number) => {
    set((state) => ({
      menuItems: state.menuItems.map((item) => {
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

  changeVegan: (id: number) => {
    set((state) => ({
      menuItems: state.menuItems.map((item) => {
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

  changeExtraSauce: (id: number) => {
    set((state) => ({
      menuItems: state.menuItems.map((item) => {
        if (item.extrasauce === true) {
          if (item.id === id) {
            return { ...item, extrasauce: false };
          }
        } else {
          if (item.id === id) {
            return { ...item, extrasauce: true };
          }
        }
        return item;
      }),
    }));
  },
  changeSize: (id: number, sizein: string) => {
    set((state) => ({
      menuItems: state.menuItems.map((item) => {
        if (item.id === id) {
          return { ...item, size: sizein };
        }
        return item;
      }),
    }));
  },
  // checkout: () => {
  //     set(state => ({
  //         cart: [],
  //     }));
  // },
}));
