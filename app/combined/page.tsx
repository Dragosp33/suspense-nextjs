export const dynamic = 'force-dynamic';
import Search from '@/components/search';
import CategoriesTableWithParams from '@/components/table-with-params';
import Link from 'next/link';
import React, { Suspense } from 'react';

const Combined = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const search = await searchParams;
  const query = search?.query || '';
  const currentPage = Number(search?.page) || 1;
  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={` text-2xl`}>
          Search with params awaited both in page.tsx and in component
        </h1>
        <div>
          <p>
            {' '}
            this is the page where the search params are both awaited for in
            table component and in page.tsx
          </p>
          <p>
            {' '}
            To view the alternative, where params are awaited for in the async
            component only, go to{' '}
            <Link href={'/with-params'} style={{ display: 'inline' }}>
              {' '}
              with-params{' '}
            </Link>
          </p>{' '}
          <p>
            {' '}
            For the main version, where params are awaited in page.tsx only go
            to{' '}
            <Link href={'/'} style={{ display: 'inline' }}>
              {' '}
              home page
            </Link>{' '}
          </p>
        </div>
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search categories...' />
      </div>

      <Suspense
        key={query + currentPage}
        fallback={
          <div style={{ backgroundColor: 'blue', color: 'white' }}>
            {' '}
            LOADING.....{' '}
          </div>
        }
      >
        <CategoriesTableWithParams searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Combined;
