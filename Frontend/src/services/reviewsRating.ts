import { toast } from "react-toastify";
import axiosInstance from "../config/axiosInstance";
import { getUserDetailsService } from "./user";
import { reviewsUrls } from "../urls/urls";

export const submitReviewService = async (
  salonId: string,
  reviewRatingData: any
) => {
  const details = await getUserDetailsService();

  const formData = {
    salonId,
    userId: details._id,
    rating: reviewRatingData.rating,
    comment: reviewRatingData.comment,
    services: reviewRatingData.services,
    staff: reviewRatingData.staff,
    valueForMoney: reviewRatingData.valueForMoney,
    cleanliness: reviewRatingData.cleanliness,
  };

  try {
    const response = await axiosInstance.post(
      reviewsUrls.submitReview,
      formData
    );
    if (response.data._id) {
      toast.success("Review Submitted Successfully");
      await getReviewsAndRatingService(salonId);
      window.location.reload();
    } else {
      toast.error("Something went wrong");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Something went wrong.");

    console.error("Failed to submit review:", error);
  }
};

export const getReviewsAndRatingService = async (salonId: string) => {
  try {
    const response = await axiosInstance.get(reviewsUrls.getReviews(salonId));
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews and ratings:", error);
    throw error;
  }
};

export async function updateReviewAndRatingService(
  reviewId: string,
  data: any,
  reviewToUpdate: any
): Promise<void> {
  try {
    const details = await getUserDetailsService();

    const formData = {
      salonId: reviewToUpdate.salonId,
      userId: details._id,
      rating: data.rating,
      comment: data.comment,
      services: data.services,
      staff: data.staff,
      valueForMoney: data.valueForMoney,
      cleanliness: data.cleanliness,
    };
    const response = await axiosInstance.put(
      reviewsUrls.updateReviews(reviewId),
      formData
    );
    if (response.data._id) {
      await getReviewsAndRatingService(reviewToUpdate.salonId);
      toast.success("Review updated successfully");
      window.location.reload();
    }
  } catch (error) {
    toast.error("Error updating review");
    console.error("Error updating review:", error);
  }
}
