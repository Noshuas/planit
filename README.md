# This is [Plan.it](https://deployment-planit.vercel.app)

> This was originally a group project tackled by a team of 7 people where I was origianlly responsible for the UI and UX. Since project completion, I have refactored nearly the entire project. In addition to the regular code cleanup and bug fixes, I've changed the tech stack considerably, made several implementation and and design changes, and deployed the project [here on vercel](https://deployment-planit.vercel.app).
>
> Lastly, while functionality of the project has not changed very much, here is a diff of end-user features:
> - \- The theme switcher
> - \+ Responsive design
> - \+ Event Deletion
> - \+ More event information added to cards on the homescreen
> - \+ A GUI for selecting the event time range.
> - \+ A GUI for sheduling the event
> - \- Account creation with username and password
> - \+ Sign in with Google OAUTH (more secure)
> - \+ Sign in button has been added to the header
> - \+ Multiple page animations helping convey valuable information
>
> And here is a diff of changes made to the back end:
> - /- Express server
> - /+ Next.js serverless
> - /- Auth handled with Cookie.js and a custom react context provider for account information
> - /+ Auth handled with next-auth
> - /- Mongoose used for db calls
> - /+ Mongo connection is handled with standard mongo driver for compatibility with next-auth
>
> The following readme is outdated, but kept here to illustrate the project as it was. This is mostly for people not interested in diving through commit history. There are demos of the project in use before revision [at the bottom of the readme](#media). If you would like to view examples of the project as it is now, it is mostly the same with the exception of the changes listed above, but I encourage you to [visit the deployed app](https://deployment-planit.vercel.app) anyway.


This is a slightly groomed fork of [a repository that I worked on with a team](https://github.com/Kirk-Blue-Ocean/planit)! This web app is quite similar to whenisgood.net if you are familiar, but if you are not, that's okay too. **The problem that this application solves is planning an event around multiple schedules.** It can be difficult and sometimes *impossible* as an event organizer to find a time that works well for everyone, so we made a tool built on Next.js and React to help.

## To set up the repository

This repo uses mongoDB for persisting data, so you will first need to make sure that you have that installed and running on a computer.

Once you have forked and cloned the repo, run `` yarn client-build && yarn server``  in a fresh terminal. This will compile the resources for the production build and run the server.

## To use
To get started as an event organizer, create an account. **Once logged in, you can create an event by clicking the "Create Event" button** in the header of the page.  This will link you to the /create-event page, where you can fill out information about your event.

Once you have created the event, you can navigate back to the home page to see your event listed at the top of the page. From the home page, you can **click on the Share icon to copy the link to the clipboard**, you can **click on the pencil icon to take you to the edit page**, and you can **click on the chevron to see the event description.**

Once you are ready to start coordinating the event, send the link to the your friends and they can add their availability. **Once even one person's availability has been added, you can set the time for the event from the event page.** Anyone else that joins the event will be able to see the day that the event is being held. If they have not yet added their availability, they can still RSVP to the event.

## My responsibility

### UX/UI/Themeing
**My responsibility on this project included wireframing and translating the client's idea into an intuitive experience.** I spearheaded the effort with other front-end engineers on establishing a universal design language for the app, designing multiple page layouts to be put to a majority vote. For this, **I used LucidChart for it's ease of use, as well as for it's free accessibility** to make collaboration smoother.  **For implementation, I decided to use Material UI** to give me a larger scope of control over the design details on pages where I was not explicitly writing code (this being managed through [Material UI's themeProvider](https://mui.com/customization/theming/).).

### Home page
**In addition to UI/UX design responsibilities, I also was responsible for building out the Home page.** The main functionality of the Home page is to display the events that you have created, as well as give you quick access to other functionality integral to managing  events, such as copying event links, reading descriptions, and routing to the event page.

Because much of the home page's functionality is centered around events, a component I was not responsible for, I spent a lot of time up front working with the back-end devs on my team to create mock data that I could use for testing while I built out my page.

### Next.js Layout / Header
Furthermore, I was also responsible for implementing a [Next.js Layout.](https://nextjs.org/docs/basic-features/layouts) In Next.js, a layout consists of common components that you would like to pass to every page. This was an excellent feature, because **it allowed me to write only one header component for every page more easily** which could be passed around to different team members for use. Additionally, because all other pages were being wrapped with the layout, this was a good place for me to utilize the [themeProvider ](https://mui.com/customization/theming/) which is built off of React's Context.

While **the header includes site navigation to the most frequently visited pages** (Home page and the Event Creation page) like most headers, **it also includes a Easter egg at the request of the client**. If you click on the planet logo, a tray of colors will pull out from the left side of the screen. Selecting one of these colors will change the theme of the application on a site-wide level. Including a light and dark mode, there are 8 different color themes to choose from.

## Media

### Account Log in, Sign Up, and Theme Switcher:

https://user-images.githubusercontent.com/80430998/143348237-d67bfaaa-4306-4d7a-8a6b-35baf8d445cd.mp4

### Event Creation:

https://user-images.githubusercontent.com/80430998/143348475-d9e50c2d-1abd-437b-b745-e98222c77d2d.mp4

### Editing Events:

https://user-images.githubusercontent.com/80430998/143348752-e869ce85-4aef-4b60-a1bb-74e2d20100bf.mp4

### RSVPing to Events, Calender Widget:

https://user-images.githubusercontent.com/80430998/143349367-e49f159f-6309-478f-936e-e7513601a866.mp4

### Event Time Confirmation:

https://user-images.githubusercontent.com/80430998/143350040-478f7c50-71af-42ee-bc96-5979a0594fda.mp4


##
