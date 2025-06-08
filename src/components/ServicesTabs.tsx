// src/components/ServicesTabs.tsx 
import React, { useState } from 'react';

interface TabItem {
  href: string;
  title: string;
  description: string;
  svg: string;
}

interface Tab {
  label: string;
  bgImage: string;
  bgColor: string;
  items: TabItem[];
}

interface ServicesTabsProps {
  tabs: Tab[];
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
      <div className="w-full">
        <div className="flex" role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              role="tab"
              aria-selected={activeIndex === i}
              aria-controls={`tabpanel${i}`}
              className={`
                w-1/2
                md:h-[100px] py-4 focus:outline-none
                text-white md:text-primary md:text-4xl text-sm uppercase md:normal-case
                bg-primary md:bg-transparent
                relative group overflow-hidden
                flex items-center
                ${transitionClasses}
                ${activeIndex === i ? "border-transparent" : "border-transparent"}
              `}
              onClick={() => setActiveIndex(i)}
            >
              <div
                className={`
                  h-full relative z-10 inset-y-0 w-full pt-3
                  ${transitionClasses}
                  ${i === 0 ? 'ml-0 mr-auto' : 'ml-auto mr-0'}
                  ${activeIndex !== i && (i === 0 ? 'group-hover:translate-x-8' : 'group-hover:-translate-x-8')}
                `}
              >
                {tab.label}
              </div>

              {/* Background SVG container - properly sized */}
              <div
                className={`
                  hidden md:block
                  absolute top-0 bottom-0 h-full z-0
                  ${tab.bgColor}
                  ${transitionClasses}
                  ${i === 0 ? 'left-0' : 'right-0'}
                  ${
                    activeIndex === i
                      ? 'opacity-0 w-0'  // Active tab - no background
                      : 'opacity-100 w-[85%]'  // Inactive tab - show background
                  }
                  ${activeIndex !== i && (i === 0 ? 'group-hover:w-[95%]' : 'group-hover:w-[95%]')}
                `}
              >
                {/* Animated SVG container */}
                <div className={`absolute top-0 bottom-0 h-full w-full ${i === 0 ? 'left-0' : 'right-0'} ${activeIndex !== i && (i === 0 ? 'group-hover:translate-x-4' : 'group-hover:-translate-x-4')} ${transitionClasses}`}>
                  {i === 0 ? (
                    <svg
                      className="h-full w-auto"  // Changed to h-full w-auto
                      viewBox="0 0 985 89"
                      preserveAspectRatio="none"  // Added to stretch SVG
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M31 38L0 88.95H984.5V0H100C72 0 46 14 31 38Z" fill="#8eb3db" />
                    </svg>
                  ) : (
                    <svg
                      className="h-full w-auto"  // Changed to h-full w-auto
                      viewBox="0 0 985 89"
                      preserveAspectRatio="none"  // Added to stretch SVG
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M31 38L0 88.95H984.5V0H100C72 0 46 14 31 38Z" fill="#DBD9CA" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Rest of your component remains the same */}
      <div className="container mx-auto min-h-96">
        <div className="w-full mt-5 md:mt-0 md:pt-0">
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