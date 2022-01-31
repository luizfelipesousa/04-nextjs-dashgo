import { Box, Text, Stack } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  isWide?: boolean;
  totalCountOfRegisters: number;
  currentPage?: number;
  registerPerPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePage(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export default function Pagination({
  isWide,
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registerPerPage = 10,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);

  const previousPage =
    currentPage > 1
      ? generatePage(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPage =
    currentPage < lastPage
      ? generatePage(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={isWide ? "row" : "column"}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>{(currentPage - 1) * 10 + 1}</strong> -{" "}
        <strong>
          {currentPage * registerPerPage} de {totalCountOfRegisters}
        </strong>
      </Box>
      <Stack direction="row" align="center" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => {
            return (
              <PaginationItem
                number={page}
                key={page}
                onPageChange={onPageChange}
              />
            );
          })}
        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPage.length < lastPage &&
          nextPage.map((page) => {
            return (
              <PaginationItem
                number={page}
                key={page}
                onPageChange={onPageChange}
              />
            );
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {lastPage > currentPage + 1 + siblingsCount && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
