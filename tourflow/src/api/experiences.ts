// src/api/experiences.ts
import type { Experience } from '../types';

// Mock data for development
const mockExperiences: Experience[] = [
  {
    id: 1,
    title: "Bali Sunrise Trekking & Hot Springs",
    location: "Bali, Indonesia",
    category: "adventure",
    price: 89,
    rating: 4.9,
    review_count: 127,
    duration: "10 hours",
    max_group_size: 15,
    short_description: "Experience the magical sunrise from Mount Batur followed by a relaxing dip in natural hot springs.",
    description: "Embark on an unforgettable journey to witness the spectacular sunrise from the summit of Mount Batur. This adventure includes a guided trek, breakfast at the summit, and a visit to natural hot springs to soothe your muscles after the hike.",
    is_bestseller: true,
    created_at: "2023-01-15T00:00:00Z",
    updated_at: "2023-06-20T00:00:00Z"
  },
  {
    id: 2,
    title: "Paris Evening Food & Wine Tour",
    location: "Paris, France",
    category: "food",
    price: 125,
    rating: 4.7,
    review_count: 89,
    duration: "4 hours",
    max_group_size: 12,
    short_description: "Taste your way through Paris with a local guide, sampling French delicacies and wines.",
    description: "Join us for an evening of culinary delights in the heart of Paris. Visit local bistros, fromageries, and boulangeries while learning about French cuisine and wine pairing from expert local guides.",
    is_limited_offer: true,
    created_at: "2023-02-10T00:00:00Z",
    updated_at: "2023-06-15T00:00:00Z"
  },
  {
    id: 3,
    title: "Kenya Wildlife Safari Experience",
    location: "Masai Mara, Kenya",
    category: "wildlife",
    price: 450,
    rating: 5.0,
    review_count: 203,
    duration: "3 days",
    max_group_size: 8,
    short_description: "Embark on a 3-day safari adventure to witness the Big Five in their natural habitat.",
    description: "Experience the ultimate African safari with game drives through Masai Mara National Reserve. Spot lions, elephants, rhinos, leopards, and buffalo while staying in comfortable lodges with stunning views.",
    is_hot_deal: true,
    created_at: "2023-03-05T00:00:00Z",
    updated_at: "2023-06-18T00:00:00Z"
  },
  {
    id: 4,
    title: "Great Barrier Reef Diving Adventure",
    location: "Queensland, Australia",
    category: "adventure",
    price: 175,
    rating: 4.6,
    review_count: 76,
    duration: "Full day",
    max_group_size: 10,
    short_description: "Explore the world's largest coral reef system with certified diving instructors.",
    description: "Dive into the crystal-clear waters of the Great Barrier Reef and discover an underwater paradise. Suitable for both beginners and experienced divers, with all equipment provided.",
    created_at: "2023-01-20T00:00:00Z",
    updated_at: "2023-06-10T00:00:00Z"
  },
  {
    id: 5,
    title: "Iceland Northern Lights Chase",
    location: "Reykjavik, Iceland",
    category: "nature",
    price: 110,
    rating: 4.8,
    review_count: 158,
    duration: "6 hours",
    max_group_size: 20,
    short_description: "Hunt for the spectacular Aurora Borealis with expert guides in the Icelandic wilderness.",
    description: "Join our expert guides on a hunt for the magical Northern Lights. We'll take you to the best viewing spots away from city lights, with warm drinks and stories about Icelandic folklore.",
    created_at: "2023-02-28T00:00:00Z",
    updated_at: "2023-06-12T00:00:00Z"
  },
  {
    id: 6,
    title: "Angkor Wat Sunrise & Temple Tour",
    location: "Siem Reap, Cambodia",
    category: "cultural",
    price: 65,
    rating: 4.7,
    review_count: 94,
    duration: "Full day",
    max_group_size: 12,
    short_description: "Witness the breathtaking sunrise over Angkor Wat and explore ancient temple complexes.",
    description: "Start your day with the iconic sunrise over Angkor Wat, then explore the ancient temple complexes including Bayon and Ta Prohm. Learn about Khmer history and architecture from expert local guides.",
    created_at: "2023-03-15T00:00:00Z",
    updated_at: "2023-06-08T00:00:00Z"
  },
  {
    id: 7,
    title: "Swiss Alps Hiking Adventure",
    location: "Interlaken, Switzerland",
    category: "nature",
    price: 280,
    rating: 4.9,
    review_count: 112,
    duration: "2 days",
    max_group_size: 8,
    short_description: "Trek through breathtaking alpine landscapes with stunning mountain views and pristine lakes.",
    description: "Experience the beauty of the Swiss Alps on this 2-day hiking adventure. Traverse mountain passes, visit alpine villages, and stay in mountain huts with panoramic views of the surrounding peaks.",
    created_at: "2023-04-01T00:00:00Z",
    updated_at: "2023-06-22T00:00:00Z"
  },
  {
    id: 8,
    title: "Thai Cooking Class in Bangkok",
    location: "Bangkok, Thailand",
    category: "food",
    price: 55,
    rating: 4.8,
    review_count: 67,
    duration: "4 hours",
    max_group_size: 10,
    short_description: "Learn to prepare authentic Thai dishes from local chefs in a traditional setting.",
    description: "Discover the secrets of Thai cuisine in this hands-on cooking class. Visit a local market to select fresh ingredients, then learn to prepare classic dishes like Pad Thai, Tom Yum, and Green Curry.",
    created_at: "2023-04-10T00:00:00Z",
    updated_at: "2023-06-05T00:00:00Z"
  }
];

// Frontend-only API functions
export const experiencesAPI = {
  // Get all experiences
  getAllExperiences: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return properly structured response
    return { data: mockExperiences };
  },

  // Get experience by ID
  getExperienceById: async (id: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const experience = mockExperiences.find(exp => exp.id === id);
    if (experience) {
      return { data: experience };
    } else {
      throw new Error('Experience not found');
    }
  },

  // Search experiences
  searchExperiences: async (params: {
    query?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
  }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockExperiences];
    
    if (params.query) {
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(params.query!.toLowerCase()) ||
        exp.location.toLowerCase().includes(params.query!.toLowerCase())
      );
    }
    
    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(exp => exp.category === params.category);
    }
    
    if (params.min_price) {
      filtered = filtered.filter(exp => exp.price >= params.min_price!);
    }
    
    if (params.max_price) {
      filtered = filtered.filter(exp => exp.price <= params.max_price!);
    }
    
    if (params.sort_by) {
      switch (params.sort_by) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
    
    return { data: filtered };
  },

  // Create booking (mock)
  createBooking: async (bookingData: {
    experience_id: number;
    date: string;
    number_of_people: number;
  }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return mock booking response
    return { 
      data: { 
        id: Math.floor(Math.random() * 1000),
        ...bookingData,
        status: 'confirmed',
        total_price: 0 // Would calculate based on experience price
      }
    };
  },

  // Get reviews for experience (mock)
  getReviews: async (experienceId: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return mock reviews
    return { 
      data: [
        {
          id: 1,
          experience_id: experienceId,
          user_id: 1,
          user_name: "John Doe",
          rating: 5,
          comment: "Amazing experience! Highly recommended.",
          created_at: "2023-05-15T00:00:00Z"
        },
        {
          id: 2,
          experience_id: experienceId,
          user_id: 2,
          user_name: "Jane Smith",
          rating: 4,
          comment: "Great trip, but could be better organized.",
          created_at: "2023-05-10T00:00:00Z"
        }
      ]
    };
  },

  // Create review (mock)
  createReview: async (reviewData: {
    experience_id: number;
    rating: number;
    comment: string;
  }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return mock review response
    return { 
      data: { 
        id: Math.floor(Math.random() * 1000),
        user_id: 1,
        user_name: "Current User",
        ...reviewData,
        created_at: new Date().toISOString()
      }
    };
  },
};