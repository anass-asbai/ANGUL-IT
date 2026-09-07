ngul-It 🛡️

Overview

Angul-It is an interactive multi-stage CAPTCHA web application designed to test and enhance user validation mechanisms through engaging visual and logical challenges. The application challenges users with various CAPTCHA stages—such as identifying images, solving small puzzles, or entering verification text—and displays the results at the end.

This project focuses on mastering Angular for building dynamic single-page applications with strong state management, form validation, and responsive UI.

Repository: https://learn.zone01oujda.ma/git/anasbai/angul-it

Getting Started (Installation without sudo)

Follow these steps to set up your environment, install Angular, and run the project locally.

1. Install Node.js (via NVM)

To avoid permission issues, use the Node Version Manager (NVM) to install Node and NPM:

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Reload your terminal profile
source ~/.zshrc

# Install the latest LTS version of Node.js
nvm install --lts


2. Install Angular CLI

With Node installed locally, install the Angular CLI globally:

npm install -g @angular/cli


3. Clone and Run the Project

# Clone the repository
git clone https://learn.zone01oujda.ma/git/anasbai/angul-it
cd angul-it

# Install project dependencies
npm install

# Start the development server
ng serve


Navigate to http://localhost:4200/ in your browser. The application will automatically reload if you change any of the source files.

Role Play

You are a frontend developer at a company developing innovative CAPTCHA systems to distinguish real users from bots. Your mission is to design a secure, interactive, and user-friendly CAPTCHA system that enhances user experience while maintaining strong security and validation integrity.

Learning Objectives

Master Angular fundamentals (components, services, routing, directives).

Implement multi-stage workflows and dynamic component interaction.

Apply form validation and user input control.

Use state management (services, local storage, or NgRx) to preserve progress.

Handle conditional navigation and access control between pages.

Ensure responsive design across devices.

Build reusable and modular components.

Write unit tests for components and services.

Core Features & Components

1. Components

HomeComponent: The entry point introducing the app and starting the challenge.

CaptchaComponent: The main interface displaying the CAPTCHA tasks.

ResultComponent: A results summary page displayed after completing all challenges.

2. Captcha Challenges

Features multiple CAPTCHA stages (e.g., select all images with cats).

Supports navigation between previous and next stages.

Validates user input rigorously before allowing progression.

3. Form Validation

Uses Angular form validation for every stage.

Prevents advancement without correct completion of the current challenge.

Displays clear error messages or hints for invalid inputs.

4. State Management

Maintains user progress using Angular services, local storage, or NgRx.

Preserves state across page refreshes.

Retrieves stored state upon reloading, resuming the session at the correct stage.

5. Results & Security

Displays a summary of completed challenges and overall performance.

Includes a Restart Challenge button for new sessions.

Route Guards: Blocks direct URL access to the results page without proper challenge completion, redirecting users to their current active challenge.

Constraints

Framework: Must use the latest version of Angular.

No External Libraries: Do not use external CAPTCHA libraries; all logic must be custom-built.

Persistence: State must persist across browser refreshes.

UI/UX: Must be responsive and accessible across devices.

Routing: All navigation must occur via Angular routing (no full page reloads).

Bonus Features

[ ] Diversify challenge types with random allocation per session (e.g., image selection, math problem-solving, text input).

[ ] Incorporate fluid animations for transitions between challenges.

[ ] Optimize the application for maximum responsiveness on mobile platforms.

[ ] Construct comprehensive unit tests for all components and services.

Resources

Angular Official Documentation

Angular CLI Guide

Reactive Forms in Angular

Angular Routing & Navigation

NgRx Store for State Management

Angular Material Components

Unit Testing in Angular