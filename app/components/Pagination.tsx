"use client";

import { Button, Text } from "@radix-ui/themes";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = Math.ceil(itemCount / pageSize);
  if (totalPages <= 1) return null;

  const setSearchQuery = (nextPage: number) => {
    const params = new URLSearchParams();
    if (searchParams.get("orderBy")) params.append("orderBy", searchParams.get("orderBy")!);
    if (searchParams.get("status")) params.append("status", searchParams.get("status")!);

    params.append("page", nextPage.toString());
    const query = params.size ? "?" + params.toString() : "";

    router.push("/issues/list" + query);
  };

  return (
    <div className="flex gap-2 items-center py-4">
      <Button disabled={currentPage === 1} onClick={() => setSearchQuery(1)}>
        <RxDoubleArrowLeft />
      </Button>
      <Button disabled={currentPage === 1} onClick={() => setSearchQuery(currentPage - 1)}>
        <MdKeyboardArrowLeft />
      </Button>

      <Text size={"1"}>
        Page {currentPage} / {totalPages}
      </Text>
      <Button disabled={currentPage === totalPages} onClick={() => setSearchQuery(currentPage + 1)}>
        <MdKeyboardArrowRight />
      </Button>
      <Button disabled={currentPage === totalPages} onClick={() => setSearchQuery(totalPages)}>
        <RxDoubleArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
