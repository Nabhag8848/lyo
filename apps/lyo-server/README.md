# Lyo Server

## Database ERD

```mermaid
erDiagram
  garment {
    uuid id PK
    timestamp without time zone createdAt
    timestamp without time zone updatedAt
    character varying garmentUrl
    character varying sourceUrl
    character varying brandName
    character varying garmentBrandName
    character varying garmentName
    text garmentDescription
    uuid userId FK
  }
  generation {
    uuid id PK
    timestamp without time zone createdAt
    timestamp without time zone updatedAt
    uuid jobId "External provider reference"
    character varying key
    character varying bucketName
    character varying contentType
    enum status
    uuid garmentId FK
    uuid avatarId FK
    uuid userId FK
  }
  avatar {
    uuid id PK
    timestamp without time zone createdAt
    timestamp without time zone updatedAt
    character varying key
    character varying bucketName
    character varying contentType
    boolean isSelected
    uuid referencePhotoId FK
    uuid userId FK
  }
  referencePhoto {
    uuid id PK
    timestamp without time zone createdAt
    timestamp without time zone updatedAt
    character varying key "S3 Object Key"
    character varying bucketName
    character varying contentType
    boolean isActive
    uuid userId FK
  }
  user {
    uuid id PK
    timestamp without time zone createdAt
    timestamp without time zone updatedAt
    character varying email
    character varying firstName
    character varying lastName
    character varying picture
    enum provider
    character varying providerId
    boolean isActive
    timestamp without time zone lastLoginAt
    character varying googleAccessToken
  }
  garment }|--|| user: user
  generation }|--|| garment: garment
  generation }|--|| avatar: avatar
  generation }|--|| user: user
  avatar }|--|| referencePhoto: referencePhoto
  avatar }|--|| user: user
  referencePhoto }|--|| user: user
```
