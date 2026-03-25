import React from 'react';

export interface ModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Called when the modal requests to close */
  onClose: () => void;
  /** Optional title shown in the header */
  title?: string;
  /** Modal body content */
  children: React.ReactNode;
  /** Width preset */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const sizeWidth: Record<NonNullable<ModalProps['size']>, string> = {
  sm: '24rem',
  md: '32rem',
  lg: '42rem',
};

export const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = 'md',
      className,
      style,
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLDialogElement>(null);
    const dialogRef = (ref as React.RefObject<HTMLDialogElement>) || innerRef;

    /* ----- Open / close via native <dialog> API ----- */
    React.useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!isOpen && dialog.open) {
        dialog.close();
      }
    }, [isOpen, dialogRef]);

    /* ----- Close on Escape (native <dialog> does this, but we sync state) --- */
    React.useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const handleCancel = (e: Event) => {
        e.preventDefault();
        onClose();
      };

      dialog.addEventListener('cancel', handleCancel);
      return () => dialog.removeEventListener('cancel', handleCancel);
    }, [onClose, dialogRef]);

    /* ----- Close on overlay click ----- */
    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      // Only close if the click target is the dialog element itself (the backdrop)
      if (e.target === dialog) {
        onClose();
      }
    };

    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--df-space-6)',
      backgroundColor: 'transparent',
      maxWidth: 'none',
      maxHeight: 'none',
      width: '100vw',
      height: '100vh',
      border: 'none',
      outline: 'none',
    };

    const panelStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: sizeWidth[size],
      maxHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--df-color-surface-default)',
      borderRadius: 'var(--df-radius-xl)',
      boxShadow: 'var(--df-shadow-lg)',
      overflow: 'hidden',
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--df-space-4) var(--df-space-6)',
      borderBottom: '1px solid var(--df-color-border-default)',
      flexShrink: 0,
    };

    const bodyStyle: React.CSSProperties = {
      padding: 'var(--df-space-6)',
      overflowY: 'auto',
      flex: 1,
      fontFamily: 'var(--df-font-body)',
      fontSize: '0.9375rem',
      lineHeight: 1.6,
      color: 'var(--df-color-text-default)',
    };

    /* Dialog::backdrop is styled via a CSS keyframes injection */
    React.useEffect(() => {
      if (typeof document === 'undefined') return;
      const id = 'df-modal-backdrop-styles';
      if (document.getElementById(id)) return;
      const styleEl = document.createElement('style');
      styleEl.id = id;
      styleEl.textContent = `
        dialog.df-modal::backdrop {
          background-color: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(4px);
        }
      `;
      document.head.appendChild(styleEl);
    }, []);

    return (
      <dialog
        ref={dialogRef}
        className={`df-modal ${className || ''}`.trim()}
        style={overlayStyle}
        onClick={handleBackdropClick}
        aria-modal="true"
        aria-label={title || 'Dialog'}
      >
        <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          {title && (
            <div style={headerStyle}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--df-font-display)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--df-color-text-default)',
                }}
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: 'var(--df-color-text-subtle)',
                  borderRadius: 'var(--df-radius-sm)',
                  transition: 'var(--df-transition-fast)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2L14 14M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Body */}
          <div style={bodyStyle}>{children}</div>
        </div>
      </dialog>
    );
  }
);

Modal.displayName = 'Modal';
