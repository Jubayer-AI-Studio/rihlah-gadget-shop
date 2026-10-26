import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

function parseProduct(p: any): Product {
  return {
    ...p,
    images: JSON.parse(p.images || '[]'),
    colors: p.colors ? JSON.parse(p.colors) : undefined,
    fullDescription: JSON.parse(p.fullDescription || '[]'),
    keyFeatures: JSON.parse(p.keyFeatures || '[]'),
    specs: JSON.parse(p.specs || '[]'),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

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

    const products = dbProducts.map(parseProduct);
    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
