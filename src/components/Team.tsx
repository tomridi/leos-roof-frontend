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
  image: PayloadImage | null; // IMPORTANT: image can now be null
  order: number; // <--- Ensure 'order' property is included in the interface
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

  // Determine the image URL only if member.image exists and has a URL
  const imageUrl = member.image?.url; // This will be undefined or the URL

  return (
    <div className={`flex flex-col md:block md:mb-10 ${gridClasses || ''}`}>
      {/* Mobile view */}
      <div className="flex gap-6 md:block">
        {/* Conditionally render the image only if imageUrl exists */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={member.image?.alt || member.title} // Use image alt or member name
            className={`h-[115px] w-[115px] ${imageClass || 'md:h-[200px]'} md:w-full rounded-3xl mb-4 md:mb-4 object-cover object-top`}
          />
        )}

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
        // Fetching with sort=order already, so the data should come in order
        const apiUrl = `${import.meta.env.PUBLIC_PAYLOAD_API_URL}/team?depth=1&sort=order`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTeamMembers(data.docs);
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

  // Helper function for dynamic image classes based on CEO position and image presence
  const getMemberImageClass = (member: ApiTeamMember) => {
    if (member.image && member.position.toLowerCase() === "ceo") {
      return "md:h-[365px]";
    }
    return "md:h-[200px]"; // Default height if no image or not CEO
  };

  // --- NEW LOGIC TO ORGANIZE MEMBERS INTO COLUMNS BASED ON 'order' ---
  const column1Members: ApiTeamMember[] = [];
  const column2Members: ApiTeamMember[] = [];
  const column3Members: ApiTeamMember[] = [];

  teamMembers.forEach(member => {
    if (member.order === 1) {
      column1Members.push(member);
    } else if (member.order === 2 || member.order === 3) {
      column2Members.push(member);
    } else if (member.order >= 4) { // Order 4 and greater for the third column
      column3Members.push(member);
    }
    // Note: If you have members with 'order' values other than 1, 2, 3, or >=4
    // they will not be displayed. Adjust the conditions as necessary for your data.
  });

  // It's good practice to ensure column2Members are sorted by order if not guaranteed by API
  column2Members.sort((a, b) => a.order - b.order);
  // Same for column3Members
  column3Members.sort((a, b) => a.order - b.order);


  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {/* Column 1 */}
        <div className="md:col-span-1">
          {column1Members.map((member) => (
            <ProfileCard
              key={member.id}
              member={member}
              imageClass={getMemberImageClass(member)}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="md:col-span-1">
          {column2Members.map((member) => (
            <ProfileCard
              key={member.id}
              member={member}
              imageClass={getMemberImageClass(member)}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="md:col-span-1">
          {column3Members.map((member) => (
            <ProfileCard
              key={member.id}
              member={member}
              imageClass={getMemberImageClass(member)}
            />
          ))}
        </div>
      </div>
    </>
  );
}