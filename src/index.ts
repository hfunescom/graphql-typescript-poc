import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

//Declaring queries and query objects
const schema = buildSchema(`
  type Query {
    welcome: String
    user(id: Int!): User
    users: [User]
    matchingUsers(name: String!): [User]
  }
  
  type User {
    id: Int
    name: String,
    username: String,
    age: Int
  }
`);

// Emulating local users data base
const localUsers = [
  { id: 1, name: 'John Doe', username: 'jdoe', age: 28 },
  { id: 2, name: 'Jane Smith', username: 'jsmith', age: 34 },
  { id: 3, name: 'Jane Doe', username: 'jadoe', age: 22 },
  { id: 4, name: 'Patricia Lebsack', username: 'plesback', age: 45 },
];

// Declaring API user object
type ExternalUser = {
  id: number;
  name: string;
};

// Resolvers
const resolvers = {
  // Querie without parameters
  welcome: () => {
    return 'Hello, world!';
  },
  // User (local or external) query
  user: async ({ id }: { id: number }) => {

    // If local user exists, return it
    const localUser = localUsers.find(user => user.id === id);

    if (localUser)
      return localUser;

    // If local user does not exist, looks for an external user
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const externalUser = await response.json() as ExternalUser;

    return {
      id: externalUser.id,
      name: externalUser.name,
      age: Math.floor(Math.random() * 50) + 20 
    };
  },
  // Local users query
  users: () => {
    return localUsers;
  },
  // User (both of them data sources) query
  matchingUsers: async ({ name }: { name: string }) => {
    
    //Getting local users
    const matchingLocalUsers = localUsers.filter(user => user.name === name);
   
    //Getting external users
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const externalUsers : ExternalUser[] = await response.json();
    const matchingExternalUsers = externalUsers.filter((user : ExternalUser) => user.name === name);
   
    //Getting matching users
    const combinedUsers = matchingLocalUsers.filter(localUser =>
      matchingExternalUsers.some(externalUser => externalUser.name === localUser.name)
    );
   
    //Normalizing data  
    const finalUsers = combinedUsers.map(localUser => {
      const externalUser = matchingExternalUsers.find(user => user.name === localUser.name);
      return {
        ...localUser,
        age: localUser.age || Math.floor(Math.random() * 50) + 20
      };
    });

    return finalUsers;
  }
};

// Configuring local server
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

// Running local server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
