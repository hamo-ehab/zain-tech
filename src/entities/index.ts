/**
 * Custom application data models
 * Defines interfaces for all main database collections
 */

/**
 * Collection: adminaccounts
 * Interface for AdminAccounts
 */
export interface AdminAccounts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  email?: string;
  passwordHash?: string;
  fullName?: string;
  role?: string;
  phoneNumber?: string;
  isActive?: boolean;
  lastLogin?: Date | string;
}


/**
 * Collection: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  title?: string;
  content?: string;
  author?: string;
  publicationDate?: Date | string;
  thumbnailImage?: string;
  slug?: string;
  isPublished?: boolean;
}


/**
 * Collection: bookings
 * Interface for BookingRequests
 */
export interface BookingRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  userId?: string;
  bookedItemName?: string;
  bookedItemType?: string;
  userContactPhone?: string;
  requestDate?: Date | string;
  status?: string;
  adminOwnerId?: string;
  taskHistory?: string;
}


/**
 * Collection: contactsubmissions
 * Interface for ContactSubmissions
 */
export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  submitterName?: string;
  submitterEmail?: string;
  submitterPhone?: string;
  messageContent?: string;
  submissionDate?: Date | string;
}


/**
 * Collection: courses
 * Interface for Courses
 */
export interface Courses {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  courseName?: string;
  courseDescription?: string;
  courseImage?: string;
  price?: number;
  isPublished?: boolean;
  videoLessonUrls?: string;
  pdfMaterialUrls?: string;
  quizIds?: string;
  courseDuration?: string;
}


/**
 * Collection: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  serviceName?: string;
  price?: number;
  description?: string;
  thumbnail?: string;
  isAvailable?: boolean;
  shortDescription?: string;
}


/**
 * Collection: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  userId?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  languagePreference?: string;
  hasPaidAccess?: boolean;
}
// Note: This file contains all main interfaces, so re-exporting types from 'index' is unnecessary.
// Removed re-export for cleaner code.
