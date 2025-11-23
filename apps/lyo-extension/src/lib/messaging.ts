import { defineExtensionMessaging } from "@webext-core/messaging";

export interface ProductData {
  brand: string;
  name: string;
  price: string;
  mrp: string;
  discount: string;
  discountPercent: string;
  description: string;
  imageUrl: string;
}

interface ProtocolMap {
  openSidePanel(): void;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
