import React, { useEffect } from 'react';
import { FaUsers, FaGlobeAmericas, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// --- Internal Hooks for SEO (No external dependencies needed) ---

/**
 * A custom hook to set the document title.
 */
const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

/**
 * A custom hook to set the meta description for SEO.
 */
const useMetaDescription = (description: string) => {
  useEffect(() => {
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Cleanup function to remove the meta tag on component unmount
    return () => {
      if (document.head.contains(metaDescription)) {
        document.head.removeChild(metaDescription);
      }
    };
  }, [description]);
};


// --- Internal Sub-Components ---

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <img 
         src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" 
        alt="A group of friends sitting together on a mountain, admiring a breathtaking sunset view over a valley."  
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        loading="lazy"
      />
      <div className="relative container mx-auto px-4 py-24 text-center animate-fade-in">
        <h1 className="text-5xl font-bold mb-4">Our Story</h1>
        <p className="text-xl max-w-2xl mx-auto">
          We believe travel is more than just seeing new places—it's about feeling them.
        </p>
      </div>
    </section>
  );
};

const MissionSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At TourFlow, our mission is to connect curious travelers with authentic, local experiences 
            that go beyond the typical tourist trail. We partner with passionate local guides and 
            small operators to bring you unique adventures that create lasting memories and foster 
            a genuine connection to the places you visit.
          </p>
        </div>
      </div>
    </section>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    { icon: FaGlobeAmericas, count: '50+', label: 'Destinations' },
    { icon: FaUsers, count: '10,000+', label: 'Happy Travelers' },
    { icon: FaHeart, count: '500+', label: 'Unique Experiences' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <stat.icon className="text-4xl text-primary-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-3xl font-bold text-gray-800">{stat.count}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Co-Founder & CEO',
      bio: 'A seasoned traveler with a passion for sustainable tourism, Alex leads our vision.',
      avatar: 'https://images.unsplash.com/photo-1685376104038-66107ad5c582?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHByb2Zlc3Npb25hbCUyMGJsYWNrJTIwbWFuJTIwaW4lMjBhJTIwc3VpdHxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      name: 'Maria Garcia',
      role: 'Co-Founder & CTO',
      bio: 'Maria ensures our platform is seamless and secure, making travel planning a breeze.',
      avatar: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww',
    },
    {
      name: 'Ben Carter',
      role: 'Co-Founder & Head of Experience',
      bio: 'Ben scouts the globe for the most authentic and unforgettable experiences.',
      avatar: 'https://images.unsplash.com/photo-1679480911476-3ee732578062?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxwcm9mZXNzaW9uYWwlMjBibGFjayUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Meet the Founders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
              <img 
                src={member.avatar} 
                alt={`Portrait of ${member.name}`} 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                loading="lazy"
              />
              <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
              <p className="text-primary-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FIX: Updated CallToAction component with a lighter, footer-like color scheme
const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 text-center mb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready for Your Next Adventure?</h2>
        <p className="text-xl mb-6 text-gray-700">Explore our experiences and start planning your dream trip today.</p>
        <Link 
          to="/destinations" 
          className="bg-blue-700 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
        >
          Explore Destinations
        </Link>
      </div>
    </section>
  );
};


// --- Main About Page Component ---

const AboutPage: React.FC = () => {
  // Use our custom hooks for SEO
  useDocumentTitle('About Us - TourFlow');
  useMetaDescription("Learn about TourFlow's mission to connect travelers with authentic experiences around the globe.");

  return (
    <div>
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <TeamSection />
      <CallToAction />
    </div>
  );
};

export default AboutPage;