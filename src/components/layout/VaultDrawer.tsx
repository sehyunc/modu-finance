import VaultForm from "@/components/VaultForm";
import { vaultAtom } from "@/utils/atoms";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

const DrawerExample = () => {
  const [vault, setVault] = useAtom(vaultAtom);
  const isOpen = vault !== "";
  const onClose = () => setVault("");

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        zIndex="99999"
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent bg="#1c1a19">
          <DrawerCloseButton />
          <DrawerHeader>{vault}</DrawerHeader>

          <DrawerBody>
            <VStack align="flex-start" spacing="4">
              <VaultForm />
              <Heading size="md">Vault Strategy</Heading>
              <Text>
                This vault earns yield on its ETH deposits by running an
                automated ETH covered call strategy. Put simply, the vault mints
                out-of-the-money ETH call options on Opyn on a weekly basis and
                sells these options to market makers for a fee (the market price
                of the option, also known as the option premium). The vault
                repeats this process on a weekly basis and reinvests the income
                earned from selling options to mint new options, effectively
                compounding the yields for depositors over time. The vault has a
                manager who selects the strike price for the call options minted
                by the vault. The manager is responsible for making the best
                tradeoff between yield versus the risk of the call options
                getting exercised.
              </Text>
            </VStack>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerExample;
