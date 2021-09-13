import React from "react";

import VaultsProvider from "contexts/vaults/VaultsProvider";

const Providers: React.FC = ({ children }) => {
  return <VaultsProvider>{children}</VaultsProvider>;
};

export default Providers;
