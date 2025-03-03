'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useRef } from 'react';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchRef: any = useRef(null);

  const deleteSearch = () => {
    replace(`${pathname}`);
    searchRef.current.value = '';
  };

  const handleSearch = useDebouncedCallback((term: any) => {
    console.log('this is the term: ', term);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term.trim().length > 0) {
      params.set('query', term);
      console.log('params found:::: , ', params);
      replace(`${pathname}?${params.toString()}`);
    } else {
      console.log('deleting the query...');
      replace(`${pathname}`);
    }

    console.log('path: ', pathname);
  }, 300);
  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
        placeholder={placeholder}
        ref={searchRef}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        style={{ marginBottom: 0 }}
      />

      {searchRef.current && searchRef.current.value && (
        <button type='button' onClick={deleteSearch}>
          delete
        </button>
      )}
    </div>
  );
}
