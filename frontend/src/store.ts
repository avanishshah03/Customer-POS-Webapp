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
}

interface Store {

    checkout: () => void;
    addCartEntry: (id: number) => void;
    incrementCartEntryQuantity: (id: number) => void;
    decrementCartEntryQuantity: (id: number) => void;
    menuItems: MenuItem[];
    cart: CartEntry[];
}

export const useMenuStore = create<Store>((set) => ({
    cart: [],

    menuItems: [
        { id: 1, name: "Item A", price: 10.99, imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg" },
        { id: 2, name: "Item B", price: 6.99, imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg" },
        { id: 3, name: "Item C", price: 8.49, imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg" },
    ],
    // TODO: talk to backend
    setMenuItems: (items: MenuItem[]) => set({ menuItems: items }),

    addCartEntry: (id: number) => {
        set(state => {
            if (state.cart.findIndex(entry => entry.itemId === id) === -1) {
                return {
                    cart: [...state.cart, { itemId: id, quantity: 1 }]
                }
            } else {
                return {
                    cart: state.cart.map(entry => {
                        if (entry.itemId === id) {
                            return { ...entry, quantity: entry.quantity + 1 }
                        } else {
                            return entry
                        }
                    })
                }
            }
        })
    },
    incrementCartEntryQuantity: (id: number) => {
        set(state => (
            {
                cart: state.cart.map(entry => {
                    if (entry.itemId == id) {
                        return { ...entry, quantity: entry.quantity + 1 }
                    }
                    return entry
                }).filter(entry => entry.quantity > 0)
            }
        ))
    },
    decrementCartEntryQuantity: (id: number) => {
        set(state => (
            {
                cart: state.cart.map(entry => {
                    if (entry.itemId == id) {
                        return { ...entry, quantity: entry.quantity - 1 }
                    }
                    return entry
                }).filter(entry => entry.quantity > 0)
            }
        ))
    },
    checkout: () => {
        set(() => {
            // TODO: talk to backend
            return {
                cart: []
            }
        })
    },

}))