export const dynamic = 'force-dynamic';
import Search from '@/components/search';
import CategoriesTable from '@/components/table';
import Link from 'next/link';
import { Suspense } from 'react';

/** Add your relevant code here for the issue to reproduce */
async function categories({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const search = await searchParams;
  const query = search?.query || '';
  const currentPage = Number(search?.page) || 1;
  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={` text-2xl`}>Search with params awaited in page.tsx</h1>
        <div>
          <p>
            {' '}
            this is the page where the search params are awaited for directly in
            page.tsx
          </p>
          <p>
            {' '}
            To view the alternative, where params are awaited for in the async
            component, go to{' '}
            <Link href={'/with-params'} style={{ display: 'inline' }}>
              {' '}
              with-params{' '}
            </Link>
          </p>{' '}
          <p>
            {' '}
            For the combined version, where params are awaited both in page and
            in table, to give keys for the suspense, go to{' '}
            <Link href={'/combined'} style={{ display: 'inline' }}>
              {' '}
              combined
            </Link>{' '}
          </p>
        </div>
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search categories...' />
      </div>

      <Suspense
        key={query + currentPage}
        //key={Date.now().toString()}
        fallback={
          <div style={{ backgroundColor: 'blue', color: 'white' }}>
            {' '}
            LOADING.....{' '}
          </div>
        }
      >
        <CategoriesTable query={query} page={currentPage} />
      </Suspense>
    </div>
  );
}

export default categories;
