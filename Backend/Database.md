# **MediQ Application: Database Structure**

This document outlines the database schema for the MediQ application. The database is designed using MongoDB and structured with Mongoose schemas to ensure data integrity and scalability.

## **1\. Users Collection**

Stores information for registered users. Passwords are required to be hashed before being saved.

**Collection Name:** users

| Field | Data Type | Description | Constraints / Index |
| :---- | :---- | :---- | :---- |
| \_id | ObjectId | Unique identifier for the user document. | Default Index |
| name | String | The full name of the user. | Required |
| email | String | The user's email address, used for login. | Required, Unique |
| password | String | The user's hashed password. | Required |
| createdAt | Timestamp | Timestamp of when the user account was created. | Default: Date.now |
| updatedAt | Timestamp | Timestamp of the last update to the user document. | Default: Date.now |

## **2\. Prescriptions Collection**

Stores metadata for each prescription file uploaded by a user. The files themselves are stored in a cloud service (like Cloudinary), and the URL is saved here.

**Collection Name:** prescriptions

| Field | Data Type | Description | Constraints / Index |
| :---- | :---- | :---- | :---- |
| \_id | ObjectId | Unique identifier for the prescription document. | Default Index |
| user | ObjectId | A reference to the \_id of the user who uploaded it. | Required, Ref: 'User' |
| url | String | The public URL of the file stored in Cloudinary. | Required |
| key | String | The unique identifier (public\_id) of the file in Cloudinary. | Required |
| createdAt | Timestamp | Timestamp of when the prescription was uploaded. | Default: Date.now |
| updatedAt | Timestamp | Timestamp of the last update to the document. | Default: Date.now |

## **3\. Orders Collection**

This is the central collection that links users to their prescriptions and the tests they've requested.

**Collection Name:** orders

| Field | Data Type | Description | Constraints / Index |
| :---- | :---- | :---- | :---- |
| \_id | ObjectId | Unique identifier for the order document. | Default Index |
| user | ObjectId | A reference to the \_id of the user who placed the order. | Required, Ref: 'User' |
| prescription | ObjectId | A reference to the \_id of the associated prescription. | Required, Ref: 'Prescription' |
| tests | Array | A list of strings containing the names of the requested tests. |  |
| status | String | The current status of the order. | Enum: \['Pending', 'Processing', 'Completed', 'Cancelled'\], Default: Pending |
| createdAt | Timestamp | Timestamp of when the order was placed. | Default: Date.now |
| updatedAt | Timestamp | Timestamp of the last update to the order document. | Default: Date.now |

## **4\. Subscribers Collection**

Stores the email addresses of users who have subscribed to the newsletter.

**Collection Name:** subscribers

| Field | Data Type | Description | Constraints / Index |
| :---- | :---- | :---- | :---- |
| \_id | ObjectId | Unique identifier for the subscriber document. | Default Index |
| email | String | The email address of the subscriber. | Required, Unique |
| subscribedAt | Timestamp | Timestamp of when the user subscribed. | Default: Date.now |

