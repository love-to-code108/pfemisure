import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            // 1. The Cart Array
            cart: [],

            // 2. Add Item to Cart
            addToCart: (product) => {
                const currentCart = get().cart;
                // Check if this exact product AND size is already in the cart
                const existingItemIndex = currentCart.findIndex(
                    (item) => item.id === product.id && item.size === product.size
                );

                if (existingItemIndex !== -1) {
                    // If it exists, just update the quantity
                    const updatedCart = [...currentCart];
                    updatedCart[existingItemIndex].quantity += product.quantity;
                    set({ cart: updatedCart });
                } else {
                    // If it's new, add it to the array
                    set({ cart: [...currentCart, product] });
                }
            },

            // 3. Remove Item entirely
            removeFromCart: (productId, size) => {
                set({
                    cart: get().cart.filter(
                        (item) => !(item.id === productId && item.size === size)
                    ),
                });
            },

            // 4. Update Quantity (for the + / - buttons inside the cart UI)
            updateQuantity: (productId, size, newQuantity) => {
                if (newQuantity < 1) return; // Prevent 0 or negative
                set({
                    cart: get().cart.map((item) =>
                        item.id === productId && item.size === size
                            ? { ...item, quantity: newQuantity }
                            : item
                    ),
                });
            },

            // 5. Clear the Cart (Used after successful payment)
            clearCart: () => set({ cart: [] }),
            
            // 6. Helper to get total price
            getCartTotal: () => {
                return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
            
            // 7. Helper to get total items count (for the red dot on the nav bar)
            getTotalItems: () => {
                return get().cart.reduce((total, item) => total + item.quantity, 0);
            }
        }),
        {
            name: 'pfemisure-cart-storage', // The name of the key in localStorage
        }
    )
);