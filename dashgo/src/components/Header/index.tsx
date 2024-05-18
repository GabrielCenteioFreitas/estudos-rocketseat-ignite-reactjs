import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import Profile from "../Header/Profile";
import NotificationsNav from "../Header/NotificationsNav";
import SearchBox from "../Header/SearchBox";
import Logo from "../Header/Logo";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "@/contexts/SidebarDrawerContext";

export function Header() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}
      <Logo />

      {isWideVersion && (
        <SearchBox />
      )}

      <Flex align="center"  ml="auto">
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}