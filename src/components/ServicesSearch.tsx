'use client';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

interface ServicesSearchProps { categories: string[]; initialSearch?: string; initialCategory?: string; }

export default function ServicesSearch({ categories, initialSearch = '', initialCategory = 'all' }: ServicesSearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category && category !== 'all') params.set('category', category);
    router.push(`/services?${params.toString()}`);
  }, [search, category, router]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
      </div>
      {categories.length > 1 && (
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="sm:w-44 px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none text-slate-700">
          {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
        </select>
      )}
      <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap">Search</button>
      {(search || category !== 'all') && (
        <button type="button" onClick={() => { setSearch(''); setCategory('all'); router.push('/services'); }}
          className="border border-slate-200 text-slate-600 hover:border-slate-300 font-semibold px-4 py-3 rounded-xl text-sm transition-colors">Clear</button>
      )}
    </form>
  );
}
