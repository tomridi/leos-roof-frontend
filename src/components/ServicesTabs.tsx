// src/components/ServicesTabs.tsx
import React, { useState, useEffect } from 'react';
import type { ServicesTab, ServicesTabItem } from '../types/payload.ts';

interface ServicesTabsProps {
  tabs: ServicesTab[];
}

export default function ServicesTabs({ tabs }: ServicesTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const transitionClasses = "transition-all duration-500 ease-in-out";

  useEffect(() => {
    if (activeIndex >= tabs.length) {
      setActiveIndex(0);
    }
  }, [tabs, activeIndex]);

  // Determine the grid column class dynamically
  const activeTabLabel = tabs[activeIndex]?.label;
  const gridColumnClass = activeTabLabel === 'Remodeling Services' ? 'md:grid-cols-5' : 'md:grid-cols-4';

  return (
    <section
      id="tabBackgroundSection"
      className={`bg-cover bg-center bg-no-repeat min-h-[700px] md:h-[800px] transition-bg duration-500 overflow-hidden pt-10 md:pt-0`}
      style={{ backgroundImage: `url(${tabs[activeIndex].bgImage})` }}
    >
      <div className="container mx-auto min-h-[750px]">
        <div className="w-full mt-5 md:mt-0 md:pt-0">
          <div className="flex justify-left gap-x-4 px-4 md:px-0 md:justify-start md:gap-x-7" role="tablist">
            {tabs.map((tab, i) => {
              // Create a modified label for mobile
              const mobileLabel = tab.label.replace(/ Services/i, ''); // Removes " Services" case-insensitively

              return (
                <button
                  key={tab.label}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-controls={`tabpanel${i}`}
                  className={`
                    w-1/2
                    md:h-[70px] p-3 md:px-10 focus:outline-none
                    md:mt-10
                    text-white md:text-4xl text-sm uppercase md:normal-case font-thin
                    relative group overflow-hidden
                    flex items-center justify-center md:justify-start cursor-pointer
                    ${transitionClasses}
                    ${activeIndex === i ? 'font-semibold text-white' : 'text-gray-300 font-normal'}
                  `}
                  style={{ backgroundColor: tab.bgColor || '#cccccc' }}
                  onClick={() => setActiveIndex(i)}
                >
                  <div className="transition-transform duration-300 group-hover:translate-x-3">
                    {/* Display mobileLabel on mobile, and original tab.label on desktop */}
                    <span className="md:hidden font-normal">{mobileLabel}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4">
            <div
              id={`tabpanel${activeIndex}`}
              role="tabpanel"
              aria-labelledby={`tab${activeIndex}`}
              className={`md:grid ${gridColumnClass} md:gap-4 md:gap-y-15 md:mt-7 text-base md:text-medium`}
            >
              {tabs[activeIndex].items.map(({ href, title, description, svg }, idx) => (
                <a href={href} className="group flex items-center space-x-5 py-4 border-b border-gray-200 last:border-b-0 md:block md:space-x-0 md:py-0 md:border-b-0" key={idx}>
                    <div className="flex-shrink-0 w-7 h-8 flex items-center justify-center md:block md:w-auto md:h-auto md:mb-2 pt-3 md:pt-0">
                      <svg
                        width="40"
                        height="40"
                        className="mb-5 stroke-current text-primary transition-colors duration-350 group-hover:text-white"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        dangerouslySetInnerHTML={{ __html: svg }}
                      />
                    </div>
                  <h3 className="font-semibold mb-1 transition-colors duration-200">{title}</h3>
                  <p className="hidden font-thin md:block transition-colors duration-200">{description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}