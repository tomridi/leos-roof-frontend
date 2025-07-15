// src/components/TeamSection.tsx
import React, { useState, useEffect } from 'react';

// 1. Define the interface for the image object coming from Payload's media collection
interface PayloadImage {
  id: number;
  alt: string;
  url: string;
  thumbnailURL?: string;
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
}

// 4. Type the props for the ProfileCard functional component
const ProfileCard: React.FC<ProfileCardProps> = ({ member, imageClass }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const words = member.description.split(/\s+/);
  const needsReadMore = words.length > 20;

  const previewText = needsReadMore ? words.slice(0, 20).join(' ') : member.description;
  const fullText = words.slice(20).join(' ');

  // Determine the image URL only if member.image exists and has a URL
  const imageUrl = member.image?.url; // This will be undefined or the URL

  return (
    // Root div for ProfileCard:
    // - On mobile, it acts as a stacking container with bottom margin.
    // - On desktop, it has no bottom margin as its parent grid handles spacing.
    <div className="flex flex-col mb-10 md:mb-0">
      {/* Mobile view: Hidden on desktop, displays image and text side-by-side */}
      <div className="flex gap-6 md:hidden">
        {/* Conditionally render the image only if imageUrl exists */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={member.image?.alt || member.title} // Use image alt or member name
            className={`h-[115px] w-[115px] rounded-3xl mb-4 object-cover object-top ${imageClass || ''}`}
          />
        )}

        <div>
          <h3 className="font-bold text-sm">
            {member.title}{' '}
            <span className="text-text-light text-xs mb-2">{member.position}</span>
          </h3>
          <p className="text-primary leading-relaxed text-xs profile-description">
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

      {/* Desktop view (always full description): Hidden on mobile, displays image on top, text below */}
      {/* This view is used for all members *except* the special 'leadMember' on desktop */}
      <div className="text-sm hidden md:block">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={member.image?.alt || member.title}
            className={`w-full ${imageClass || 'md:h-[200px]'} rounded-3xl mb-4 object-cover object-top`}
          />
        )}
        <h3 className="font-bold text-xl">{member.title}</h3>
        <p className="text-xl text-text-light mb-4">{member.position}</p>
        <p className="text-primary leading-relaxed text-base">
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

  // Get the first member (assumed to be order:1 after sort)
  const leadMember = teamMembers[0];
  // Get the rest of the members
  const otherMembers = teamMembers.slice(1);

  // Helper function for dynamic image classes based on CEO position and image presence
  // This is used for members rendered by ProfileCard (i.e., non-lead members on desktop, all members on mobile).
  const getMemberImageClass = (member: ApiTeamMember) => {
    // If a non-lead member is also CEO, you can still apply a larger height here.
    if (member.image && member.position.toLowerCase() === "ceo") {
      return "md:h-[365px]"; // Example for CEO if it's NOT the lead member but still has an image
    }
    return "md:h-[200px]"; // Default height for other members on desktop
  };

  return (
    <section className="team-section container mx-auto pt-8">
      {/* Mobile Layout: Display all members stacked vertically using ProfileCard's mobile styling */}
      <div className="md:hidden">
        {teamMembers.map((member) => (
          <ProfileCard
            key={member.id}
            member={member}
            imageClass={getMemberImageClass(member)}
          />
        ))}
      </div>

      {/* Desktop Layout: Hidden on mobile */}
      <div className="hidden md:block">
        {leadMember && (
          // Layout for the first team member: takes a two-column row
          <div className="grid grid-cols-[370px_1fr] mb-17 gap-5">
            <div className="col-span-1">
              {leadMember.image?.url && (
                <img
                  src={leadMember.image.url}
                  alt={leadMember.image?.alt || leadMember.title}
                  className="h-[385px] w-[370px] object-cover object-top rounded-3xl"
                />
              )}
            </div>
            <div className="col-span-1 flex flex-col justify-end">
              <h3 className="font-bold text-2xl">{leadMember.title}</h3>
              <p className="text-xl text-text-light mb-4">{leadMember.position}</p>
              <p className="text-primary leading-relaxed text-base">{leadMember.description}</p>
            </div>
          </div>
        )}

        {/* Layout for the rest of the team members: takes a three-column grid */}
        {otherMembers.length > 0 && (
          <div className="grid grid-cols-3 gap-8 mt-10">
            {otherMembers.map((member) => (
              <ProfileCard
                key={member.id}
                member={member}
                imageClass={getMemberImageClass(member)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}