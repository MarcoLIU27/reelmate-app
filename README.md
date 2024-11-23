# ReelMates: A Party Movie Picker Web App

ReelMates is a collaborative movie selection platform designed to simplify group movie watching decisions. Developed by Haoyu Liu.

## Features

Our MVP provides the features below:
- **Questionnaire-Based User Preference Collection**
    
    Participants collaboratively complete a questionnaire to specify preferences, including genres, languages, release years, and exclusions. These preferences form the basis for movie recommendations.
    
- **Movie Database Integration**
    
    Seamlessly integrated with the TMDB API to fetch comprehensive movie details, provide filtering options, and dynamically recommend movies based on participant preferences and voting results.
    
- **Voting System with Dynamic Recommendations**
    
    Participants vote on a curated list of movies generated from TMDB. For each movie, the introduction and relevant information are displayed. Voting options include:
    
    - **"Watched and Liked"**: Adds the movie to the shortlist and expands the pool with similar movies.
    - **"Add to Shortlist"**: Manually selects a movie for further consideration.
    - **"Skip"**: Removes the movie from the pool.
    
    The system dynamically updates the candidate list with new recommendations until all movies have been voted on.
    
- **1v1 Comparison Voting**
    
    After initial voting, the shortlisted movies enter a head-to-head voting stage. Movies are paired in 1v1 comparisons, and participants vote until a final champion movie is selected. 



## Tech Stack

This app is based on:
- [Next.js](https://nextjs.org/)
- [Mantine](https://mantine.dev/)
- MongoDB for database management
- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## Setup

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
