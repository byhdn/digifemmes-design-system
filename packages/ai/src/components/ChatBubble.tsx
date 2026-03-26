import React from 'react';
import type { MessageSender } from '../types';
import { ThinkingDots } from './ThinkingDots';

export interface ChatBubbleProps {
  /** Message text content */
  message: string;
  /** Who sent the message */
  sender: MessageSender;
  /** Optional timestamp */
  timestamp?: Date;
  /** Optional avatar URL */
  avatar?: string;
  /** Show typing animation instead of message content */
  isTyping?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ message, sender, timestamp, avatar, isTyping = false, style, className }, ref) => {
    const isAwa = sender === 'awa';

    const rowStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: isAwa ? 'row' : 'row-reverse',
      alignItems: 'flex-end',
      gap: 8,
      maxWidth: '100%',
      marginBottom: 4,
      ...style,
    };

    const avatarStyle: React.CSSProperties = {
      width: 30,
      height: 30,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 700,
      color: '#FFFFFF',
      background: isAwa
        ? 'linear-gradient(135deg, #1B2B5B 0%, #12B8DF 100%)'
        : 'linear-gradient(135deg, #FF7B00 0%, #FFB366 100%)',
      userSelect: 'none',
      ...(avatar
        ? { backgroundImage: `url(${avatar})`, backgroundSize: 'cover' }
        : {}),
    };

    const bubbleStyle: React.CSSProperties = {
      maxWidth: '80%',
      padding: '10px 16px',
      borderRadius: isAwa ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
      background: isAwa
        ? 'linear-gradient(135deg, #1B2B5B 0%, #1d3a7a 100%)'
        : '#F3F4F6',
      color: isAwa ? '#FFFFFF' : '#1F2937',
      fontFamily:
        "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: 14,
      lineHeight: 1.55,
      wordBreak: 'break-word',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      position: 'relative',
    };

    const timeStyle: React.CSSProperties = {
      fontSize: 11,
      color: isAwa ? 'rgba(255,255,255,0.55)' : '#9CA3AF',
      marginTop: 4,
      textAlign: isAwa ? 'left' : 'right',
      fontFamily:
        "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    };

    return (
      <div ref={ref} className={className} style={rowStyle}>
        <div style={avatarStyle} aria-hidden="true">
          {!avatar && (isAwa ? 'A' : 'U')}
        </div>
        <div>
          <div style={bubbleStyle}>
            {isTyping ? (
              <ThinkingDots size="sm" color={isAwa ? '#FFFFFF' : '#12B8DF'} />
            ) : (
              message
            )}
          </div>
          {timestamp && !isTyping && (
            <div style={timeStyle}>{formatTime(timestamp)}</div>
          )}
        </div>
      </div>
    );
  }
);

ChatBubble.displayName = 'ChatBubble';
