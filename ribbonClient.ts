import { ApolloClient, InMemoryCache } from "@apollo/client";

const ribbonClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/kenchangh/ribbon-finance",
  cache: new InMemoryCache(),
});

export default ribbonClient;
