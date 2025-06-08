import React, { useEffect, useState } from "react";

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const PAYLOAD_BASE_URL = string = import.meta.env.PUBLIC_PAYLOAD_API_URL || "http://localhost:3000";
        // --- CRITICAL FIX HERE: Ensure '/api/' is in the path ---
        const res = string = `${PAYLOAD_BASE_URL}/services?depth=2`;
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {services.map((service) => {
        const categoryTitle = service.serviceCategory?.title || "No Category";
        const serviceTitle = service.title || "No Title";
        return (
          <p key={service.id}>
            {categoryTitle}: - {serviceTitle}
          </p>
        );
      })}
    </div>
  );
}
