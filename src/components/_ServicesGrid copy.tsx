// src/components/ServiceGrid.tsx
import 'swiper/css';
import 'swiper/css/pagination';

import React, { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServicesTabsProps {
  tab1Label?: string;
  tab2Label?: string;
}

const servicesRoofing: ServiceItem[] = [
  {
    title: "Residential Roofing",
    description: "Protect your home with Summit County–tested roofs built to last.",
    icon: "/images/icon-cloud-lighting.svg",
    image: "/images/services-corevalues-bg.webp",
  },
  {
    title: "Commercial Roofing",
    description: "Secure your business with durable, low-maintenance roofs for harsh mountain conditions.",
    icon: "/images/icon-codepen.svg",
    image: "/images/location-placeholder.webp",
  },
  {
    title: "Residential Roofing",
    description: "Protect your home with Summit County–tested roofs built to last.",
    icon: "/images/icon-cloud-lighting.svg",
    image: "/images/services-corevalues-bg.webp",
  },
  {
    title: "Commercial Roofing",
    description: "Secure your business with durable, low-maintenance roofs for harsh mountain conditions.",
    icon: "/images/icon-codepen.svg",
    image: "/images/location-placeholder.webp",
  },
];

const servicesRemodeling: ServiceItem[] = [
  {
    title: "Residential Roofing",
    description: "Protect your home with Summit County tested roofs built to last.",
    icon: "/images/icon-cloud-lighting.svg",
    image: "/images/services-corevalues-bg.webp",
  },
  {
    title: "Commercial Roofing",
    description: "Secure your business with durable, low-maintenance roofs for harsh mountain conditions.",
    icon: "/images/icon-codepen.svg",
    image: "/images/location-placeholder.webp",
  },
  {
    title: "Residential Roofing",
    description: "Protect your home with Summit County tested roofs built to last.",
    icon: "/images/icon-cloud-lighting.svg",
    image: "/images/services-corevalues-bg.webp",
  },
  {
    title: "Commercial Roofing",
    description: "Secure your business with durable, low-maintenance roofs for harsh mountain conditions.",
    icon: "/images/icon-codepen.svg",
    image: "/images/location-placeholder.webp",
  },
];

export default function ServicesTabs({
  tab1Label = "Tab 1",
  tab2Label = "Tab 2",
}: ServicesTabsProps) {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");

  const tabClasses = (isActive: boolean) =>
    `w-1/2 py-2 text-primary cursor-pointer text-left text-base lg:text-4xl flex items-center space-x-5 ${
      isActive
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500"
    }`;

  const renderServiceRows = (services: ServiceItem[]) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      if (isMobile) {
        return (
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="px-4"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        );
      }


    return Array.from({ length: Math.ceil(services.length / 2) }).map((_, rowIndex) => (
      <div key={rowIndex} className={`w-full ${rowIndex % 2 === 0 ? "bg-white" : "bg-light-gray"}`}>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.slice(rowIndex * 2, rowIndex * 2 + 2).map((service, index) => (
            <div key={index} className="flex gap-8 items-start min-h-[200px] py-4">
              <a href="/service-individual/" className="flex-1">
                <div className="flex flex-col justify-center group">
                  <img src={service.icon} className="w-8 h-auto mb-5" alt="" />
                  <h3 className="font-semibold md:text-lg mb-2 transition-colors duration-200 group-hover:text-background">
                    {service.title}
                  </h3>
                  <p className="md:text-lg transition-colors duration-200 group-hover:text-background"> 
                    {service.description}
                  </p>
                </div>
              </a>
              <a href="/service-individual/" className="relative flex-1 ">
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
            ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="bg-gray-light">
      <div className="container mx-auto mb-5 md:mb-20 px-4 md:px-0 py-4 md:py-0">
        <div className="w-full">
          <div className="flex" role="tablist">
            <button
              onClick={() => setActiveTab("tab1")}
              className={tabClasses(activeTab === "tab1")}
              role="tab"
              aria-selected={activeTab === "tab1"}
              aria-controls="tabpanel1"
            >
              <span>{tab1Label}</span>
              <svg className="h-3 lh:h-5 rotate-90 text-white mt-2" viewBox="0 0 35 31" fill="none">
                <path d="M0 31V0L35 15.4967" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => setActiveTab("tab2")}
              className={tabClasses(activeTab === "tab2")}
              role="tab"
              aria-selected={activeTab === "tab2"}
              aria-controls="tabpanel2"
            >
              <span>{tab2Label}</span>
              <svg className="h-3 lh:h-5 rotate-90 text-white mt-2" viewBox="0 0 35 31" fill="none">
                <path d="M0 31V0L35 15.4967" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {activeTab === "tab1" && (
        <div id="tabpanel1" role="tabpanel" aria-labelledby="tab1">
          <div className="bg-light-blue text-center text-white p-4 uppercase lg:text-2xl tracking-[0.8em]">
            Roofing
          </div>
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            {renderServiceRows(servicesRoofing)}
          </div>
        </div>
      )}

      {activeTab === "tab2" && (
        <div id="tabpanel2" role="tabpanel" aria-labelledby="tab2">
          <div className="bg-light-blue text-center text-white p-4 uppercase lg:text-2xl tracking-[0.8em]">
            Remodeling
          </div>
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            {renderServiceRows(servicesRemodeling)}
          </div>
        </div>
      )}
    </section>
  );
}