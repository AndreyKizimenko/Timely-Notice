import { Button } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingNewIssuePage = () => {
  return (
    
      <div className="flex justify-center">
        <div className="w-2/5">
          <Skeleton height={"2rem"}/>
          <Skeleton height={"6rem"}/>
          <Button disabled>Add new issue</Button>
        </div>
      </div>
   
  );
};

export default LoadingNewIssuePage;
