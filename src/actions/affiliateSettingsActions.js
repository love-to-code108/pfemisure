"use server"

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// --- GLOBAL SETTINGS ---

export async function getGlobalSettings() {
    try {
        let settings = await prisma.globalSettings.findUnique({
            where: { id: 1 }
        });

        // If it doesn't exist yet, create the default row
        if (!settings) {
            settings = await prisma.globalSettings.create({
                data: {
                    id: 1,
                    globalDiscountPercent: 5.0,
                    globalEarningPercent: 10.0
                }
            });
        }

        return { success: true, settings };
    } catch (error) {
        console.error("Error fetching global settings:", error);
        return { success: false, error: "Failed to fetch settings." };
    }
}

export async function updateGlobalSettings(discountPercent, earningPercent) {
    try {
        const updated = await prisma.globalSettings.upsert({
            where: { id: 1 },
            update: {
                globalDiscountPercent: parseFloat(discountPercent),
                globalEarningPercent: parseFloat(earningPercent)
            },
            create: {
                id: 1,
                globalDiscountPercent: parseFloat(discountPercent),
                globalEarningPercent: parseFloat(earningPercent)
            }
        });

        return { success: true, settings: updated };
    } catch (error) {
        console.error("Error updating global settings:", error);
        return { success: false, error: "Failed to update global settings." };
    }
}

// --- VIP INFLUENCER SETTINGS ---

export async function getAffiliateUsers() {
    try {
        // Fetch users who have an affiliate code
        const users = await prisma.profile.findMany({
            where: {
                affiliate_code: { not: null }
            },
            select: {
                id: true,
                full_name: true,
                email: true,
                affiliate_code: true,
                custom_discount_percent: true,
                custom_earning_percent: true
            },
            orderBy: {
                full_name: 'asc'
            }
        });

        return { success: true, users };
    } catch (error) {
        console.error("Error fetching affiliate users:", error);
        return { success: false, error: "Failed to fetch users." };
    }
}

export async function updateVipRates(userId, discountPercent, earningPercent) {
    try {
        // Convert to float or null (if they clear the input, it reverts to global)
        const customDiscount = discountPercent !== "" && discountPercent !== null ? parseFloat(discountPercent) : null;
        const customEarning = earningPercent !== "" && earningPercent !== null ? parseFloat(earningPercent) : null;

        await prisma.profile.update({
            where: { id: userId },
            data: {
                custom_discount_percent: customDiscount,
                custom_earning_percent: customEarning
            }
        });

        return { success: true, message: "VIP rates updated successfully!" };
    } catch (error) {
        console.error("Error updating VIP rates:", error);
        return { success: false, error: "Failed to update VIP rates." };
    }
}