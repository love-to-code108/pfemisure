import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) => {
                const currentCart = get().cart;
                
                // Match based on productId AND size
                const existingIndex = currentCart.findIndex(
                    (item) => item.productId === product.productId && item.size === product.size
                );

                if (existingIndex !== -1) {
                    // If it exists, just update the quantity
                    const updatedCart = [...currentCart];
                    updatedCart[existingIndex].quantity += product.quantity;
                    set({ cart: updatedCart });
                } else {
                    // If new, push the entire product object
                    set({ cart: [...currentCart, product] });
                }
            },

            removeFromCart: (productId, size) => {
                set({
                    cart: get().cart.filter(
                        (item) => !(item.productId === productId && item.size === size)
                    ),
                });
            },

            updateQuantity: (productId, size, newQuantity) => {
                if (newQuantity < 1) return; 
                set({
                    cart: get().cart.map((item) =>
                        item.productId === productId && item.size === size
                            ? { ...item, quantity: newQuantity }
                            : item
                    ),
                });
            },

            // Calculates the final bill for the whole cart
            getCartTotal: () => {
                return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
            
            // Counts total physical items for the Red Notification Dot
            getTotalItems: () => {
                return get().cart.reduce((total, item) => total + item.quantity, 0);
            },
            
            // Empties the cart after a successful checkout
            clearCart: () => set({ cart: [] })
        }),
        {
            name: 'pfemisure-cart-storage', // Saves to localStorage
        }
    )
);