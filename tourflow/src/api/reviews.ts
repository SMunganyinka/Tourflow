import api from './index';

export const reviewsAPI = {
  getReviewsByDestination: (destinationId: number) =>
    api.get(`/reviews/destination/${destinationId}`),
  
  createReview: (reviewData: {
    destination_id: number;
    rating: number;
    comment: string;
  }) => api.post('/reviews', reviewData),
  
  updateReview: (id: number, reviewData: {
    rating?: number;
    comment?: string;
  }) => api.put(`/reviews/${id}`, reviewData),
  
  deleteReview: (id: number) => api.delete(`/reviews/${id}`),
};