import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/siteConfig';
import ProductDetailClient from './ProductDetailClient';
import { Product } from '@/types/product';

interface Props {
  params: {
    slug: string;
  };
}

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

export async function generateStaticParams() {
  const dbProducts = await prisma.product.findMany({
    select: { slug: true },
  });
  return dbProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dbProduct = await prisma.product.findUnique({
    where: { slug: params.slug },
  });
  if (!dbProduct) return {};

  const images = JSON.parse(dbProduct.images || '[]');

  return {
    title: `${dbProduct.name} - ${siteConfig.name}`,
    description: dbProduct.shortDescription,
    openGraph: {
      title: `${dbProduct.name} | মাত্র ৳${dbProduct.price} (${siteConfig.slogan})`,
      description: dbProduct.tagline,
      images: [
        {
          url: images[0] || '/images/logo.jpg',
          width: 800,
          height: 800,
          alt: dbProduct.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const dbProduct = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!dbProduct) {
    notFound();
  }

  const product = parseProduct(dbProduct);

  // Fetch related products from same category or others
  const relatedDbProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
    },
    take: 4,
  });

  const relatedProducts = relatedDbProducts.map(parseProduct);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
