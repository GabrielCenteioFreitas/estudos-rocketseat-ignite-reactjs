import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

const PaginationItem = ({ isCurrent = false, number, onPageChange }: PaginationItemProps) => {
  if(isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default'
        }}
        >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      color="white"
      bg="gray.700"
      _hover={{
        bg: "gray.500"
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}
 
export default PaginationItem;