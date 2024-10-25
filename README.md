# The task 🧑‍💻

Your objective is to build a simple web application that fetches and displays a list of projects from a public API, using [Next.js](https://nextjs.org/docs) and [React](https://react.dev/).

The application should have two pages:

1. A page that lists projects.
2. A page that provides more detailed information about each project, such as device ID, latitude, longitude, and the time of the feed.

[Tailwind CSS](https://tailwindcss.com/docs) is set up for styling, and [Jest](https://jestjs.io/docs/getting-started) is included for testing. You may install additional packages if necessary, but we encourage you to use the existing ones to stay aligned with our tech stack.

**Time Estimate:** Aim to complete the task within **2-3 hours**.

## API background

The [API](https://app.swaggerhub.com/apis-docs/I2875/PM25_Open_Data/1.0.0#/Project/get_Project_Latest) you will be using is an open API that provides access to the LASS PM2.5 project, a large-scale initiative focused on global monitoring of PM2.5 levels.

**Particulate Matter (PM)** refers to a mixture of solid particles and liquid droplets in the air, categorized by particle size:

- **PM10**: Particles with a diameter of 10 μm or less. These particles are generally filtered by the nose and throat but can still impact respiratory health.
- **PM2.5**: Fine particles with a diameter of 2.5 μm or less. These particles are of greater concern for human health as they can penetrate deep into the lungs and may enter the bloodstream or brain.

The API provides measurement data for PM2.5, which is crucial for understanding and managing air quality and its effects on health.

**API documentation** can be found [here](https://app.swaggerhub.com/apis-docs/I2875/PM25_Open_Data/1.0.0#/Project/get_Project_Latest).

## Technical specification

You are required to create two pages (details below). Both pages should feature a hero banner at the top, which can be found in the `/public` folder.

Once your work is complete, upload your submission to a private GitHub repo and invite the interviewers’ accounts as collaborators (contact your recruiter for their GitHub usernames, if you haven’t received them).

### Page one

This page should fetch and display a list of all projects with their titles.

- **API endpoint** (docs [here](https://app.swaggerhub.com/apis-docs/I2875/PM25_Open_Data/1.0.0#/Project/get_Project_List)):
    
    ```bash
    https://pm25.lass-net.org/API-1.0.0/project/all/ 
    ```
    
- **Functionality**: Each project title should be clickable and navigate to the second page.
- **Note**: This data is updated *very infrequently* (approximately once per week).

### Page two

This page should fetch and display details for the given project title.

- **API endpoint** (docs [here](https://app.swaggerhub.com/apis-docs/I2875/PM25_Open_Data/1.0.0#/Project/get_Project_Latest)):
    
    ```bash
    https://pm25.lass-net.org/API-1.0.0/project/${projectTitle}/latest/ 
    ```
    
- **Functionality**:
    - Show the **total number of feed entries**.
    - If there are more than ten records, display the **ten latest feed entries**, otherwise display **all feed entries**.
    - Each feed entry should include:
        - **Device ID**
        - **Latitude**
        - **Longitude**
        - **Time of the entry**
- **Note**: This data is updated *somewhat infrequently* (approximately once per day).

## What does a successful submission look like?

We want to evaluate your use of TypeScript, unit testing, and your approach to data fetching and caching. While a fully polished app isn’t required, we would like to see some basic styling and UX considerations applied. Clearly document any outstanding tasks so another developer can easily continue from where you left off, and be prepared to discuss your decisions.

# Running the app 🚀

This repository provides a starter template for the task using [Next.js](https://nextjs.org/), initialized with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

**Note:** This template is configured to use the [App Router](https://nextjs.org/docs/app). However, you can switch to the [Pages Router](https://nextjs.org/docs/pages) if you prefer.

### Getting started

1. **Install dependencies**
    
    If you haven’t already, install the project dependencies by running:
    
    ```bash
    yarn install
    ```
    
2. **Start the development server**
    
    Launch the development server with:
    
    ```bash
    yarn dev
    ```
    
3. **View the app**
    
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000/) to view the app.
