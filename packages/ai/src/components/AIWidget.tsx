import React from 'react';
import type { Message } from '../types';
import { ChatWindow } from './ChatWindow';

export interface AIWidgetProps {
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left';
  /** Greeting message shown when chat opens */
  greeting?: string;
  /** Whether the chat window is expanded */
  expanded?: boolean;
  /** Called when the widget toggles open/closed */
  onToggle?: (isExpanded: boolean) => void;
  /** Chat messages */
  messages?: Message[];
  /** Called when the user sends a message */
  onSend?: (message: string) => void;
  /** Whether Awa is typing */
  isTyping?: boolean;
  /** Number of unread messages (badge) */
  unreadCount?: number;
  /** Chat window title */
  title?: string;
  /** Chat window subtitle */
  subtitle?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
}

const STYLE_ID = 'df-ai-widget-keyframes';

function injectKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes dfWidgetPulse {
      0%, 100% { box-shadow: 0 4px 16px rgba(255, 123, 0, 0.3); }
      50% { box-shadow: 0 4px 24px rgba(255, 123, 0, 0.5), 0 0 0 8px rgba(255, 123, 0, 0.08); }
    }
    @keyframes dfWidgetExpand {
      from { opacity: 0; transform: scale(0.9) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes dfBadgeBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }
  `;
  document.head.appendChild(style);
}

/** Awa icon for the FAB */
function AwaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.15)" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fill="#FFFFFF"
        fontWeight="700"
        fontSize="14"
        fontFamily="Montserrat, sans-serif"
      >
        A
      </text>
    </svg>
  );
}

/** Close icon for the FAB when expanded */
function CloseArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9L12 15L18 9"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const AIWidget = React.forwardRef<HTMLDivElement, AIWidgetProps>(
  (
    {
      position = 'bottom-right',
      greeting = "Salut ! Je suis Awa, ton assistante DigiFemmes. Comment je peux t'aider ?",
      expanded: controlledExpanded,
      onToggle,
      messages: externalMessages,
      onSend: externalOnSend,
      isTyping = false,
      unreadCount = 0,
      title,
      subtitle,
      style,
      className,
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = React.useState(false);
    const [internalMessages, setInternalMessages] = React.useState<Message[]>([]);
    const [fabHovered, setFabHovered] = React.useState(false);
    const hasGreeted = React.useRef(false);

    React.useEffect(() => {
      injectKeyframes();
    }, []);

    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

    const messages = externalMessages !== undefined ? externalMessages : internalMessages;

    // Add greeting message when first expanded
    React.useEffect(() => {
      if (isExpanded && !hasGreeted.current && externalMessages === undefined) {
        hasGreeted.current = true;
        setInternalMessages((prev) => [
          ...prev,
          {
            id: 'greeting-' + Date.now(),
            content: greeting,
            sender: 'awa' as const,
            timestamp: new Date(),
          },
        ]);
      }
    }, [isExpanded, greeting, externalMessages]);

    const handleToggle = () => {
      const next = !isExpanded;
      if (controlledExpanded === undefined) setInternalExpanded(next);
      onToggle?.(next);
    };

    const handleSend = (message: string) => {
      if (externalOnSend) {
        externalOnSend(message);
      } else {
        setInternalMessages((prev) => [
          ...prev,
          {
            id: 'user-' + Date.now(),
            content: message,
            sender: 'user' as const,
            timestamp: new Date(),
          },
        ]);
      }
    };

    const isRight = position === 'bottom-right';

    const containerStyle: React.CSSProperties = {
      position: 'fixed',
      bottom: 24,
      ...(isRight ? { right: 24 } : { left: 24 }),
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: isRight ? 'flex-end' : 'flex-start',
      gap: 16,
      fontFamily:
        "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      ...style,
    };

    const chatContainerStyle: React.CSSProperties = {
      animation: 'dfWidgetExpand 0.3s ease-out',
    };

    const fabStyle: React.CSSProperties = {
      position: 'relative',
      width: 60,
      height: 60,
      borderRadius: '50%',
      border: 'none',
      background: 'linear-gradient(135deg, #FF7B00 0%, #FF9F40 100%)',
      color: '#FFFFFF',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      animation: !isExpanded ? 'dfWidgetPulse 3s ease-in-out infinite' : 'none',
      transform: fabHovered ? 'scale(1.08)' : 'scale(1)',
      boxShadow: fabHovered
        ? '0 8px 28px rgba(255, 123, 0, 0.45)'
        : '0 4px 16px rgba(255, 123, 0, 0.3)',
      flexShrink: 0,
      outline: 'none',
    };

    const badgeStyle: React.CSSProperties = {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 20,
      height: 20,
      padding: '0 6px',
      borderRadius: 10,
      backgroundColor: '#EF4444',
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'dfBadgeBounce 2s ease-in-out infinite',
      border: '2px solid #FFFFFF',
      lineHeight: 1,
    };

    return (
      <div ref={ref} className={className} style={containerStyle}>
        {/* Chat window */}
        {isExpanded && (
          <div style={chatContainerStyle}>
            <ChatWindow
              messages={messages}
              onSend={handleSend}
              title={title}
              subtitle={subtitle}
              isOpen
              isTyping={isTyping}
              onClose={handleToggle}
            />
          </div>
        )}

        {/* FAB */}
        <button
          type="button"
          style={fabStyle}
          onClick={handleToggle}
          onMouseEnter={() => setFabHovered(true)}
          onMouseLeave={() => setFabHovered(false)}
          aria-label={isExpanded ? 'Close chat' : 'Open chat with Awa'}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <CloseArrowIcon /> : <AwaIcon />}
          {!isExpanded && unreadCount > 0 && (
            <span style={badgeStyle}>{unreadCount > 99 ? '99+' : unreadCount}</span>
          )}
        </button>
      </div>
    );
  }
);

AIWidget.displayName = 'AIWidget';
