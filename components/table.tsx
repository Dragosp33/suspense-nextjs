export default async function CategoriesTable({
  query,
  page,
}: {
  query: string;
  page: Number;
}) {
  const domain =
    process.env.NODE_ENV === 'production'
      ? process.env.DOMAIN
      : 'http://localhost:3000';
  const url = `${domain}/api/data?page=${page}&query=${query}`;
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
