'use client';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Button } from '../ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { changePageNumber } from '@/redux/features/room/roomSlice';

interface PaginationPropsType {
  page: number;
  numberOfPages: number;
}

export default function CustomPagination({
  page,
  numberOfPages,
}: PaginationPropsType) {
  const dispatch = useAppDispatch();

  // inc page count
  const incrementPageNumber = (currentPage: number) => {
    dispatch(changePageNumber(currentPage + 1));
  };

  // inc page count
  const decrementPageNumber = (currentPage: number) => {
    dispatch(changePageNumber(currentPage - 1));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            className="px-2 m-1"
            onClick={() => decrementPageNumber(page)}
            disabled={page === 1}
          >
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Button
            className="px-2 m-1"
            onClick={() => incrementPageNumber(page)}
            disabled={page === numberOfPages}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
