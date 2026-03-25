import React from 'react';

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

interface TabsContextValue {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tabs compound components must be used within <Tabs>');
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*  Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface TabsProps {
  /** Currently active tab id */
  activeTab: string;
  /** Called when a tab is selected */
  onChange: (tabId: string) => void;
  /** Child elements (Tabs.List, Tabs.Panel) */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface TabsTabProps {
  /** Unique tab identifier */
  tabId: string;
  /** Disable this tab */
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface TabsPanelProps {
  /** Tab id this panel belongs to */
  tabId: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, style }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={className}
      style={{
        display: 'flex',
        gap: 0,
        borderBottom: '2px solid var(--df-color-border-default)',
        ...style,
      }}
    >
      {children}
    </div>
  )
);
TabsList.displayName = 'Tabs.List';

const TabsTab = React.forwardRef<HTMLButtonElement, TabsTabProps>(
  ({ tabId, disabled = false, children, className, style }, ref) => {
    const { activeTab, onTabChange } = useTabsContext();
    const isActive = activeTab === tabId;

    const tabStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--df-space-2) var(--df-space-4)',
      fontFamily: 'var(--df-font-body)',
      fontSize: '0.875rem',
      fontWeight: isActive ? 600 : 400,
      color: isActive
        ? 'var(--df-color-brand-primary)'
        : 'var(--df-color-text-subtle)',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: `2px solid ${isActive ? 'var(--df-color-brand-primary)' : 'transparent'}`,
      marginBottom: '-2px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'var(--df-transition-fast)',
      transitionProperty: 'color, border-color',
      whiteSpace: 'nowrap',
      ...style,
    };

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={`panel-${tabId}`}
        id={`tab-${tabId}`}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        className={className}
        style={tabStyle}
        onClick={() => {
          if (!disabled) onTabChange(tabId);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) onTabChange(tabId);
          }
        }}
      >
        {children}
      </button>
    );
  }
);
TabsTab.displayName = 'Tabs.Tab';

const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ tabId, children, className, style }, ref) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === tabId;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${tabId}`}
        aria-labelledby={`tab-${tabId}`}
        tabIndex={0}
        className={className}
        style={{
          padding: 'var(--df-space-4) 0',
          outline: 'none',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);
TabsPanel.displayName = 'Tabs.Panel';

/* -------------------------------------------------------------------------- */
/*  Root                                                                       */
/* -------------------------------------------------------------------------- */

const TabsRoot: React.FC<TabsProps> = ({
  activeTab,
  onChange,
  children,
  className,
  style,
}) => {
  const ctx = React.useMemo<TabsContextValue>(
    () => ({ activeTab, onTabChange: onChange }),
    [activeTab, onChange]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={className} style={style}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};
TabsRoot.displayName = 'Tabs';

/* -------------------------------------------------------------------------- */
/*  Compound export                                                            */
/* -------------------------------------------------------------------------- */

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
