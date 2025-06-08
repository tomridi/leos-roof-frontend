// src/components/ServicesTabs.tsx

import React, { useState } from 'react';

interface TabItem {
  href: string;
  title: string;
  description: string;
  svg: string; // Or better as a React component
}

interface Tab {
  label: string;
  bgImage: string;
  items: TabItem[];
}

interface ServicesTabsProps {
  tabs: Tab[];
}

export default function ServicesTabs({ tabs }: ServicesTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section
      id="tabBackgroundSection"
      className="bg-cover bg-center bg-no-repeat h-[730px] transition-bg duration-500 overflow-hidden"
      style={{ backgroundImage: `url(${tabs[activeIndex].bgImage})` }}
    >
      <div className="container mx-auto min-h-96">
        <div className="w-full pt-8">
          <div className="flex" role="tablist">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                role="tab"
                aria-selected={activeIndex === i}
                aria-controls={`tabpanel${i}`}
                className={`w-1/2 px-4 py-2 focus:outline-none border-b-2 text-primary text-left text-3xl ${
                  activeIndex === i
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveIndex(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            <div
              id={`tabpanel${activeIndex}`}
              role="tabpanel"
              aria-labelledby={`tab${activeIndex}`}
              className="grid grid-cols-4 gap-4 gap-y-15 mt-7 text-medium"
            >
              {tabs[activeIndex].items.map(({ href, title, description, svg }, idx) => (
                <a href={href} className="group" key={idx}>
                  <div>
                    <div
                      className="block"
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                    <h3 className="font-semibold mb-2 transition-colors duration-200 group-hover:text-white">{title}</h3>
                    <p className="transition-colors duration-200 group-hover:text-white">{description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}