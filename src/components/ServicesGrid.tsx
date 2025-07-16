// src/components/ServicesGrid.tsx
import 'swiper/css';
import 'swiper/css/pagination';

import type {ServicesTab, ServicesTabItem } from '../types/payload.ts';

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


// Import the helper function
import { parseSvgString } from '../utils/svg.ts'; // Adjust path if you put it in a different file

interface ServicesGridProps {
  tabs: ServicesTab[];
}

export default function ServicesGrid({ tabs }: ServicesGridProps) {
  const [activeTabLabel, setActiveTabLabel] = useState<string>(
    tabs.length > 0 ? tabs[0].label : ""
  );

  useEffect(() => {
    if (tabs.length > 0 && !tabs.some(tab => tab.label === activeTabLabel)) {
      setActiveTabLabel(tabs[0].label);
    } else if (tabs.length === 0) {
      setActiveTabLabel("");
    }
  }, [tabs, activeTabLabel]);

  const activeTabData = tabs.find(
    (tab) => tab.label === activeTabLabel
  );

  const tabClasses = (tabLabel: string) =>
    `w-1/2 py-2 text-primary cursor-pointer text-left text-xl lg:text-4xl flex items-center space-x-5 flex justify-center md:justify-start ${
      activeTabLabel === tabLabel
        ? ""
        : "border-transparent text-gray-500"
    }`;

  const renderServiceRows = (services: ServicesTabItem[]) => {
    if (!services || services.length === 0) {
      return <p className="text-center text-gray-600 py-10">No services available for this category.</p>;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      return (
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="px-4 bg-white"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <a href={service.href} className="block w-full h-full">
                <div className="bg-white p-4">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full min-h-[265px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <svg
                        className="absolute top-3 right-5 w-6 h-6 text-white transition-colors duration-200"
                        viewBox="0 0 35 31"
                        fill="currentColor"
                      >
                        <path d="M0 31V0L35 15.4967" fill="currentColor" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="text-gray-700 text-center mb-7">{service.description}</p>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    return Array.from({ length: Math.ceil(services.length / 2) }).map((_, rowIndex) => (
      <div key={rowIndex} className={`w-full ${rowIndex % 2 === 0 ? "bg-white" : "bg-light-gray"}`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.slice(rowIndex * 2, rowIndex * 2 + 2).map((service, index) => {
              // Parse the SVG string to get attributes and inner HTML
              // We'll use innerHTML here, and hardcode attributes for the outer SVG tag
              const paths = service.svg;

              return (
                <div key={index} className="flex gap-8 items-start min-h-[200px] py-8">
                  <a href={service.href} className="flex-1">
                    <div className="flex flex-col justify-center group">
                      {/* Hardcoded SVG attributes, dynamic innerHTML */}
                      <svg
                        width="34" // Hardcoded width
                        height="34" // Hardcoded height
                        className="mb-2 stroke-current text-primary transition-colors duration-350 group-hover:text-background"
                        viewBox="0 0 36 36" // Hardcoded viewBox
                        fill="none" // Hardcoded fill
                        xmlns="http://www.w3.org/2000/svg"
                        dangerouslySetInnerHTML={{ __html: paths }} // Dynamic inner paths
                      />


                      <h3 className="font-semibold md:text-lg mb-1 transition-colors duration-200 group-hover:text-background">
                        {service.title}
                      </h3>
                      <p className="md:text-lg font-thin transition-colors duration-200 group-hover:text-background">
                        {service.description}
                      </p>
                    </div>
                  </a>
                  <a href={service.href} className="relative flex-1 ">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-[190px] h-[170px] object-cover transition-transform duration-200 hover:scale-105"
                    />
                    <svg
                      className="absolute top-3 left-38 w-6 h-6 text-white transition-colors duration-200"
                      viewBox="0 0 35 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 31V0L35 15.4967" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="bg-gray-light">
      <div className="container mx-auto mb-5 md:mb-15 px-4 md:px-0 py-4 md:py-0">
        <div className="w-full">
          <div className="flex" role="tablist">
            {tabs.map((tab) => {
              // Create a modified label for mobile
              const mobileLabel = tab.label.replace(/ Services/i, ''); // Removes " Services" case-insensitively

              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTabLabel(tab.label)}
                  className={tabClasses(tab.label)}
                  role="tab"
                  aria-selected={activeTabLabel === tab.label}
                  aria-controls={`tabpanel-${tab.label.replace(/\s+/g, '-')}`}
                >
                  <span className="md:hidden">{mobileLabel}</span>
                  <span className="hidden md:inline">{tab.label}</span>

                  <svg className='md:mt-2 w-4 md:w-5 md:h-5' viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1191_485)">
                      <path d="M0 -1.04907e-06L24 0L12.0026 22" fill="white"/>
                    </g>
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activeTabData && (
        <>
          <div
            key={activeTabData.label}
            id={`tabpanel-${activeTabData.label.replace(/\s+/g, '-')}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTabData.label.replace(/\s+/g, '-')}`}
          >
            {/* The active tab's label displayed below the buttons should also be responsive */}
            <div
              className="text-center text-white p-4 uppercase lg:text-2xl tracking-[0.8em]"
              style={{ backgroundColor: activeTabData.bgColor }}
            >
              <span className="md:hidden">{activeTabData.label.replace(/ Services/i, '')}</span>
              <span className="hidden md:inline">{activeTabData.label}</span>
            </div>
            <div
              className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {renderServiceRows(activeTabData.items)}
            </div>
          </div>
        </>
      )}
    </section>
  );
}