import React from 'react';
import { ThinkingDots } from './ThinkingDots';

export interface AISearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Called when the user submits a search */
  onSearch: (query: string) => void;
  /** Auto-suggest items */
  suggestions?: string[];
  /** Whether a search is in progress */
  isSearching?: boolean;
  /** Called when the input is cleared */
  onClear?: () => void;
  /** Called on every input change */
  onChange?: (value: string) => void;
  /** Controlled value */
  value?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
}

/** Inline SVG sparkle icon */
function SparkleIcon({ size = 18, color = '#FF7B00' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z"
        fill={color}
      />
    </svg>
  );
}

/** Inline SVG clear (X) icon */
function ClearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Inline SVG search icon */
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export const AISearchBar = React.forwardRef<HTMLDivElement, AISearchBarProps>(
  (
    {
      placeholder = 'Rechercher avec Awa...',
      onSearch,
      suggestions,
      isSearching = false,
      onClear,
      onChange,
      value: controlledValue,
      style,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [hoveredSuggestion, setHoveredSuggestion] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const setValue = (v: string) => {
      if (controlledValue === undefined) setInternalValue(v);
      onChange?.(v);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim()) {
        onSearch(value.trim());
        setShowSuggestions(false);
      }
    };

    const handleClear = () => {
      setValue('');
      onClear?.();
      inputRef.current?.focus();
    };

    const handleSuggestionClick = (suggestion: string) => {
      setValue(suggestion);
      onSearch(suggestion);
      setShowSuggestions(false);
    };

    const filteredSuggestions = suggestions?.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );

    const showDropdown =
      showSuggestions &&
      focused &&
      filteredSuggestions &&
      filteredSuggestions.length > 0 &&
      value.length > 0;

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      maxWidth: 480,
      fontFamily:
        "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      ...style,
    };

    const formStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      borderRadius: 14,
      border: `2px solid ${focused ? '#FF7B00' : '#E5E7EB'}`,
      backgroundColor: '#FFFFFF',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      boxShadow: focused
        ? '0 0 0 4px rgba(255, 123, 0, 0.1)'
        : '0 1px 3px rgba(0, 0, 0, 0.06)',
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      fontSize: 14,
      fontFamily: 'inherit',
      color: '#1F2937',
      backgroundColor: 'transparent',
      minWidth: 0,
    };

    const clearBtnStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      padding: 0,
      border: 'none',
      borderRadius: '50%',
      backgroundColor: '#F3F4F6',
      color: '#6B7280',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      flexShrink: 0,
    };

    const submitBtnStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 34,
      height: 34,
      padding: 0,
      border: 'none',
      borderRadius: 10,
      backgroundColor: '#FF7B00',
      color: '#FFFFFF',
      cursor: value.trim() ? 'pointer' : 'default',
      opacity: value.trim() ? 1 : 0.4,
      transition: 'all 0.15s ease',
      flexShrink: 0,
    };

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      border: '1px solid #E5E7EB',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      zIndex: 50,
      maxHeight: 240,
      overflowY: 'auto',
    };

    return (
      <div ref={ref} className={className} style={containerStyle}>
        <form onSubmit={handleSubmit} style={formStyle} role="search">
          <SparkleIcon size={20} />
          <input
            ref={inputRef}
            type="text"
            value={value}
            placeholder={placeholder}
            style={inputStyle}
            onChange={(e) => {
              setValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setFocused(false);
              // Delay closing to allow click events on suggestions
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            aria-label="Search"
            aria-autocomplete={suggestions ? 'list' : undefined}
          />
          {isSearching && (
            <ThinkingDots size="sm" color="#12B8DF" />
          )}
          {value && !isSearching && (
            <button
              type="button"
              style={clearBtnStyle}
              onClick={handleClear}
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          )}
          <button
            type="submit"
            style={submitBtnStyle}
            disabled={!value.trim()}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>

        {showDropdown && (
          <div style={dropdownStyle} role="listbox">
            {filteredSuggestions!.map((suggestion, i) => (
              <div
                key={`${suggestion}-${i}`}
                role="option"
                aria-selected={hoveredSuggestion === i}
                style={{
                  padding: '10px 16px',
                  fontSize: 14,
                  color: '#374151',
                  cursor: 'pointer',
                  backgroundColor:
                    hoveredSuggestion === i ? 'rgba(255, 123, 0, 0.06)' : 'transparent',
                  transition: 'background-color 0.15s ease',
                  borderBottom:
                    i < filteredSuggestions!.length - 1
                      ? '1px solid #F3F4F6'
                      : 'none',
                }}
                onMouseEnter={() => setHoveredSuggestion(i)}
                onMouseLeave={() => setHoveredSuggestion(-1)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(suggestion);
                }}
              >
                <span style={{ marginRight: 8, color: '#9CA3AF' }}>
                  <SearchIcon />
                </span>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

AISearchBar.displayName = 'AISearchBar';
