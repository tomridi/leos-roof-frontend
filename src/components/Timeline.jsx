import { useEffect, useRef } from 'react';

const Timeline = ({ 
  initialDelay = 0, 
  itemDelay = 300, 
  animationDuration = 600 
}) => {
  const timelineRef = useRef(null);

  useEffect(() => {
  const timelineItems = timelineRef.current?.querySelectorAll('ol.timeline li') || [];

  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const index = [...timelineItems].indexOf(item);
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, initialDelay + (index * itemDelay));
        observer.unobserve(item);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      const index = [...timelineItems].indexOf(item);
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, initialDelay + (index * itemDelay));
    } else {
      observer.observe(item);
    }
  });

  return () => {
    observer.disconnect();
  };
}, [initialDelay, itemDelay, animationDuration]);

  return (
    <div
      ref={timelineRef}
      className="bg-primary h-auto min-h-[800px] md:p-20 overflow-hidden px-4 py-15"
    >
      <div className="container mx-auto min-h-96">
        <h2 className="text-white font-thin leading-[1.3] text-medium md:text-4xl mb-10">
          Our Process | Timeline
        </h2>
        
        <ol className="timeline items-start sm:flex sm:items-start text-sm md:text-base">

        {/* Vertical timeline for mobile, horizontal for desktop */}
        <div className="relative sm:hidden">
          {/* Vertical line down the center */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-light-blue transform -translate-x-1/2"></div>

          {/* Item 1 */}
          <li className="relative mb-10 pl-8 text-left ml-[50%]">
            <div className="absolute left-0 z-10 flex items-center justify-center w-4 h-4 rounded-full bg-light-blue transform -translate-x-1/2 mt-[-15px]"></div>
            <div className="mt-0">
              <h3 className="text-base font-semibold text-white">On-Site Evaluation</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">We begin by visiting your property to assess your roof or renovation space, discuss your objectives, and offer professional recommendations tailored to your needs.</p>
            </div>
          </li>

          {/* Item 2 */}
          <li className="relative mb-10 pr-8 text-right mr-[50%] mt-[-160px]">
            <div className="absolute right-0 z-10 flex items-center justify-center w-4 h-4 rounded-full bg-light-blue mt-1 transform translate-x-1/2"></div>
            <div className="mt-0">
              <h3 className="text-base font-semibold text-white">Estimate & Proposal</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">Next, we present a detailed estimate that outlines costs, materials, timelines, and the full scope of work. This ensures you have total clarity before moving forward.</p>
            </div>
          </li>

          {/* Item 3 */}
          <li className="relative mb-10 pl-8 text-left ml-[50%] mt-[-120px]">
            <div className="absolute left-0 z-10 flex items-center justify-center w-4 h-4 rounded-full bg-light-blue mt-1 transform -translate-x-1/2"></div>
            <div className="mt-0">
              <h3 className="text-base font-semibold text-white">Contract & Planning</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">
                <span className="font-bold block">Roofing</span>
                After approval, we finalize the contract, schedule your project, and secure all necessary permits.
                <span className="font-bold block">Remodeling</span>
                We refine the design plan, confirm material selections, and handle permit requirements.
              </p>
            </div>
          </li>

          {/* Item 4 */}
          <li className="relative mb-10 pr-8 text-right mr-[50%] mt-[-180px]">
            <div className="absolute right-0 z-10 flex items-center justify-center w-4 h-4 rounded-full bg-light-blue mt-1 transform translate-x-1/2"></div>
            <div className="mt-0">
              <h3 className="text-base font-semibold text-white">Preparation</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">
                <span className="font-bold block">Roofing</span>
                We prepare the site, deliver materials, and implement safety measures.
                <span className="font-bold block">Remodeling</span>
                We handle demolition, finalize materials, and prepare for construction.
              </p>
            </div>
          </li>

          {/* Item 5 */}
          <li className="relative mb-10 pl-8 text-left ml-[50%] mt-[-160px]">
            <div className="absolute left-0 z-10 flex items-center justify-center w-4 h-4 rounded-full bg-light-blue mt-1 transform -translate-x-1/2"></div>
            <div className="mt-0">
              <h3 className="text-base font-semibold text-white">Execution & Installation</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">
                <span className="font-bold block">Roofing</span>
                We remove old materials (if needed), install your new roof system.
                <span className="font-bold block">Remodeling</span>
                Our skilled crew handles structural updates to custom finishes.
              </p>
            </div>
          </li>

          {/* Item 6 */}
          <li className="relative mb-10 pr-8 text-right mr-[50%] mt-[-160px]">
            <div className="absolute right-0 z-10 flex items-center justify-center w-4 h-4 rounded-full bg-light-blue mt-1 transform translate-x-1/2"></div>
            <div className="mt-0">
              <h3 className="text-base font-semibold text-white">Final Inspection & Cleanup</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">Upon completion, we perform thorough inspections to ensure quality and safety standards are met. We then tidy up the worksite.</p>
            </div>
          </li>

          {/* Item 7 (centered) */}
          <li className="relative text-center bottom-[-25px] mt-[-50px]">
            <div className="mx-auto z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 border-light-blue">
              <div className="w-3 h-3 rounded-full bg-light-blue"></div>
              <div className="absolute bottom-2 left-3/5 text-base font-semibold text-white">Finish</div>
            </div>
          </li>
        </div>

        {/* Desktop horizontal timeline */}
       
          {/* Item 1 */}
          <li className="relative mb-6 sm:mb-0 flex-1 hidden sm:block">
            <div className="flex items-center h-10 sm:h-16">
              <div className="z-10 flex items-center justify-center w-2 h-2 rounded-full ring-light-blue bg-light-blue sm:ring-5 shrink-0"></div>
              <div className="hidden sm:flex w-full bg-light-blue h-0.5"></div>
            </div>
            <div className="mt-8 sm:pe-8">
              <h3 className="text-base font-semibold text-white">On-Site Evaluation</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">We begin by visiting your property to assess your roof or renovation space, discuss your objectives, and offer professional recommendations tailored to your needs.</p>
            </div>
          </li>

          {/* Item 2 */}
          <li className="relative mb-6 sm:mb-0 flex-1 hidden sm:block">
            <div className="flex items-center h-10 sm:h-16">
              <div className="z-10 flex items-center justify-center w-2 h-2 rounded-full ring-light-blue bg-light-blue sm:ring-5 shrink-0"></div>
              <div className="hidden sm:flex w-full bg-light-blue h-0.5"></div>
            </div>
            <div className="mt-50 sm:pe-8">
              <h3 className="text-base font-semibold text-white">Estimate & Proposal</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">Next, we present a detailed estimate that outlines costs, materials, timelines, and the full scope of work. This ensures you have total clarity before moving forward.</p>
            </div>
          </li>

          {/* Item 3 */}
          <li className="relative mb-6 sm:mb-0 flex-1 hidden sm:block">
            <div className="flex items-center h-10 sm:h-16">
              <div className="z-10 flex items-center justify-center w-2 h-2 rounded-full ring-light-blue bg-light-blue sm:ring-5 shrink-0"></div>
              <div className="hidden sm:flex w-full bg-light-blue h-0.5"></div>
            </div>
            <div className="mt-8 sm:pe-8">
              <h3 className="text-base font-semibold text-white">Contract & Planning</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">
                <span className="font-bold block">Roofing</span>
                After approval, we finalize the contract, schedule your project, and secure all necessary permits—making sure every step meets local building codes.
                <span className="font-bold block">Remodeling</span>
                We refine the design plan, confirm material selections, and handle permit requirements before construction.
              </p>
            </div>
          </li>

          {/* Item 4 */}
          <li className="relative mb-6 sm:mb-0 flex-1 hidden sm:block">
            <div className="flex items-center h-10 sm:h-16">
              <div className="z-10 flex items-center justify-center w-2 h-2 rounded-full ring-light-blue bg-light-blue sm:ring-5 shrink-0"></div>
              <div className="hidden sm:flex w-full bg-light-blue h-0.5"></div>
            </div>
            <div className="mt-25 sm:pe-8">
              <h3 className="text-base font-semibold text-white">Preparation</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">
                <span className="font-bold block">Roofing</span>
                We prepare the site, deliver materials, and put safety measures in place so residents can move safely and our team can work efficiently.
                <span className="font-bold block">Remodeling</span>
                We handle any required demolition, finalize materials, and set the stage for construction.
              </p>
            </div>
          </li>

          {/* Item 5 */}
          <li className="relative mb-6 sm:mb-0 flex-1 hidden sm:block">
            <div className="flex items-center h-10 sm:h-16">
              <div className="z-10 flex items-center justify-center w-2 h-2 rounded-full ring-light-blue bg-light-blue sm:ring-5 shrink-0"></div>
              <div className="hidden sm:flex w-full bg-light-blue h-0.5"></div>
            </div>
            <div className="mt-8 sm:pe-8">
              <h3 className="text-base font-semibold text-white">Execution & Installation</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">
                <span className="font-bold block">Roofing</span>
                We remove any existing roofing materials (if needed), install your new roof system, and conduct ongoing quality checks.
                <span className="font-bold block">Remodeling</span>
                From structural updates to flooring, cabinetry, and custom finishes, our skilled crew brings your vision to life.
              </p>
            </div>
          </li>

          {/* Item 6 */}
          <li className="relative mb-6 sm:mb-0 flex-1 hidden sm:block">
            <div className="flex items-center h-10 sm:h-16">
              <div className="z-10 flex items-center justify-center w-2 h-2 rounded-full ring-light-blue bg-light-blue sm:ring-5 shrink-0"></div>
              <div className="hidden sm:flex w-full bg-light-blue h-0.5"></div>
            </div>
            <div className="mt-30 sm:pe-8">
              <h3 className="text-base font-semibold text-white">Final Inspection & Cleanup</h3>
              <span className="block mb-2 text-sm font-normal leading-none text-timeline">-----</span>
              <p className="text-base font-normal text-timeline">Upon completion, we perform a thorough inspection to ensure everything meets our strict quality and safety standards. We then tidy up the worksite, leaving you with a durable roof or beautifully renovated space ready to enjoy.</p>
            </div>
          </li>

          {/* Item 7 */}
          <li className="relative mb-6 sm:mb-0 sm:self-right transition-opacity 0.8s ease-out, transform 0.8s ease-out hidden sm:block">
            <div className="flex items-center h-10 ml-[-60px] sm:h-16">
              {/* Timeline connector line (stops before outer ring) */}
              <div className="hidden sm:block w-full bg-light-blue h-0.5 mr-[-2px]"></div>
              {/* Outer ring (perfect circle) with inner dot */}
              <div className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full border border-light-blue sm:w-20 sm:h-10 sm:border-2">
                {/* Inner dot (centered) */}
                <div className="w-1.5 h-1.5 rounded-full bg-light-blue sm:w-3 sm:h-3"></div>
              </div>
              <div className="absolute top-22 right-0 text-base font-semibold text-white">Finish</div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Timeline;