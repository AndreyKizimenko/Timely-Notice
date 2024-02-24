import { Skeleton } from "@/app/components";

const LoadingIssueDescription = () => {
  return (
    <div className="flex justify-center">
      <div className="w-5/6">
        <Skeleton width={"24rem"} height={"2rem"}/>
        <div className="flex mt-2 gap-5">
          <Skeleton width={"4rem"} />
          <Skeleton width={"8rem"} />
        </div>
        <div className="mt-10 w-4/6">
          <Skeleton count={3} />
        </div>
      </div>
    </div>
  );
};

export default LoadingIssueDescription;
