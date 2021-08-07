import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} children="Dashboard" />
        <NavLink icon={RiContactsLine} children="Usuários" />
      </NavSection>
      <NavSection title="AUTOMAÇÃO">
        <Stack spacing="4" mt="8" align="stretch">
          <NavLink icon={RiInputMethodLine} children="Formulários" />
          <NavLink icon={RiGitMergeLine} children="Automação" />
        </Stack>
      </NavSection>
    </Stack>
  );
}