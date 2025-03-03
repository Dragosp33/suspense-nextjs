export default async function CategoriesTableWithParams({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const search = await searchParams;
  console.log('SEARCH OARAMS:::::::: ', search);
  const query = search?.query || '';
  const currentPage = Number(search?.page) || 1;
  const url = `http://localhost:3000/api/data?page=${currentPage}&query=${query}`;
  const response = await fetch(url, {
    cache: 'no-store',
  });
  const res = await response.json();
  const categories = res.categories;
  console.log('filtered: ', categories);
  return (
    <div>
      {categories?.map((category: any) => (
        <div key={category} className='mb-3'>
          {category}
        </div>
      ))}
    </div>
  );
}
