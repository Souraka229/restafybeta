
export interface FormData {
  restaurantName: string;
  managerName: string;
  whatsappNumber: string;
  cuisineType: string;
  city: string;
  seatingCapacity: number;
  hasWebsite: string;
  motivation: string;
}

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  restaurant: string;
  image: string;
  rating: number;
}
