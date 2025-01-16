
# GraphQL TypeScript Proof of Concept

## Purpose

Learning GraphQL fundamentals, GraphQL Typescript integration and GraphQL multiple data sources querying.

### Use case

We will query users from two datasources: In memory database and JsonPlaceHolder API.

## Pre requisites

* Node.js (latest LTS version) required.

## Running project

* Open terminal and run:

```bash
    npm install
    npx ts-node src/index.ts
```

* Open web browser and join:

```text
   http://localhost:4000/graphql
```

* Type query examples on web site.

## API Reference and Query examples
[Diagrama](https://app.diagrams.net/#G1iCaptgCbyfrbVmzSaMnDwEFWh_Jbvyhs#%7B%22pageId%22%3A%22P3a4B8qZudd6z3f70aNR%22%7D)

### Examples

#### Query without params

Request:

```text
{
    welcome
}
```

Response:

```text
{
  "data": {
    "welcome": "Hello, world!"
  }
}
```

#### Getting user (All attributes) by id. Will returns a local database user

Request:

```text
{

    user(id: 1) {

        id

        name

        age
    }

}
```

Response:

```text
{
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "age": 28
    }
  }
}
```

#### Getting user (id and name by) id. Will returns an external API user

Request:

```text
{

    user(id: 5) {

        id

        name

    }

}
```

Response:

```text
{
  "data": {
    "user": {
      "id": 5,
      "name": "Chelsey Dietrich"
    }
  }
}
```

#### Getting local users (names and ages) list

Request:

```text
{

    users {
        name
        age
    }

}
```

Response:

```text
{
  "data": {
    "users": [
      {
        "name": "John Doe",
        "age": 28
      },
      {
        "name": "Jane Smith",
        "age": 34
      },
      {
        "name": "Jane Doe",
        "age": 22
      },
      {
        "name": "Patricia Lebsack",
        "age": 45
      }
    ]
  }
}
```

#### Getting matching users. Will return a user present in both data sources

Request:

```text
{
  matchingUsers(name: "Patricia Lebsack") {
    id
    name
    age
  }
}
```

Response:

```text
{
  "data": {
    "matchingUsers": [
      {
        "id": 4,
        "name": "Patricia Lebsack",
        "age": 45
      }
    ]
  }
}
```

## References

- [GraphQL official documentation](https://graphql.org/learn/)
- [GraphQL introduction video](https://www.youtube.com/watch?v=tqxvJfd69zs&t=305s)
- [JsonPlaceHolder users API](https://jsonplaceholder.typicode.com/users)

## Author

Versión 0.0.1 - Hernán Funes (hfunesdev AT gmail)
