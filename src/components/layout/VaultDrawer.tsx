import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAtom, atom } from "jotai";
import { vaultAtom } from "@/utils/atoms";

const DrawerExample = () => {
  const btnRef = useRef();
  const [vault, setVault] = useAtom(vaultAtom);
  console.log(
    "🚀 ~ file: VaultDrawer.tsx ~ line 18 ~ DrawerExample ~ vault",
    vault
  );
  const isOpen = vault !== "";
  // const isOpen = atom((get) => get(vaultAtom)) !== "";
  const onClose = () => setVault("");

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        zIndex="99999"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>{"Hello"}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerExample;
