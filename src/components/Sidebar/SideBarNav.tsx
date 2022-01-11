import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";
import Section from "./Section";
import SectionLink from "./SectionLink";

export default function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <Section title="Geral">
        <SectionLink
          href="/dashboard"
          name="Dashboard"
          icon={RiDashboardLine}
        />
        <SectionLink href="/users" name="Usuários" icon={RiContactsLine} />
      </Section>
      <Section title="AUTOMAÇÃO">
        <SectionLink
          href="/forms"
          name="Formulários"
          icon={RiInputMethodLine}
        />
        <SectionLink
          href="/automation"
          name="Automação"
          icon={RiGitMergeLine}
        />
      </Section>
    </Stack>
  );
}
