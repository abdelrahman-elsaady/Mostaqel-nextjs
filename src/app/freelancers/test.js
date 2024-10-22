import Link from 'next/link';
import { FaUser, FaBriefcase } from 'react-icons/fa';
import React from 'react'

async function getFreelancer(id) {
  const res = await fetch(`${process.env.BASE_URL}/users/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch freelancer data');
  }
  return res.json();
}

export default async function FreelancerLayout({ children, params }) {
  const { id } = params;
  const freelancerData = await getFreelancer(id);
  const freelancer = freelancerData.data;

  if (!freelancer) return <div>Freelancer not found</div>;

  return (
    <div className="container-fluid" dir='rtl'>
      {/* ... existing JSX code ... */}
    </div>
  );
}