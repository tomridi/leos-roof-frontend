// src/components/ServicesSectionClient.tsx
import React, { useState, useEffect } from 'react';
import { slugify } from '../utils/slugify.ts';
import type { PayloadResponse, ServiceDoc, ServicesTab, ServicesTabItem, ServiceCategoryDoc } from '../types/payload.ts';

// Import all potential components this wrapper might render
import ServicesTabs from './ServicesTabs.tsx';
import ServicesGrid from './ServicesGrid.tsx';

// Define a type for the string identifier
type RenderComponentName = 'ServicesTabs' | 'ServicesGrid';

interface ServicesSectionClientProps {
  renderComponent: RenderComponentName; // Now a string
  invertOrder?: boolean;
}

const ServicesSectionClient: React.FC<ServicesSectionClientProps> = ({ renderComponent, invertOrder = false }) => {
  const [transformedTabs, setTransformedTabs] = useState<ServicesTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const PAYLOAD_BASE_URL: string = import.meta.env.PUBLIC_PAYLOAD_API_URL;
        const API_ENDPOINT: string = `${PAYLOAD_BASE_URL}/services?depth=2&sort=order&limit=100`;

        //console.log("Attempting to fetch services data from:", API_ENDPOINT);

        const response = await fetch(API_ENDPOINT);

        //console.log("Services API Response Status (from ServicesSectionClient.tsx):", response.status, response.statusText);

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`HTTP error fetching services! Status: ${response.status}. Message: ${response.statusText}. Response Body: ${errorBody.substring(0, 200)}...`);
        }

        const fetchedPayloadData: PayloadResponse<ServiceDoc> = await response.json() as PayloadResponse<ServiceDoc>;

        if (!fetchedPayloadData.docs || fetchedPayloadData.docs.length === 0) {
          console.warn("Fetched services data has no 'docs' array or the 'docs' array is empty (from ServicesSectionClient.tsx).");
        } else {
          //console.log(`Successfully fetched ${fetchedPayloadData.docs.length} service documents (from ServicesSectionClient.tsx).`);
        }

        const categorizedServicesMap = new Map<string, { categoryData: ServiceCategoryDoc, items: ServicesTabItem[] }>();

        fetchedPayloadData.docs.forEach(service => {
          if (service.serviceCategory && typeof service.serviceCategory === 'object' && 'title' in service.serviceCategory) {
            const categoryTitle = service.serviceCategory.title;
            const categoryData = service.serviceCategory;

            if (!categorizedServicesMap.has(categoryTitle)) {
              categorizedServicesMap.set(categoryTitle, { categoryData: categoryData, items: [] });
            }

            categorizedServicesMap.get(categoryTitle)?.items.push({
              href: `/services/${slugify(service.title)}`,
              title: service.title,
              description: service.description  || '',
              svg: service.svgIconCode  || '',
              image: service.coverImage?.url || '/images/default-cover-image.webp',
            });
          } else {
            console.warn("Service missing valid serviceCategory:", service);
          }
        });

        let newTransformedTabs = Array.from(categorizedServicesMap.entries()).map(([categoryLabel, data]) => {
          const bgColor = data.categoryData.backgroundColor;
          const bgImage = data.categoryData.backgroundImage?.url;

          return {
            label: categoryLabel,
            bgImage: bgImage || "/images/default-bg.webp",
            bgColor: bgColor || "#cccccc",
            items: data.items,
          };
        });

        if (invertOrder) {
          newTransformedTabs = newTransformedTabs.reverse();
        }

        setTransformedTabs(newTransformedTabs);

      } catch (err: any) {
        console.error("An error occurred during services data fetching or transformation in ServicesSectionClient.tsx:", err);
        setError(`Failed to load services: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, [invertOrder]);

  if (loading) {
    return (
      <section className="min-h-[700px] flex items-center justify-center">
        <p className="text-center text-lg mt-10">Loading services...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[700px] flex items-center justify-center">
        <p className="text-red-500 text-lg text-center mt-10">{error}</p>
      </section>
    );
  }

  if (transformedTabs.length === 0) {
    return (
      <section className="min-h-[700px] flex items-center justify-center">
        <p className="text-center text-lg mt-10">No services available at this time.</p>
      </section>
    );
  }

  // --- Dynamic Component Selection ---
  const ComponentToRender = renderComponent === 'ServicesTabs' ? ServicesTabs : ServicesGrid;

  return (
    <section>
      <ComponentToRender tabs={transformedTabs} />
    </section>
  );
};

export default ServicesSectionClient;