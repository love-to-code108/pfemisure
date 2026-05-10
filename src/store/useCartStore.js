import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            
            // --- NEW: Buy Now State ---
            buyNowItem: null,
            checkoutMode: "cart", // Can be "cart" or "buynow"

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

            getCartTotal: () => {
                return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
            
            getTotalItems: () => {
                return get().cart.reduce((total, item) => total + item.quantity, 0);
            },
            
            clearCart: () => set({ cart: [] }),

            // --- NEW: Buy Now Actions ---
            setBuyNowItem: (item) => set({ buyNowItem: item }),
            setCheckoutMode: (mode) => set({ checkoutMode: mode }),
            clearBuyNowItem: () => set({ buyNowItem: null })
        }),
        {
            name: 'pfemisure-cart-storage',
        }
    )
);