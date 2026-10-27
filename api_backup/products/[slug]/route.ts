import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getProductBySlug } from '@/data/products';
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

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    try {
      const dbProduct = await prisma.product.findUnique({
        where: { slug },
      });

      if (dbProduct) {
        return NextResponse.json({
          success: true,
          product: parseProduct(dbProduct),
        });
      }
    } catch (dbErr) {
      console.warn('Prisma DB query failed, using static fallback:', dbErr);
    }

    // Static fallback
    const fallbackProduct = getProductBySlug(slug);
    if (fallbackProduct) {
      return NextResponse.json({
        success: true,
        product: fallbackProduct,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
