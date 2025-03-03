import Search from '@/components/search';
import CategoriesTableWithParams from '@/components/table-with-params';
import Link from 'next/link';
import React, { Suspense } from 'react';

const WithParams = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={` text-2xl`}>
          Search Search with params awaited in component only.
        </h1>
        <div>
          <p>
            {' '}
            this is the page where the search params are awaited for in table
            component
          </p>
          <p>
            {' '}
            To view the alternative, where params are both awaited for in the
            async component and in page.tsx, go to{' '}
            <Link href={'/combined'} style={{ display: 'inline' }}>
              {' '}
              combined
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
        //key={Object.keys(searchParams)}
        key={Date.now().toString()}
        fallback={
          <div className='bg-red text-white w-[300px] h-[200px]'>
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

export default WithParams;
