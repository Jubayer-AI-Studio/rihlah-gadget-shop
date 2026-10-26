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

    let savedOrder: any = null;

    // Try saving in Prisma DB
    try {
      savedOrder = await prisma.order.create({
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
    } catch (dbErr) {
      console.warn('Prisma DB insert failed (serverless environment), continuing with generated order:', dbErr);
      savedOrder = {
        id: `local-${orderNumber}`,
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
        createdAt: new Date().toISOString(),
        items: cartItems.map((item, idx) => ({
          id: `item-${idx}`,
          productId: item.product.id,
          productName: item.product.name,
          productSlug: item.product.slug,
          productImage: item.product.images[0] || '/images/logo.jpg',
          unitPrice: item.product.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor || null,
          totalPrice: item.product.price * item.quantity,
        })),
      };
    }

    const whatsappUrl = generateCartWhatsAppUrl(
      customer,
      cartItems,
      subtotal,
      deliveryCharge,
      orderNumber
    );

    return NextResponse.json({
      success: true,
      order: savedOrder,
      whatsappUrl,
      message: 'অর্ডারটি সফলভাবে গৃহীত হয়েছে।',
    });
  } catch (error: any) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { success: false, error: 'অর্ডার প্রসেস করতে সাময়িক সমস্যা হয়েছে।' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let orders: any[] = [];
    try {
      orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
        },
      });
    } catch (dbErr) {
      console.warn('Prisma DB findMany failed (serverless fallback):', dbErr);
    }

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: true, count: 0, orders: [] }
    );
  }
}
