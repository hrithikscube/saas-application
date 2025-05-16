import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PrimaryButton from '@/components/common/PrimaryButton';

export default function Home() {

  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">

      <Head>
        <title>Home</title>
      </Head>

      {/* Header */}
      <header className="bg-gray-50 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">SAAS</h1>
          </Link>
          <nav className="space-x-6 hidden md:flex">
            <a href="#features" className="text-gray-600 hover:text-black">Features</a>
            <a href="#about" className="text-gray-600 hover:text-black">About</a>
          </nav>
          <PrimaryButton onClick={() => router.push('/login')} width="w-fit" label="Login" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-white">
        <h2 className="text-4xl font-bold mb-4">Smarter SaaS. Simpler Dashboard.</h2>
        <p className="text-lg text-gray-600 mb-6">
          Manage leads, generate QR codes, and build powerful profiles — all in one place.
        </p>

        <PrimaryButton width="w-fit" label="Explore Features" />

      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 lg:gap-6 gap-4">
            <FeatureCard
              title="Dashboard"
              description="Get a clear overview of your activity with real-time insights and analytics."
            />
            <FeatureCard
              title="Leads"
              description="Capture, track, and convert leads efficiently with smart filtering tools."
            />
            <FeatureCard
              title="QR Generator"
              description="Generate and manage QR codes to connect the physical and digital world."
            />
            <FeatureCard
              title="Profiles"
              description="List all profiles in one place and render them using customizable templates that load real-time dynamic data."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-20 text-center">
        <h4 className="text-3xl font-bold mb-4">Ready to get started?</h4>
        <p className="text-gray-600 mb-6">Sign up today and streamline your operations.</p>

        <PrimaryButton onClick={()=>router.push('/signup')} width="w-fit" label="Start Free Trial" />

      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between text-gray-600">
          <p>&copy; {new Date().getFullYear()} SAAS. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#contact" className="hover:underline">Support</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
