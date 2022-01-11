import { Box, Button, Stack } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  isWide?: boolean;
}

export default function Pagination({ isWide }: PaginationProps) {
  return (
    <Stack
      direction={isWide ? "row" : "column"}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10 de 100</strong>
      </Box>
      <Stack direction="row" align="center" spacing="2">
        <PaginationItem number={1} isCurrent={true} />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
        <PaginationItem number={5} />
        <PaginationItem number={6} />
      </Stack>
    </Stack>
  );
}
