import { Stack, Button, Box, Text } from '@chakra-ui/react'
import { Paginationitem } from './PaginantionItem';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

/** 
 * Função generatePagesArray
 * Cria um novo array com tamanho de to - from 
 * Percorre o array e retorna a soma do índice + página atual + 1
 * Se o número for maior do que 0, ele retorna o número
*/

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []


  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de<strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {currentPage > (1 + siblingsCount) && (
          <>
            <Paginationitem onPageChange={onPageChange} number={1} />
            { currentPage > (2 + siblingsCount) && 
              <Text color="gray.300" width="8" textAlign="center">...</Text>}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => (
          <Paginationitem onPageChange={onPageChange} key={page} number={page} />
        ))}

        <Paginationitem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => (
          <Paginationitem onPageChange={onPageChange} key={page} number={page} />
        ))}

        {currentPage + siblingsCount < lastPage && (
          <>
          {(currentPage + 1 + siblingsCount) < lastPage && 
            <Text color="gray.300" width="8" textAlign="center">...</Text>}
          <Paginationitem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  );
}