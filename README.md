# Taxi app client

**[Application](https://lisovilya.github.io/loft-taxi/dist/)**

> Since the course server is not stable, the ability to log in `offline` has been added.
> 
> [Toggle switch to go offline](/src/images/offlineFeatureA.png)

| Login | Password |
| ----- | -------- |
| test@test.com | 123123 |

[**Example application provided by the course**](https://boring-mcclintock-9267da.netlify.com/)

## Description

With this application, you can [create an account](/src/images/registrationPage.jpg) or [log into](/src/images/authPage.jpg) an existing one, [add credit card details](/src/images/profilePage.jpg) and [build a route](/src/images/routePage.jpg) from the [addresses](/src/images/addressesPage.jpg) provided by the [server](https://loft-taxi.glitch.me/)


## Core technologies

- [React.js](https://reactjs.org/docs/getting-started.html)
- [React-redux](https://react-redux.js.org/)
- [React-router-dom](https://reactrouter.com/en/main)
- [CRA](https://create-react-app.dev/)
- [Redux-saga](https://redux-saga.js.org/)
- [Redux-actions](https://redux-actions.js.org/api/createaction)
- [Formik](https://formik.org/)
- [Sass](https://sass-lang.com/)
- [Jest](https://jestjs.io/)

## Server

**[Server](https://loft-taxi.glitch.me/)**
is used for authorization, saving credit card details, getting available addresses and routes

### Available requests: 
- `/auth` - log in
- `/register` - registration
- `/addressList` - returns a list of available addresses
- `/route` - returns an array of coordinates for the route

## Map

[Mapbox](https://www.mapbox.com/) service was used to work with the map. Using the [Mapbox GL](https://www.mapbox.com/mapbox-gljs) library, the map is displayed in the application and the route is built based on it

[Mapbox GL JS documentation](https://docs.mapbox.com/mapbox-gl-js/api/)

> For the service to work, you need to register, get a [token](https://docs.mapbox.com/help/getting-started/access-tokens/) and add it to the map component

```js
//src/Comonents/Map/index.jsx

mapboxGl.accessToken = mapboxToken
```

## Style

[Material-ui](https://mui.com/) library was used to style many elements. The colors and appearance of inputs, buttons and links are overridden by the [loft-taxi-mui-theme](https://github.com/satansdeer/loft-taxi-mui-theme) package

## Installation

### Clone repository
```
git clone https://github.com/LisovIlya/loft-taxi
```

### Installing modules
```
npm install
```

### Start development mode
```
npm run start
```

### Create a production app in the `/dist` folder

```
npm run build
```