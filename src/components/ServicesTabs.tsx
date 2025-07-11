// src/components/ServicesTabs.tsx 
import React, { useState } from 'react';
import type { ServicesTab, ServicesTabItem, MediaAsset } from '../types/payload.ts';

interface ServicesTabsProps {
  tabs: ServicesTab[];
}

export default function ServicesTabs({ tabs }: ServicesTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const transitionClasses = "transition-all duration-500 ease-in-out";

  return (
    <section
      id="tabBackgroundSection"
      className="bg-cover bg-center bg-no-repeat min-h-[700px] md:h-[730px] transition-bg duration-500 overflow-hidden pt-10 md:pt-0"
      style={{ backgroundImage: `url(${tabs[activeIndex].bgImage})` }}
    >
    <div className="container mx-auto min-h-96">
        <div className="w-full mt-5 md:mt-0 md:pt-0">
            <div className="flex justify-left gap-x-4 px-4 md:px-0 md:justify-start md:gap-x-7" role="tablist">
              {tabs.map((tab, i) => (
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
                    flex items-center cursor-pointer
                    ${transitionClasses}
                  
                    bg-[${tab.bgColor || 'primary'}]

                  `}
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
              className="md:grid md:grid-cols-4 md:gap-4 md:gap-y-15 md:mt-7 text-base md:text-medium"
            >
              {tabs[activeIndex].items.map(({ href, title, description, svg }, idx) => (
                <a href={href} className="group flex items-center space-x-5 py-4 border-b border-gray-200 last:border-b-0 md:block md:space-x-0 md:py-0 md:border-b-0" key={idx}>
                  <div
                    className="flex-shrink-0 w-7 h-8 flex items-center justify-center md:block md:w-auto md:h-auto md:mb-2 pt-3 md:pt-0"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                  <h3 className="font-semibold mb-2 transition-colors duration-200 group-hover:text-white">{title}</h3>
                  <p className="hidden md:block transition-colors duration-200 group-hover:text-white">{description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}