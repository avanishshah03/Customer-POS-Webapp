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

let menuItems: MenuItem[] = await (await fetch("/api/menuItems")).json()

export const useMenuStore = create<Store>((set) => ({
    cart: [],

    menuItems: menuItems,
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