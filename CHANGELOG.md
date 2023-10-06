# Changelog

## Version 1.0.0 (2023-10-07)

### Features

- **appwrite**: Implement isUserRegistered function ([06b7b19](https://github.com/ANYURU/autofore-cloud-functions/commit/06b7b19fce6c6b93d7efb6966111a6af528d4047))
  - Added the implementation for the `isUserRegistered` cloud function.
  - Implemented phone number validation.
  - Added user existence checks.

- **appwrite**: Implement createUser function ([14f3341](https://github.com/ANYURU/autofore-cloud-functions/commit/14f3341f68ecce6db7619ccd4d7e3ce2f27da198))
  - Added the implementation for the `createUser` function.
  - Enabled the creation of new users with phone, password, and first name.
  - Interacts with the Appwrite service to handle user registration and profile creation.
  - Includes details on input validation and error handling.
  - Integration with the Appwrite API.
  - Permissions setup for user documents.

### Documentation

- **appwrite**: Update createUser function documentation ([20f9b3c](https://github.com/ANYURU/autofore-cloud-functions/commit/20f9b3cae9a4a060b69ce6024fd93ef74b315deb))
  - Updated the documentation for the `createUser` function.
  - Includes additional information, improved formatting, and corrected links.

### Chore

- **changelog**: Update changelog ([c0dc05f](https://github.com/ANYURU/autofore-cloud-functions/commit/c0dc05fd30191b166ee0810e0462d3730c6665a4))
- **changelog**: Update changelog ([44b5df7](https://github.com/ANYURU/autofore-cloud-functions/commit/44b5df7002db139db6d8be0f6d8ecdd03d7ef957))
- **changelog**: Populate changelog with initial content ([8ff1773](https://github.com/ANYURU/autofore-cloud-functions/commit/8ff1773c09b83bfbca6d7c9a61887efb4d683db6))
- **changelog**: Create an empty changelog ([a85edd2](https://github.com/ANYURU/autofore-cloud-functions/commit/a85edd2d4c23e5867a3b0d81dd44b3eaa9a2b440))
- **appwrite**: Initialize user registration function with boilerplate code ([5283c70](https://github.com/ANYURU/autofore-cloud-functions/commit/5283c70f63393bd0e41c5bae4ccce70444d108f2))
- **chore**: Create user cloud function boilerplate ([6025097](https://github.com/ANYURU/autofore-cloud-functions/commit/60250975daec498e364ce73ce44cf5fa30684eab))
