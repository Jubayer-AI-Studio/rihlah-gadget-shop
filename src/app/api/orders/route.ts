import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/config/siteConfig';
import { generateCartWhatsAppUrl } from '@/utils/whatsappOrder';
import { CartItem, OrderCustomerInfo } from '@/types/product';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const customer: OrderCustomerInfo = body.customer;
    const cartItems: CartItem[] = body.items;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { success: false, error: 'নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা দেওয়া বাধ্যতামূলক।' },
        { status: 400 }
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'কার্টে কোনো পণ্য যোগ করা হয়নি।' },
        { status: 400 }
      );
    }

    const deliveryCharge =
      customer.area === 'insideDhaka'
        ? siteConfig.deliveryCharge.insideDhaka
        : siteConfig.deliveryCharge.outsideDhaka;

    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const totalAmount = subtotal + deliveryCharge;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `RIHLAH-${Date.now().toString().slice(-4)}${randomSuffix}`;

    // Save order in SQLite / Prisma Database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customer.name.trim(),
        customerPhone: customer.phone.trim(),
        customerAddress: customer.address.trim(),
        deliveryArea: customer.area,
        deliveryCharge,
        subtotal,
        totalAmount,
        notes: customer.notes?.trim() || null,
        status: 'PENDING',
        items: {
          create: cartItems.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            productSlug: item.product.slug,
            productImage: item.product.images[0] || '/images/logo.jpg',
            unitPrice: item.product.price,
            quantity: item.quantity,
            selectedColor: item.selectedColor || null,
            totalPrice: item.product.price * item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    const whatsappUrl = generateCartWhatsAppUrl(
      customer,
      cartItems,
      subtotal,
      deliveryCharge,
      orderNumber
    );

    return NextResponse.json({
      success: true,
      order,
      whatsappUrl,
      message: 'অর্ডারটি ডেটাবেজে সফলভাবে সংরক্ষিত হয়েছে।',
    });
  } catch (error: any) {
    console.error('Error creating order in DB:', error);
    return NextResponse.json(
      { success: false, error: 'অর্ডার সংরক্ষণ করতে সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
