# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2023-10-07

### Added

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

- **changelog**: Update changelog links ([23127cb2](https://github.com/ANYURU/autofore-cloud-functions/commit/23127cb2bf5932eaac70ab561976fb568db84639))
  - Updated the changelog with version 1.0.0 and included links to individual commits for each change category, making it easier to access detailed information.
  - Added links to feature, documentation, and chore sections.
  - Linked commits to specific changes.

- **changelog**: Update changelog for recent changes ([feb5a9ff](https://github.com/ANYURU/autofore-cloud-functions/commit/feb5a9fffb840f97cf267907952a0da6a3543c1b))
  - Updated the changelog to document the recent changes made to the project. It includes information about new features, documentation updates, and chore tasks.
  - Added entries for the `isUserRegistered` and `createUser` functions.
  - Updated documentation for the `createUser` function.
  - Included chore tasks related to the changelog itself.

- **changelog**: Populate changelog with initial content ([8ff1773](https://github.com/ANYURU/autofore-cloud-functions/commit/8ff1773c09b83bfbca6d7c9a61887efb4d683db6))
  - Initial population of the changelog with initial content.

- **changelog**: Create an empty changelog ([a85edd2](https://github.com/ANYURU/autofore-cloud-functions/commit/a85edd2d4c23e5867a3b0d81dd44b3eaa9a2b440))
  - Created an empty changelog.

- **appwrite**: Initialize user registration function with boilerplate code ([5283c70](https://github.com/ANYURU/autofore-cloud-functions/commit/5283c70f63393bd0e41c5bae4ccce70444d108f2))
  - Set up the initial structure and boilerplate for the user registration check function.

- **chore**: Create user cloud function boilerplate ([6025097](https://github.com/ANYURU/autofore-cloud-functions/commit/60250975daec498e364ce73ce44cf5fa30684eab))
  - Created a user cloud function boilerplate.
