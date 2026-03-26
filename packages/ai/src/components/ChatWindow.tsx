import React from 'react';
import type { Message } from '../types';
import { ChatBubble } from './ChatBubble';
import { AIAvatar } from './AIAvatar';

export interface ChatWindowProps {
  /** Array of messages to display */
  messages: Message[];
  /** Called when the user sends a message */
  onSend: (message: string) => void;
  /** Window title */
  title?: string;
  /** Subtitle under the title */
  subtitle?: string;
  /** Whether the window is open */
  isOpen?: boolean;
  /** Called when close is requested */
  onClose?: () => void;
  /** Whether Awa is currently typing */
  isTyping?: boolean;
  /** Input placeholder */
  inputPlaceholder?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
}

/** Inline send icon */
function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Close icon */
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 2L14 14M14 2L2 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Minimize icon */
function MinimizeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 8H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const STYLE_ID = 'df-chat-window-styles';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .df-chat-messages::-webkit-scrollbar { width: 5px; }
    .df-chat-messages::-webkit-scrollbar-track { background: transparent; }
    .df-chat-messages::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 10px; }
    .df-chat-messages::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
    @keyframes dfChatSlideUp {
      from { opacity: 0; transform: translateY(16px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);
}

export const ChatWindow = React.forwardRef<HTMLDivElement, ChatWindowProps>(
  (
    {
      messages,
      onSend,
      title = 'Awa',
      subtitle = 'Assistante DigiFemmes',
      isOpen = true,
      onClose,
      isTyping = false,
      inputPlaceholder = 'Ecris ton message...',
      style,
      className,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [sendHovered, setSendHovered] = React.useState(false);

    React.useEffect(() => {
      injectStyles();
    }, []);

    // Auto-scroll to bottom when messages change
    React.useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Focus input when window opens
    React.useEffect(() => {
      if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onSend(inputValue.trim());
        setInputValue('');
      }
    };

    if (!isOpen) return null;

    const windowStyle: React.CSSProperties = {
      width: 380,
      maxWidth: '100vw',
      height: 520,
      maxHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      boxShadow:
        '0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      fontFamily:
        "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      animation: 'dfChatSlideUp 0.3s ease-out',
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 20px',
      background: 'linear-gradient(135deg, #1B2B5B 0%, #243770 100%)',
      color: '#FFFFFF',
      flexShrink: 0,
    };

    const headerInfoStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
    };

    const headerTitleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 15,
      fontWeight: 700,
      lineHeight: 1.3,
      fontFamily:
        "'Montserrat', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    };

    const headerSubtitleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 12,
      fontWeight: 400,
      opacity: 0.7,
      lineHeight: 1.4,
    };

    const headerBtnStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      padding: 0,
      border: 'none',
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.8)',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
    };

    const messagesAreaStyle: React.CSSProperties = {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 16px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      backgroundColor: '#FAFAFA',
    };

    const inputAreaStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 16px',
      borderTop: '1px solid #F3F4F6',
      backgroundColor: '#FFFFFF',
      flexShrink: 0,
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      border: '1.5px solid #E5E7EB',
      borderRadius: 12,
      padding: '10px 14px',
      fontSize: 14,
      fontFamily: 'inherit',
      outline: 'none',
      color: '#1F2937',
      backgroundColor: '#FAFAFA',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      minWidth: 0,
    };

    const sendBtnStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      padding: 0,
      border: 'none',
      borderRadius: 12,
      backgroundColor: inputValue.trim()
        ? '#FF7B00'
        : '#F3F4F6',
      color: inputValue.trim() ? '#FFFFFF' : '#9CA3AF',
      cursor: inputValue.trim() ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
      flexShrink: 0,
      transform: sendHovered && inputValue.trim() ? 'scale(1.08)' : 'scale(1)',
      boxShadow:
        sendHovered && inputValue.trim()
          ? '0 4px 12px rgba(255, 123, 0, 0.3)'
          : 'none',
    };

    return (
      <div ref={ref} className={className} style={windowStyle} role="dialog" aria-label="Chat">
        {/* Header */}
        <div style={headerStyle}>
          <AIAvatar size="sm" status={isTyping ? 'thinking' : 'online'} name="Awa" />
          <div style={headerInfoStyle}>
            <h3 style={headerTitleStyle}>{title}</h3>
            <p style={headerSubtitleStyle}>{subtitle}</p>
          </div>
          {onClose && (
            <>
              <button
                type="button"
                style={headerBtnStyle}
                onClick={onClose}
                aria-label="Minimize"
              >
                <MinimizeIcon />
              </button>
              <button
                type="button"
                style={headerBtnStyle}
                onClick={onClose}
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </>
          )}
        </div>

        {/* Messages */}
        <div className="df-chat-messages" style={messagesAreaStyle}>
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.content}
              sender={msg.sender}
              timestamp={msg.timestamp}
              avatar={msg.avatar}
            />
          ))}
          {isTyping && (
            <ChatBubble
              message=""
              sender="awa"
              isTyping
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} style={inputAreaStyle}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputPlaceholder}
            style={inputStyle}
            aria-label="Message input"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            style={sendBtnStyle}
            aria-label="Send message"
            onMouseEnter={() => setSendHovered(true)}
            onMouseLeave={() => setSendHovered(false)}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    );
  }
);

ChatWindow.displayName = 'ChatWindow';
