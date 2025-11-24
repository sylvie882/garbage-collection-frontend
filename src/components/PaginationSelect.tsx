'use client';

import { useRouter } from 'next/navigation';

interface PaginationSelectProps {
  currentPage: number;
  totalPages: number;
  searchParams: {
    search?: string;
    category?: string;
    page?: string;
  };
}

export default function PaginationSelect({ 
  currentPage, 
  totalPages, 
  searchParams 
}: PaginationSelectProps) {
  const router = useRouter();

  const handlePageChange = (page: string) => {
    const params = new URLSearchParams();
    
    // Add existing search params
    if (searchParams.search) {
      params.set('search', searchParams.search);
    }
    if (searchParams.category && searchParams.category !== 'all') {
      params.set('category', searchParams.category);
    }
    
    // Add the new page
    params.set('page', page);
    
    router.push(`/services?${params.toString()}`);
  };

  return (
    <select 
      className="bg-white border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
      onChange={(e) => handlePageChange(e.target.value)}
      value={currentPage}
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <option key={page} value={page}>
          {page}
        </option>
      ))}
    </select>
  );
}