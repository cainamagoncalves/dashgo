import { Flex, useBreakpointValue } from '@chakra-ui/react'

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SeachBox';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth="1480px"
      h="20"
      mx="auto"
      mt="4"
      align="center"
    >
      <Logo />

      { isWideVersion && (
        <SearchBox />
      )}


      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />    
      </Flex>
    </Flex>
  );
}