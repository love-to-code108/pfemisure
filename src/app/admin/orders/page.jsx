import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import OrdersFulfillmentClient from '@/My-components/admin/OrdersFulfillmentClient';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic'; // Prevent caching so you always see new orders instantly

export default async function AdminOrdersPage() {
    // Fetch all orders, newest first. Include the product details so we can show images!
    const allOrders = await prisma.order.findMany({
        orderBy: { created_at: 'desc' },
        include: {
            items: {
                include: {
                    product: true 
                }
            },
          buyer:{
            select:{
                full_name:true
            }
          }  
        },
        
    });

    console.log(allOrders);

    return <OrdersFulfillmentClient initialOrders={allOrders} />;
}