/** Sender of a chat message */
export type MessageSender = 'user' | 'awa';

/** A single chat message */
export interface Message {
  id: string;
  content: string;
  sender: MessageSender;
  timestamp?: Date;
  avatar?: string;
}

/** Configuration for the AI chat system */
export interface ChatConfig {
  /** Display name of the AI assistant */
  assistantName?: string;
  /** Greeting shown when chat opens */
  greeting?: string;
  /** Placeholder text for the input */
  inputPlaceholder?: string;
  /** Maximum message length */
  maxMessageLength?: number;
  /** Whether to show timestamps */
  showTimestamps?: boolean;
  /** Position of the chat widget */
  position?: 'bottom-right' | 'bottom-left';
}

/** Status of the AI avatar */
export type AvatarStatus = 'online' | 'offline' | 'thinking';

/** Size presets used across AI components */
export type ComponentSize = 'sm' | 'md' | 'lg';

/** Extended size presets including xl */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/** Variant for suggestion chips */
export type ChipVariant = 'outline' | 'filled';
