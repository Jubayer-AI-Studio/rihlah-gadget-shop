import { CartItem, OrderCustomerInfo, Product } from "@/types/product";
import { siteConfig } from "@/config/siteConfig";

export function generateCartWhatsAppUrl(
  customer: OrderCustomerInfo,
  cartItems: CartItem[],
  subtotal: number,
  deliveryCharge: number,
  orderNumber?: string
): string {
  const total = subtotal + deliveryCharge;
  const areaLabel =
    customer.area === "insideDhaka"
      ? `ঢাকার ভিতরে (৳${siteConfig.deliveryCharge.insideDhaka})`
      : `ঢাকার বাইরে (৳${siteConfig.deliveryCharge.outsideDhaka})`;

  const itemsText = cartItems
    .map((item, idx) => {
      const itemTotal = item.product.price * item.quantity;
      const colorText = item.selectedColor ? ` [রং: ${item.selectedColor}]` : "";

      return `${idx + 1}. *${item.product.name}*${colorText}\n   পরিমাণ: ${item.quantity} টি x ৳${item.product.price} = ৳${itemTotal}`;
    })
    .join("\n\n");

  const orderNumStr = orderNumber ? `\n🔖 *অর্ডার ট্র্যাকিং আইডি:* #${orderNumber}` : "";

  const message = `🛍️ *নতুন অর্ডার রিকোয়েস্ট — ${siteConfig.name}*${orderNumStr}
━━━━━━━━━━━━━━━━━━━━
👤 *ক্রেতার নাম:* ${customer.name}
📞 *ফোন নম্বর:* ${customer.phone}
🏠 *ডেলিভারি ঠিকানা:* ${customer.address}
🚚 *ডেলিভারি জোন:* ${areaLabel}
${customer.notes ? `📝 *বিশেষ নোট:* ${customer.notes}\n` : ""}━━━━━━━━━━━━━━━━━━━━
📦 *অর্ডারকৃত পণ্যসমূহ:*

${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 পণ্যের মোট মূল্য: ৳${subtotal}
🛵 ডেলিভারি চার্জ: ৳${deliveryCharge}
💵 *সর্বমোট প্রদেয়:* ৳${total}
━━━━━━━━━━━━━━━━━━━━
🔒 ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে চেক করে টাকা দেব)।
দয়া করে আমার অর্ডারটি কনফার্ম করে দ্রুত কুরিয়ারে পাঠিয়ে দিন। ধন্যবাদ!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function generateSingleProductWhatsAppUrl(
  product: Product,
  quantity: number = 1,
  selectedColor?: string
): string {
  const total = product.price * quantity;
  const colorText = selectedColor ? `\n🎨 *পছন্দের রং:* ${selectedColor}` : "";

  const message = `👋 *আসসালামু আলাইকুম!*
আমি *${siteConfig.name}* ওয়েবসাইট থেকে এই গ্যাজেটটি অর্ডার করতে চাই:

📌 *পণ্য:* ${product.name}
🔢 *পরিমাণ:* ${quantity} টি${colorText}
💰 *অফার মূল্য:* ৳${product.price} (আগের দাম: ৳${product.originalPrice})
💵 *মোট প্রদেয়:* ৳${total}

ক্যাশ অন ডেলিভারিতে আমার ঠিকানায় অর্ডার কনফার্ম করতে চাই। বিস্তারিত জানাবেন প্লিজ!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
