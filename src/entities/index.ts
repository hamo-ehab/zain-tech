/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: adminaccounts
 * Interface for AdminAccounts
 */
export interface AdminAccounts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  passwordHash?: string;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType datetime */
  lastLogin?: Date | string;
}


/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
  /** @wixFieldType image */
  thumbnailImage?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType boolean */
  isPublished?: boolean;
}


/**
 * Collection ID: bookings
 * Interface for BookingRequests
 */
export interface BookingRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType text */
  bookedItemName?: string;
  /** @wixFieldType text */
  bookedItemType?: string;
  /** @wixFieldType text */
  userContactPhone?: string;
  /** @wixFieldType datetime */
  requestDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType text */
  adminOwnerId?: string;
  /** @wixFieldType text */
  taskHistory?: string;
}


/**
 * Collection ID: contactsubmissions
 * Interface for ContactSubmissions
 */
export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  submitterName?: string;
  /** @wixFieldType text */
  submitterEmail?: string;
  /** @wixFieldType text */
  submitterPhone?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: courses
 * Interface for Courses
 */
export interface Courses {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  courseName?: string;
  /** @wixFieldType text */
  courseDescription?: string;
  /** @wixFieldType image */
  courseImage?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType boolean */
  isPublished?: boolean;
  /** @wixFieldType text */
  videoLessonUrls?: string;
  /** @wixFieldType text */
  pdfMaterialUrls?: string;
  /** @wixFieldType text */
  quizIds?: string;
  /** @wixFieldType text */
  courseDuration?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  thumbnail?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType text */
  shortDescription?: string;
}


/**
 * Collection ID: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userId?: string;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  languagePreference?: string;
  /** @wixFieldType boolean */
  hasPaidAccess?: boolean;
}
