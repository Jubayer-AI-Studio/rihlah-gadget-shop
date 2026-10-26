import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialProducts } from '@/data/products';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

function parseProduct(p: any): Product {
  return {
    ...p,
    images: typeof p.images === 'string' ? JSON.parse(p.images || '[]') : p.images,
    colors: typeof p.colors === 'string' ? JSON.parse(p.colors) : p.colors,
    fullDescription: typeof p.fullDescription === 'string' ? JSON.parse(p.fullDescription || '[]') : p.fullDescription,
    keyFeatures: typeof p.keyFeatures === 'string' ? JSON.parse(p.keyFeatures || '[]') : p.keyFeatures,
    specs: typeof p.specs === 'string' ? JSON.parse(p.specs || '[]') : p.specs,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let products: Product[] = [];

    // Attempt Prisma DB query first
    try {
      const where: any = {};
      if (category && category !== 'all') {
        where.category = category;
      }
      if (search && search.trim() !== '') {
        where.OR = [
          { name: { contains: search } },
          { tagline: { contains: search } },
          { shortDescription: { contains: search } },
        ];
      }

      const dbProducts = await prisma.product.findMany({
        where,
        orderBy: { createdAt: 'asc' },
      });

      if (dbProducts && dbProducts.length > 0) {
        products = dbProducts.map(parseProduct);
      }
    } catch (dbErr) {
      console.warn('Prisma DB query failed or empty, using static fallback:', dbErr);
    }

    // Fallback to static catalog if DB is cold, empty or serverless SQLite
    if (products.length === 0) {
      products = initialProducts.filter((p) => {
        const matchCategory = !category || category === 'all' || p.category === category;
        const matchSearch =
          !search ||
          search.trim() === '' ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.tagline.toLowerCase().includes(search.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
      });
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    // Even in worst case error, return initial catalog
    return NextResponse.json({
      success: true,
      count: initialProducts.length,
      products: initialProducts,
    });
  }
}
