# Animetography-Blog

### This project has been archived and is being refactored and revamped in Angular 15 and NestJS.

## Preview-Images

![Landing Page](https://res.cloudinary.com/drgn2zip5/image/upload/v1632729443/gtnprakffse6odtwittt.png)

Landing Page

![Main Page](https://res.cloudinary.com/drgn2zip5/image/upload/v1632729460/sugingzcg1ufxrxjag3x.png)

Main Page

![Sign Up Page](https://res.cloudinary.com/drgn2zip5/image/upload/v1632732939/tsk27okrsow9xluevhd4.png)

Sign Up

![Login](https://res.cloudinary.com/drgn2zip5/image/upload/v1632732936/mgnx0qgoirvjckuzwh5z.png)

Login

![Mobile View](https://res.cloudinary.com/drgn2zip5/image/upload/v1632729431/aitieflwvpntiejdfbvn.png)

Mobile View

## Core Features

Basic Website Features:
* A video background landing page with text animation made using [animejs](https://animejs.com/).
* A blog preview page for all the blogs feaured on the website complete with animated preloader.
* A page dedicated to reading a particular blog post once clicked.
* An image gallery featuring all the images used in the posts with captions.
* A search bar that allows you to filter blog posts based on what you want to read, old or new...
* Pages for editing, deleting and creating blog posts and adding new images to the gallery but they're only for admins.

## Development Notes
Following are some key development features of the website:

- Built completely from the ground up using the MEAN Stack. (from front to back).
- User Authentication using PassportJS and OAuth2
- REST API implementation.
- npm as the package manager.
- CRUD Operations for Users, Gallery and Blog Posts.
- [CKEditor 5](https://ckeditor.com/ckeditor-5/) used for creating and editing blog posts.
- [Cloudinary](https://cloudinary.com/) to host images and other media.
- GIT to handle versioning.
- Node.js as the runtime server.

#### BACKEND:

- The database used to handle the backend storage is [mongodb](https://www.mongodb.com/).
- [mongoose](https://mongoosejs.com/) for the object modeling, validation and casting
- [Express JS](https://expressjs.com/) for REST API HTTP methods and server end routing and callbacks.
- [Multer](https://www.npmjs.com/package/multer) for handling the media/file uploads.

#### FRONT-END:

- [Angular 2+](https://angular.io/) is used for handling the front end requests, connection with db, routing, dependency injection and responsive templates.
- [Angular Material](https://material.angular.io/) to handle the front end design, color and themes and UI etc.
- [Angular Flex Layout](https://tburleson-layouts-demos.firebaseapp.com/#/docs) to handle the layout, responsiveness and UX of the website.
- [Ng Bootstrap](https://ng-bootstrap.github.io/#/home) to handle some basic UI features like navbar etc.
- [RxJS](https://rxjs.dev/guide/overview) library for creating asynchronous Services for HTTP methods and REST API callbacks.
- [Font Awesome](https://fontawesome.com/) for icons.
- Other front end technologies used include [SwiperJS](https://swiperjs.com/) gallery, Material Carousel, ShareIconsModule, Custom Page-to Page Animations and transitions, AuthGuards (for admin privileges) and animated preloaders etc.

