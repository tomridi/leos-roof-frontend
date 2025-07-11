import { useEffect, useRef } from 'react';

const stats = [
  { label: 'Roof Installed', target: 300, duration: 2800 },
  { label: 'Roofs Fixed', target: 1400, duration: 3200 },
  { label: 'Gutters Fixed', target: 2000, duration: 3500 },
  { label: 'Remodels', target: 120, duration: 2000 },
];

export default function StatsSection() {
  // Initialize with an array of nulls to ensure we have placeholders for all stats
  const counterRefs = useRef(new Array(stats.length).fill(null));

  useEffect(() => {
    const animateCounter = (el, target, duration) => {
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target; // ensure final value
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the index of the intersected element in our stats array
            const index = counterRefs.current.indexOf(entry.target.querySelector('span'));
            if (index !== -1) {
              const el = counterRefs.current[index];
              const { target, duration } = stats[index];
              animateCounter(el, target, duration);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Only observe once all refs are potentially set
    // We check if all elements have been assigned to counterRefs.current
    // by ensuring each ref is not null and has a parent element to observe.
    const allRefsPopulated = counterRefs.current.every(ref => ref !== null && ref.parentElement);

    if (allRefsPopulated) {
      counterRefs.current.forEach((ref) => {
        if (ref && ref.parentElement) {
          observer.observe(ref.parentElement);
        }
      });
    }


    return () => observer.disconnect();
  }, [stats.length]); // Re-run effect if the number of stats changes

  return (
    <div className="container mx-auto min-h-[335px] py-20 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <div className="bg-[url('/images/shape-bg.svg')] bg-no-repeat bg-center bg-contain h-[120px] w-[250px] flex justify-center items-center text-white text-4xl font-bold">
              {/* Assign ref directly to the span */}
              <span ref={(el) => (counterRefs.current[index] = el)}>0</span>+
            </div>
            <div className="text-white mt-4 text-2xl">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}