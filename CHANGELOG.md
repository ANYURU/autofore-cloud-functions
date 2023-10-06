# Changelog

## Version 1.0.0 (2023-10-07)

### Features

- **appwrite**: Implement isUserRegistered function (06b7b19)
  - Added the implementation for the `isUserRegistered` cloud function.
  - Implemented phone number validation.
  - Added user existence checks.

- **appwrite**: Implement createUser function (14f3341)
  - Added the implementation for the `createUser` function.
  - Enabled the creation of new users with phone, password, and first name.
  - Interacts with the Appwrite service to handle user registration and profile creation.
  - Includes details on input validation and error handling.
  - Integration with the Appwrite API.
  - Permissions setup for user documents.

### Documentation

- **appwrite**: Update createUser function documentation (20f9b3c)
  - Updated the documentation for the `createUser` function.
  - Includes additional information, improved formatting, and corrected links.

### Chore

- **changelog**: Update changelog (c0dc05f)
- **changelog**: Update changelog (44b5df7)
- **changelog**: Populate changelog with initial content (8ff1773)
- **changelog**: Create an empty changelog (a85edd2)
- **appwrite**: Initialize user registration function with boilerplate code (5283c70)
- **chore**: Create user cloud function boilerplate (6025097)
