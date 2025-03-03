const categories = [
  'aaa',
  'bbb',
  'c',
  'test',
  'kakakak',
  'lalal',
  'xxxx',
  'aaaaa',
  'blabla',
  'testTWO',
];
const ITEMS_PER_PAGE = 5;
import { NextRequest } from 'next/server';

function getFilteredCategories(query: any, currentPage: any) {
  let filteredCategories = categories;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredCategories = filteredCategories.filter((category) =>
      category.toLowerCase().includes(lowerQuery)
    );
  }

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return paginatedCategories;
}

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const pageParam = searchParams.get('query') || '1';
  const currentPage = Number.parseInt(pageParam);
  const query = searchParams.get('query') || '';
  const cat = getFilteredCategories(query, currentPage);
  return Response.json({ categories: cat });
}
