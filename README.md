<a name="readme-top"></a>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lukin-eitan/mern-baseline">
    <img src="assets/mern-baseline-logo.jpg" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">MERN Baseline</h3>

  <p align="center">
    A great starting point for any project using the <a href="https://www.mongodb.com/mern-stack"><strong>MERN</strong></a> Stack.
    <br />
    <a href="https://github.com/lukin-eitan/mern-baseline"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lukin-eitan/mern-baseline/issues">Report Bug</a>
    ·
    <a href="https://github.com/lukin-eitan/mern-baseline/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This "baseline" should be a sufficient fullstack backbone for any project. The end goal is to provide an initial code base that is production grade. Users need only add their core logic, environment variables and do some UX/UI work to adapt to their needs.

This project includes various features needed for any web application, including but not limited to:

#### General

- Linters
- Automatic pre-commit hooks
- Environment setup with Makefile to setup the project effortlessly

#### Backend

- User Authentication/Authorization
- Routing
- Security Features
- Error Handling
- Advanced Logging with support for 3rd party Log Managers
- DB with user and session (encrypted) tables.
- Support for test mode with in-memory DB

#### Frontend

- Single Page App (SPA)
- React Router for routing
- React Query for communicating with server and caching API calls
- Navigation Bar
- Typical pages (Home, Profile, Account, Dashboard, Sign Up, Sign In)
- Material UI

![product-home-screenshot]
![product-sign-up-screenshot]
![product-sign-in-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![Mongodb][Mongodb]][Mongodb-url]
[![Express][Express.js]][Express-url]
[![React][React.js]][React-url]
[![Node][Node.js]][Node-url]

### Powered By

[![Typescript][Typescript]][Typescript-url]
[![Passport][Passport.js]][Passport-url]
[![Winston][Winston]][Winston-url]
[![Morgan][Morgan]][Morgan-url]
[![Mongoose][Mongoose]][Mongoose-url]
[![ESLint][ESLint]][ESLint-url]
[![Mongo-Memory-Server][Mongo-Memory-Server]][Mongo-Memory-Server-url]
[![MUI][MUI]][MUI-url]
[![React-Query][React-Query]][React-Query-url]
[![React-Router][React-Router]][React-Router-url]
[![Axios][Axios]][Axios-url]
[![Vite][Vite]][Vite-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This project starter comes with all of the tools needed to get going as fast as possible. Included at the root of the repo is a `setup.zsh` file and a `Makefile` to run/create all peripheral tools/packages.

### Prerequisites

Start by installing <a href="https://nodejs.org/en/download"><strong>Node.js</strong></a>
if it is not installed yet. Feel free to use any other package manager that you are familiar with.

#### Optional

Although it is not necessary to start things off, I do recommend installing mongodb and signing up to <a href="https://www.mongodb.com/docs/atlas/getting-started/"><strong>Atlas</strong></a> (all free). It is preferable that you have a valid connection string to your DB in the cloud, but if you choose to start off without this, the app will default to using mongo server in-memory.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lukin-eitan/mern-baseline.git
   ```
2. Source the setup file (this creates the `PROJECT_ROOT` environment variable)
   ```sh
   cd mern-baseline
   source setup.zsh
   ```
3. Setup project. This will:
   - Install all npm packages for both server and client
   - Generate the .env files for both server and client
   - Install husky to run pre-commit linter git hooks for both server and client
   ```sh
   cd $PROJECT_ROOT
   make setup_project
   ```
4. (Optional) Fill in the env files with your secrets/tokens.
   ```sh
   $PROJECT_ROOT/client/.env
   $PROJECT_ROOT/server/.env
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

After installation, it is as simple as opening two different shells and running the following:

```sh
cd $PROJECT_ROOT/client
npm run dev
```

```sh
cd $PROJECT_ROOT/server
npm run dev
```

If the .env files (in client and server) were left untouched, the app will run in test mode using mongo memory server and sessions will not be encrypted.
In order to get full functionality, populate the .env files.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- Incorporate tests (Jest) and add to husky precommit
- Upload profile picture instead of uploading image url (initially support Cloudinary)
- Richer Documentation
- Built-in AWS support
- Support for Performance Monitoring/Incident Managers in production

See the [open issues](https://github.com/lukin-eitan/mern-baseline/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/lukin-eitan/mern-baseline](https://github.com/lukin-eitan/mern-baseline)

LinkedIn: [![LinkedIn][linkedin-shield]][linkedin-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & assets -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-home-screenshot]: assets/mern-baseline-home-screenshot.png
[product-sign-up-screenshot]: assets/mern-baseline-sign-up-screenshot.png
[product-sign-in-screenshot]: assets/mern-baseline-sign-in-screenshot.png
[forks-shield]: https://img.shields.io/github/forks/lukin-eitan/mern-baseline.svg?style=for-the-badge
[forks-url]: https://github.com/lukin-eitan/mern-baseline/network/members
[stars-shield]: https://img.shields.io/github/stars/lukin-eitan/mern-baseline.svg?style=for-the-badge
[stars-url]: https://github.com/lukin-eitan/mern-baseline/stargazers
[issues-shield]: https://img.shields.io/github/issues/lukin-eitan/mern-baseline.svg?style=for-the-badge
[issues-url]: https://github.com/lukin-eitan/mern-baseline/issues
[license-shield]: https://img.shields.io/github/license/lukin-eitan/mern-baseline.svg?style=for-the-badge
[license-url]: https://github.com/lukin-eitan/mern-baseline/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/eitan-lukin/

<!-- Primary Stack -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js&logoColor=68a063
[Node-url]: https://nodejs.org/
[Mongodb]: https://img.shields.io/badge/Mongodb-20232A?style=for-the-badge&logo=mongodb&logoColor=4DB33D
[Mongodb-url]: https://www.mongodb.com/
[Express.js]: https://img.shields.io/badge/Express.js-20232A?style=for-the-badge&logo=express&logoColor=000000
[Express-url]: https://expressjs.com/

<!-- Secondary Stack -->

[Passport.js]: https://img.shields.io/badge/Passport.js-20232A?style=for-the-badge&logo=passport
[Passport-url]: https://www.passportjs.org/
[Winston]: https://img.shields.io/badge/Winston-20232A?style=for-the-badge&logo=winston
[Winston-url]: https://www.npmjs.com/package/winston
[Morgan]: https://img.shields.io/badge/Morgan-20232A?style=for-the-badge&logo=morgan
[Morgan-url]: https://www.npmjs.com/package/morgan
[Mongoose]: https://img.shields.io/badge/Mongoose-20232A?style=for-the-badge&logo=mongoose
[Mongoose-url]: https://mongoosejs.com/
[ESLint]: https://img.shields.io/badge/ESLint-20232A?style=for-the-badge&logo=eslint
[ESLint-url]: https://eslint.org/docs/latest/use/getting-started
[Mongo-Memory-Server]: https://img.shields.io/badge/Mongo_Memory_Server-20232A?style=for-the-badge&logo=mongo-memory-server
[Mongo-Memory-Server-url]: https://www.npmjs.com/package/mongodb-memory-server
[Typescript]: https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=typescript
[Typescript-url]: https://www.typescriptlang.org/
[MUI]: https://img.shields.io/badge/MaterialUI-20232A?style=for-the-badge&logo=mui
[MUI-url]: https://mui.com/
[React-Query]: https://img.shields.io/badge/React_Query-20232A?style=for-the-badge&logo=reactquery
[React-Query-url]: https://tanstack.com/query/latest
[React-Router]: https://img.shields.io/badge/React_Router-20232A?style=for-the-badge&logo=reactrouter
[React-Router-url]: https://www.npmjs.com/package/react-router-dom
[Axios]: https://img.shields.io/badge/Axios-20232A?style=for-the-badge&logo=axios
[Axios-url]: https://axios-http.com/
[Vite]: https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite
[Vite-url]: https://vitejs.dev/
