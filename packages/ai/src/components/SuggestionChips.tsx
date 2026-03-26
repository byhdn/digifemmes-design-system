import React from 'react';
import type { ChipVariant } from '../types';

export interface SuggestionChipsProps {
  /** List of suggestion strings */
  suggestions: string[];
  /** Called when a chip is selected */
  onSelect: (suggestion: string, index: number) => void;
  /** Maximum number of visible chips before "Show more" */
  maxVisible?: number;
  /** Visual variant */
  variant?: ChipVariant;
  /** Index of the currently selected chip (-1 for none) */
  selectedIndex?: number;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class */
  className?: string;
}

const STYLE_ID = 'df-suggestion-chips-styles';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .df-chip-scroll::-webkit-scrollbar { display: none; }
    .df-chip-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
}

export const SuggestionChips = React.forwardRef<HTMLDivElement, SuggestionChipsProps>(
  (
    {
      suggestions,
      onSelect,
      maxVisible,
      variant = 'outline',
      selectedIndex = -1,
      style,
      className,
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(false);
    const [hoveredIndex, setHoveredIndex] = React.useState(-1);

    React.useEffect(() => {
      injectStyles();
    }, []);

    const visibleSuggestions =
      maxVisible && !expanded
        ? suggestions.slice(0, maxVisible)
        : suggestions;
    const hasMore = maxVisible ? suggestions.length > maxVisible : false;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      alignItems: 'center',
      overflowX: 'auto',
      padding: '4px 0',
      ...style,
    };

    function chipStyle(index: number, isSelected: boolean, isHovered: boolean): React.CSSProperties {
      const isFilled = variant === 'filled';
      const active = isSelected || isHovered;

      return {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '7px 16px',
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 500,
        fontFamily:
          "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        lineHeight: 1.3,
        cursor: 'pointer',
        border: isFilled ? 'none' : '1.5px solid',
        borderColor: isFilled
          ? 'transparent'
          : active
            ? '#FF7B00'
            : '#D1D5DB',
        backgroundColor: isFilled
          ? active
            ? '#FF7B00'
            : '#F3F4F6'
          : active
            ? 'rgba(255, 123, 0, 0.08)'
            : 'transparent',
        color: isFilled
          ? active
            ? '#FFFFFF'
            : '#374151'
          : active
            ? '#FF7B00'
            : '#374151',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'scale(1.04)' : 'scale(1)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        outline: 'none',
        boxShadow: active ? '0 2px 8px rgba(255, 123, 0, 0.15)' : 'none',
      };
    }

    const showMoreStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '7px 14px',
      borderRadius: 100,
      fontSize: 13,
      fontWeight: 600,
      fontFamily:
        "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#12B8DF',
      backgroundColor: 'rgba(18, 184, 223, 0.08)',
      border: 'none',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s ease',
    };

    return (
      <div
        ref={ref}
        className={`df-chip-scroll ${className || ''}`.trim()}
        style={containerStyle}
        role="listbox"
        aria-label="Suggestions"
      >
        {visibleSuggestions.map((suggestion, i) => {
          const isSelected = selectedIndex === i;
          const isHovered = hoveredIndex === i;
          return (
            <button
              key={`${suggestion}-${i}`}
              type="button"
              role="option"
              aria-selected={isSelected}
              style={chipStyle(i, isSelected, isHovered)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(-1)}
              onClick={() => onSelect(suggestion, i)}
            >
              {suggestion}
            </button>
          );
        })}
        {hasMore && !expanded && (
          <button
            type="button"
            style={showMoreStyle}
            onClick={() => setExpanded(true)}
          >
            +{suggestions.length - (maxVisible ?? 0)} more
          </button>
        )}
        {expanded && hasMore && (
          <button
            type="button"
            style={showMoreStyle}
            onClick={() => setExpanded(false)}
          >
            Show less
          </button>
        )}
      </div>
    );
  }
);

SuggestionChips.displayName = 'SuggestionChips';
