"use server"

import { getShiprocketToken } from "@/lib/shiprocket";

export async function calculateShippingRate(deliveryPincode, weight = 0.5) {
    try {
        // 1. Authenticate with the new Shiprocket engine
        const auth = await getShiprocketToken();
        if (!auth.success) return { success: false, error: "Shipping engine offline." };

        const pickupPincode = process.env.NEXT_PUBLIC_ORIGIN_PINCODE;

        // 2. Ask Shiprocket's Serviceability API for the price
        // cod=0 means we are assuming prepaid via Razorpay
        const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickupPincode}&delivery_postcode=${deliveryPincode}&weight=${weight}&cod=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            }
        });

        const data = await response.json();

        // 3. Find the cheapest available courier
        if (data.status === 200 && data.data && data.data.available_courier_companies.length > 0) {
            const couriers = data.data.available_courier_companies;
            
            // Sort to find the absolute cheapest rate
            const cheapestCourier = couriers.reduce((prev, curr) => prev.rate < curr.rate ? prev : curr);
            
            return { 
                success: true, 
                rate: cheapestCourier.rate,
                courierName: cheapestCourier.courier_name 
            };
        } else {
            return { success: false, error: "Delivery not available for this PIN code." };
        }
    } catch (error) {
        console.error("Shipping Calculation Error:", error);
        return { success: false, error: "Failed to calculate live shipping." };
    }
}