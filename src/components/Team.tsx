// src/components/TeamSection.tsx
import React, { useState, useEffect } from 'react';

// 1. Define the interface for the image object coming from Payload's media collection
interface PayloadImage {
  id: number;
  alt: string;
  url: string;
  thumbnailURL?: string;
  // Add other properties if you use them, e.g., width, height, sizes
}

// 2. Define the interface for a single team member as it comes from the API
interface ApiTeamMember {
  id: number; // Payload provides an ID
  title: string; // This is the member's name from your Payload "Team" collection
  position: string;
  description: string;
  image: PayloadImage; // This is the full image object
}

// 3. Define the interface for ProfileCard's props
interface ProfileCardProps {
  member: ApiTeamMember; // The 'member' prop will be of type ApiTeamMember
  imageClass?: string; // Optional property (still used for custom styling)
  gridClasses?: string; // Optional property (still used for custom styling)
}

// 4. Type the props for the ProfileCard functional component
const ProfileCard: React.FC<ProfileCardProps> = ({ member, imageClass, gridClasses }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const words = member.description.split(/\s+/);
  const needsReadMore = words.length > 20;

  const previewText = needsReadMore ? words.slice(0, 20).join(' ') : member.description;
  const fullText = words.slice(20).join(' ');

  // Determine the image URL. Use member.image.url from the API.
  const imageUrl = member.image?.url || '/path/to/placeholder.jpg'; // Fallback for safety

  return (
    <div className={`flex flex-col md:block ${gridClasses || ''}`}>
      {/* Mobile view */}
      <div className="flex gap-4 md:block">
        <img
          src={imageUrl}
          alt={member.image?.alt || member.title} // Use image alt or member name
          className={`h-[115px] w-[115px] ${imageClass || 'md:h-[200px]'} md:w-full rounded-3xl mb-4 md:mb-4 object-cover object-top`}
        />
        <div className="md:hidden">
          <h3 className="font-bold text-sm">
            {member.title}{' '}
            <span className="text-text-light text-xs mb-2">{member.position}</span>
          </h3>
          <p className="text-primary leading-relaxed text-xs md:text-medium profile-description">
            {previewText}
            {needsReadMore && !showFullDescription && <span className="read-more-dots">...</span>}
            {needsReadMore && (
              <span className={`read-more-content ${showFullDescription ? 'visible' : ''}`}>
                {' '}{fullText}
              </span>
            )}
            {needsReadMore && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="read-more-btn bg-black text-white px-3 block w-14 h-5 rounded-3xl mt-4 text-center"
              >
                {showFullDescription ? 'Less' : 'More'}
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Desktop view (always full description) */}
      <div className="text-sm md:text-xl hidden md:block">
        <h3 className="font-bold">{member.title}</h3>
        <p className="md:text-medium text-text-light mb-4">{member.position}</p>
        <p className="text-primary leading-relaxed text-xs md:text-medium">
          {member.description}
        </p>
      </div>
    </div>
  );
};

// 5. Update TeamSection to fetch data from API
export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<ApiTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const apiUrl = `${import.meta.env.PUBLIC_PAYLOAD_API_URL}/team?depth=1&sort=id`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTeamMembers(data.docs); // Assuming the API returns an object with a 'docs' array
      } catch (err: any) {
        console.error("Failed to fetch team data:", err);
        setError(`Failed to load team: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <section className="team-section container mx-auto p-8 text-center">
        <p className="text-primary text-sm italic">Loading team members...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="team-section container mx-auto p-8 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <section className="team-section container mx-auto p-8 text-center">
        <p className="text-primary text-sm italic">No team members found.</p>
      </section>
    );
  }

  // Define your custom imageClass and gridClasses for specific members if needed
  // This logic is now client-side, so you'd have to map member IDs to these classes
  // Or, preferably, add these as fields in your Payload CMS collection.
  // For now, I'm providing an example of how you might dynamically apply them
  const getMemberClasses = (memberId: number) => {
    switch (memberId) {
      case 1: // Leo Villagrana's ID from your API example
        return { imageClass: "md:h-[365px]", gridClasses: "" };
      case 2: // Junior's ID
        return { imageClass: "md:h-[200px]", gridClasses: "" };
      case 3: // Elquin's ID
        return { imageClass: "md:h-[200px]", gridClasses: "md:col-start-2 md:row-start-2 md:mt-[-380px]" };
      case 4: // Bethany's ID
        return { imageClass: "md:h-[200px]", gridClasses: "" };
      default:
        return { imageClass: "md:h-[200px]", gridClasses: "" };
    }
  };


  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {teamMembers.map((member) => {
          const { imageClass, gridClasses } = getMemberClasses(member.id);
          return (
            <ProfileCard
              key={member.id} // Use the unique ID from the API as the key
              member={member}
              imageClass={imageClass}
              gridClasses={gridClasses}
            />
          );
        })}
      </div>
    </>
  );
}