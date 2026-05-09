import { redirect } from 'next/navigation';

export default function RootPage() {
    // Instantly bounce anyone who visits '/' over to '/home'
    redirect('/home');
}