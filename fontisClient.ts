import { ApolloClient, InMemoryCache } from "@apollo/client";

const fontisClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/fontus-god/fontis",
  cache: new InMemoryCache(),
});

export default fontisClient;
