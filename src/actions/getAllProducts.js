"use server"
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const getAllProducts = async() => {

    const allProductsArray = await prisma.product.findMany();
    return allProductsArray;
}


export default getAllProducts;