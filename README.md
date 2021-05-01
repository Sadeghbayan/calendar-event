## Event Calendar Project

A simple Vue.js application for fetching events and displaying station based on click.

## Instructions for the demo

- I decided to build the project with Vue and Typescript.
- I used Vue CLI to set up the project and built on the structure provided by it
- I used Fullcalendar(https://fullcalendar.io/) for the calendars and that was one of the challenges for me as well since the fullcalendar is not ready yet for Vue 3 I had to use with pure js and define with the help of `ref`.
- I created an Autocomplete component which accpet debouncing time and different events.
- I also created a Modal component where we can handle the booking detials view.
- I decided to create simple store(no Vuex) as it's very simple to have it with the Vue3 new features.
- I created a hook for Api calls and reused it for other hooks to collect needed data.
- I used native `fetch()` to consume the APIs.
- There is utils folder in root directory which contains some JS functions around reusable and available through all the application.
- `Source Sans Pro` font is using in the project.
- In order to use the `mixins`, and `variables` available on the Vue files I imported them in vue.config.js
- I used `BEM` naming convention and also define some colors to add personlity to the web application. :)

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
