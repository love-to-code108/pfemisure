
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { IndianRupee, Package, Clock, TrendingUp } from "lucide-react";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });




export const dynamic = 'force-dynamic';



export default async function AdminDashboard() {
    // Fetch some quick stats for the overview
    const [totalOrders, pendingOrders, totalSales] = await Promise.all([
        prisma.order.count({where: {razorpay_payment_id : {
            not:null
        }} } ),
        prisma.order.count({ where: { payment_status: "PENDING" } }),
        prisma.order.aggregate({
            // ADD "DELIVERED" HERE:
            where: { payment_status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } }, 
            _sum: { total_amount: true }
        })
    ]);

    const stats = [
        { name: "Total Revenue", value: `₹${(totalSales._sum.total_amount || 0).toFixed(0)}`, icon: <IndianRupee className="w-6 h-6 text-green-600" />, bg: "bg-green-50" },
        { name: "Total Orders", value: totalOrders, icon: <Package className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50" },
        
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="mt-2 text-gray-500">Welcome to the Pfemisure Command Center.</p>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-4 gap-6 mt-8">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            
            
        </div>
    );
}