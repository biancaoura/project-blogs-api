# Blogs API Project

## Summary

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
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#additional-info">Additional Info</a></li>
  </ol>
</details>

## About The Project

Blog API,

RESTful API with CRUD operations, using MSC architecture.


> This is a project developed as part of my studies to help me learn about sequelize and JWT, mostly.

### Built With

![JavaScript][JavaScript.io]

[![NodeJS][NodeJS.io]][NodeJS-url]

[![Express][Express.io]][Express-url]

[![JWT][JWT.io]][JWT-url]

[![MySQL][MySQL.io]][MySQL-url]

[![Sequelize][Sequelize.io]][Sequelize-url]

[![Docker][Docker.io]][Docker-url]


## Getting Started
To run this project, it's recommended to use Docker

### Installation

1. Clone the repo
```
  git clone git@github.com:biancaoura/project-blogs-api.git
```
2. Run the docker services: `node` and `db`
```sh
  docker-compose up -d
```
3. Run the container
```
  docker exec -it blogs_api bash
```
4. Install npm packages
```
  npm install
```
5. Run the project
```
  npm start
```

## Usage

The `prestart` script will create the database and the tables according to what's in `/migrations` and `/seeders`.

All routes (except `post /login` and `post /user`) require authentication

### Login Route

#### POST `/login`
- Login
- The body should be as follows: 
```json
{
  "email": "example@email.com",
  "password": "123456"
}
```
  - Returns a token if the login is completed

### User Route

#### POST `/user`
- Creates a new user
- The body should be as follows, where:
  - `displayName` must have at least 8 characters
  - `email` must have a valid format
  - `password` must have at least 6 characters
  - `image` is optional
```json
{
  "displayName": "John Doe",
  "email": "example@email.com",
  "password": "123456",
  "image": "https://cdn1.iconfinder.com/data/icons/users-solid-1/30/users-solid-profile-neutral-5-512.png"
}
```
- If the user is successfully created, a token is given

#### GET `/user`
- Lists all users:
```json
[
  {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },

  /* ... */
]
```

#### GET `/user/:id`
- Takes a number parameter, and if there's any user with a corresponding id, returns it:
```json
{
  "id": 3,
  "displayName": "John Doe",
  "email": "example@email.com",
  "image": "https://cdn1.iconfinder.com/data/icons/users-solid-1/30/users-solid-profile-neutral-5-512.png"
}
```

#### DELETE `/user/me`
- Deletes current user
- If the user is successfully deleted, the status `204` is returned

### Categories Route

#### POST `/categories`
- Creates a new category
- The body should be as follows:
```json
{
  "name": "Magic Tricks"
}
```

#### GET `/categories`
- Lists all categories:
```json
[
  {
      "id": 1,
      "name": "Animals"
  },
  {
      "id": 2,
      "name": "Books"
  },

  /* ... */
]
```

### Post Route

#### POST `/post`
- Creates a new blog post
- The body should be as follows:
```json
{
  "title": "Review: The art of pigeon racing",
  "content": "This is a great book about how pigeons can be trained to become racing champions!",
  "categoryIds": [1, 2]
}
```

#### GET `/post`
- Lists all blog posts:
```json
[
  {
    "id": 1,
    "title": "Best dog breeds for hunting",
    "content": "Here are the best hunting companions",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Animals"
      }
    ]
  },
  
  /* ... */
]
```

#### GET `/post/:id`
- Takes a number parameter, and if there's any post with a corresponding id, returns it:
```json
{
  "id": 1,
  "title": "Best dog breeds for hunting",
  "content": "Here are the best hunting companions",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
      {
          "id": 1,
          "name": "Animals"
      }
  ]
}
```

#### GET `/post/search?q=:searchTerm`
- Searches posts by title or content, eg:
```json
  // GET /post/search?q=silk

  [
    {
      "id": 2,
      "title": "Great books about the Silk Road",
      "content": "These are some must-read books about the Silk Road",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 2,
          "name": "Books"
        }
      ]
    }
  ]
```
- If there's no query parameter, returns all posts:
```json
  // GET /post/search?q=

  [
    {
      "id": 1,
      "title": "Best dog breeds for hunting",
      "content": "Here are the best hunting companions",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Dogs"
        }
      ]
    },
    
    /* ... */
  ]
```

#### PUT `/post/:id`
- Edits an existing post
- The body should be as follows, where:
  - it's not possible to change the category
  - only the **author** can edit the post
```json
{
  "title": "How to make your house plants grow",
  "content": "This is a step-by-step guide to improve indoor plant growth"
}
```

#### DELETE `/post/:id`
- Deletes an existing post
- Only the author can delete the post
- If the post is successfully deleted, returns status `204`


## Additional Info
- This is a project developed at Trybe
- My first project using `sequelize` and `JWT`
> `docker-compose.yml`, `config.js` and `/seeders` files provided by Trybe

[JavaScript.io]: https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black
[Express.io]: https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white
[Express-url]: https://expressjs.com
[Sequelize.io]: https://img.shields.io/badge/sequelize-52B0E7?style=flat-square&logo=sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org
[JWT.io]: https://img.shields.io/badge/jwt-000000?style=flat-square&logo=jsonwebtokens&logoColor=white
[JWT-url]: https://jwt.io
[NodeJS.io]: https://img.shields.io/badge/node.js-339933?style=flat-square&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[MySQL.io]: https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com
[Docker.io]: https://img.shields.io/badge/docker-2496ED?style=flat-square&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com
