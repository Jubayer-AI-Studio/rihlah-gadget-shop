import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Product } from '@/types/product';

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

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const dbProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (!dbProduct) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: parseProduct(dbProduct),
    });
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
