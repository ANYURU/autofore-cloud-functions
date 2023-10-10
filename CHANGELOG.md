# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2023-10-10

### Added

- **docs**: Update README with `getOtp` function documentation ([ee9528e](https://github.com/ANYURU/autofore-cloud-functions/commit/ee9528e43b83bac281c2d8a780110ed233d7425d))
  - Updated the README with documentation for the `getOtp` function.

- **docs**: Update README with `sendMessage` function documentation ([bbe02cd](https://github.com/ANYURU/autofore-cloud-functions/commit/bbe02cd8c0fb329a3afc72bd1ac2d7f8bd4be903))
  - Updated the README with documentation for the `sendMessage` function.

- **feat(appwrite)**: Implement message sending function ([3693d96](https://github.com/ANYURU/autofore-cloud-functions/commit/3693d96883664532b720e3aa131c0138fa48625a))
  - Added the implementation for the message sending function.
  - Enables sending messages to a specified phone number.
  - Validates input data (phone, message).
  - Handles successful responses and error scenarios.

- **chore(appwrite)**: Initialize `sendMessage` appwrite function ([734b2e0](https://github.com/ANYURU/autofore-cloud-functions/commit/734b2e0247fc02ef54604e5965e017bf0fe73755))
  - Set up the initial structure and boilerplate for the `sendMessage` function.

- **feat(appwrite)**: Implement OTP verification function ([7add758](https://github.com/ANYURU/autofore-cloud-functions/commit/7add75894ac8ecbd5153c41a2e7eb482de02e4b4))
  - Added the implementation for the OTP verification function.
  - Allows users to verify an OTP sent to their phone number.
  - Validates input data, decodes the verification key, and checks OTP validity.
  - Handles error scenarios and provides appropriate responses.

- **chore**: Initialize OTP verification function ([2041571](https://github.com/ANYURU/autofore-cloud-functions/commit/20415716bb83856f5450e2a6907f9b6318a218ce))
  - Created an initial boilerplate for the OTP verification function.

- **fix(appwrite)**: Get OTP function ([3d74468](https://github.com/ANYURU/autofore-cloud-functions/commit/3d7446872cc87a93417fc1850b21a32d1f5b5597))
  - Fixed inconsistencies in environment variables, changed dynamic imports to named imports, and improved error handling.

- **feat(appwrite)**: Implement `getOtp` function ([87e0753](https://github.com/ANYURU/autofore-cloud-functions/commit/87e0753f042f442c09a3d33b387ccca6949c9c6a))
  - Added the implementation for the `getOtp` function.
  - Sends a message with an OTP on password recovery and phone verification.

- **chore(appwrite)**: Initialize user registration function with boilerplate code ([7963259](https://github.com/ANYURU/autofore-cloud-functions/commit/7963259f8d78b0872e65ad544a571362a2e12100))
  - Set up the initial structure and boilerplate for the user registration function.

- **feat(appwrite)**: Password reset function implementation ([ddf9d8](https://github.com/ANYURU/autofore-cloud-functions/commit/ddf9d8e24037334b5553317c4d9fd27a230df654))
  - Added the implementation for the password reset function.
  - Allows users to reset their password by providing their phone number and a new password.

### Chore

- **changelog**: Update changelog for version 1.0.0 ([8dceef5](https://github.com/ANYURU/autofore-cloud-functions/commit/8dceef56327cda11015425233cafa8a08cc0f098))
  - Updated the changelog for version 1.0.0 with details about new features, documentation updates, and chore tasks.
  - Linked commits to specific changes in the changelog.

- **changelog**: Update changelog links ([23127cb](https://github.com/ANYURU/autofore-cloud-functions/commit/23127cb2bf5932eaac70ab561976fb568db84639))
  - Updated the changelog with version 1.0.0 and included links to individual commits for each change category.
  - Added links to feature, documentation, and chore sections.

- **changelog**: Update changelog for recent changes ([feb5a9f](https://github.com/ANYURU/autofore-cloud-functions/commit/feb5a9fffb840f97cf267907952a0da6a3543c1b))
  - Updated the changelog to document the recent changes made to the project.
  - Added entries for the `isUserRegistered` and `createUser` functions.
  - Updated documentation for the `createUser` function.
  - Included chore tasks related to the changelog itself.

- **changelog**: Populate changelog with initial content ([8ff1773](https://github.com/ANYURU/autofore-cloud-functions/commit/8ff1773c09b83bfbca6d7c9a61887efb4d683db6))
  - Initial population of the changelog with initial content.

- **changelog**: Create an empty changelog ([a85edd2](https://github.com/ANYURU/autofore-cloud-functions/commit/a85edd2d4c23e5867a3b0d81dd44b3eaa9a2b440))
  - Created an empty changelog.

- **docs(appwrite)**: Update `createUser` function documentation ([20f9b3c](https://github.com/ANYURU/autofore-cloud-functions/commit/20f9b3cae9a4a060b69ce6024fd93ef74b315deb))
  - Updated the documentation for the `createUser` function.
  - Improved formatting and corrected links.

- **chore(appwrite)**: Initialize user registration function with boilerplate code ([5283c70](https://github.com/ANYURU/autofore-cloud-functions/commit/5283c70f63393bd0e41c5bae4ccce70444d108f2))
  - Set up the initial structure and boilerplate for the user registration check function.

- **feat(appwrite)**: Implement `isUserRegistered` function ([06b7b19](https://github.com/ANYURU/autofore-cloud-functions/commit/06b7b19fce6c6b93d7efb6966111a6af528d4047))
  - Added the implementation for the `isUserRegistered` function.
  - Implemented phone number validation and user existence checks.

- **chore**: Update changelog ([c0dc05f](https://github.com/ANYURU/autofore-cloud-functions/commit/c0dc05fd30191b166ee0810e0462d3730c6665a4))
  - Updated the changelog.

- **chore**: Update changelog ([44b5df7](https://github.com/ANYURU/autofore-cloud-functions/commit/44b5df7002db139db6d8be0f6d8ecdd03d7ef957))
  - Updated the changelog.


- **chore**: Create user cloud function boilerplate ([6025097](https://github.com/ANYURU/autofore-cloud-functions/commit/60250975daec498e364ce73ce44cf5fa30684eab))
  - Created a user cloud function boilerplate.

[1.0.0]: https://github.com/ANYURU/autofore-cloud-functions/releases/tag/1.0.0
