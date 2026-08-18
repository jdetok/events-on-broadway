# Events on Broadway (STL) Website Source Code
- Commissioned by Events on Broadway St. Louis
- Developed/maintained by Justin DeKock April 2026-current
- [Public Site](https://eventsonbroadwaystl.com)

## Site architecture
- ### Data
    Important visible data used in the application is defined in `./data/eventsOnBroadwayData.json`
- ### React Frontend
    The site is a React (TypeScript) application bundled and tested with Vite/Vitest. React components are written in `./src/cmp` and nested directories. The React entrypoint (`main.tsx`) and other global files exist in `./src`. 
- ### Express Backend
    Express JS is utilized as the backend REST API for supporting form submission functionality, photo uploads for site owners, etc. Backend-specific code exists in `./src/api`
- ### Hosting
    The site is in early development as of 05/06/2026; a Docker container will be configured to serve the built site via NGINX when development is complete. The company will pay a small monthly fee to a virtual private server provider to run the container. 


## Main page screenshot
![main page screenshot](./data/img/screenshots/demo_05162026/desktop-home.png "page screenshot")

## Photo gallery screenshot (desktop)
![photo gallery screenshot](./data/img/screenshots/demo_05162026/desktop-gallery.png "photo gallery screenshot")
### Horizontal gallery (phone)
![photo gallery screenshot](./data/img/screenshots/demo_05162026/phone-gallery-horiz.png "photo gallery screenshot")

## Admin page (behind http basic auth)
#### Confirm Archive Image popup
![image archival confirmation popup screenshot](./data/img/screenshots/archive_img.png "photo gallery screenshot")

## Booking request form
#### (showing success message)
![booking form screenshot (showing success message)](./data/img/screenshots/demo_05162026/phone-form-success.png "photo gallery screenshot")
#### (showing error message)
![booking form screenshot (showing error message)](./data/img/screenshots/demo_05162026/phone-form-error.png "photo gallery screenshot")
