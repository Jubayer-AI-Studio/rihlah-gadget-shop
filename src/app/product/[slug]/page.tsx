import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { initialProducts, getProductBySlug, getRelatedProducts } from '@/data/products';
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
    images: typeof p.images === 'string' ? JSON.parse(p.images || '[]') : p.images,
    colors: typeof p.colors === 'string' ? JSON.parse(p.colors) : p.colors,
    fullDescription: typeof p.fullDescription === 'string' ? JSON.parse(p.fullDescription || '[]') : p.fullDescription,
    keyFeatures: typeof p.keyFeatures === 'string' ? JSON.parse(p.keyFeatures || '[]') : p.keyFeatures,
    specs: typeof p.specs === 'string' ? JSON.parse(p.specs || '[]') : p.specs,
  };
}

export async function generateStaticParams() {
  return initialProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let product: Product | undefined = getProductBySlug(params.slug);

  if (!product) {
    try {
      const dbProduct = await prisma.product.findUnique({
        where: { slug: params.slug },
      });
      if (dbProduct) {
        product = parseProduct(dbProduct);
      }
    } catch (err) {}
  }

  if (!product) return {};

  return {
    title: `${product.name} - ${siteConfig.name}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | মাত্র ৳${product.price} (${siteConfig.slogan})`,
      description: product.tagline,
      images: [
        {
          url: product.images[0] || '/images/logo.jpg',
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  let product: Product | undefined = getProductBySlug(params.slug);

  if (!product) {
    try {
      const dbProduct = await prisma.product.findUnique({
        where: { slug: params.slug },
      });
      if (dbProduct) {
        product = parseProduct(dbProduct);
      }
    } catch (err) {}
  }

  if (!product) {
    notFound();
  }

  let relatedProducts: Product[] = getRelatedProducts(product.category, product.id, 4);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
