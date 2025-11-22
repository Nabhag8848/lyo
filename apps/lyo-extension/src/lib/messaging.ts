import { defineExtensionMessaging } from "@webext-core/messaging";

interface ProtocolMap {
  openSidePanel(): void;
}

export const { sendMessage, onMessage } =
  defineExtensionMessaging<ProtocolMap>();
