import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";

const Pagination = ({ page, setPage, hasNextPage }) => {
  return (
    <>
      <ButtonGroup
        size="md"
        isAttached
        variant="outline"
        onClick={() => {
          setPage((page) => {
            if (page <= 1) {
              return 1;
            }
            return page - 1;
          });
        }}
        disabled={page === 1}
      >
        <IconButton aria-label="Add to friends" icon={<ChevronLeftIcon />} />
        <Button>{page}</Button>
        <IconButton
          aria-label="Add to friends"
          icon={<ChevronRightIcon />}
          disabled={!hasNextPage}
          onClick={() => {
            setPage((page) => {
              if (hasNextPage) {
                return page + 1;
              }
              return page;
            });
          }}
        />
      </ButtonGroup>
    </>
  );
};

export default Pagination;
