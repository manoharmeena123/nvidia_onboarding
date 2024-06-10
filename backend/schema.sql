-- Create the users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    auth0_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    last_completed_step INTEGER DEFAULT '0',
    mobile_verified BOOLEAN DEFAULT FALSE,
    persona_verified BOOLEAN DEFAULT FALSE -- saving persona response too
);

-- Create the user_skills table
CREATE TABLE user_skills (
    user_id UUID PRIMARY KEY REFERENCES users(user_id),
    skills TEXT[],
    work_experience JSONB,
    education JSONB,
    languages JSONB,
    social_accounts TEXT[],
    cv_link VARCHAR(255)
);

-- Create the profiles table
CREATE TABLE profiles (
    profile_id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id),
    first_name VARCHAR(255) ,
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(25) ,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(20),
    lived_in_country VARCHAR(255) ,
    worked_in_country VARCHAR(255),
    date_of_birth DATE
);

-- Create the skills table
CREATE TABLE skills (
  key VARCHAR(255) PRIMARY KEY,
  value VARCHAR(255) NOT NULL
);


-- Create the user verification table
CREATE TABLE user_verifications (
  user_id UUID PRIMARY KEY,
  persona_response JSONB,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

