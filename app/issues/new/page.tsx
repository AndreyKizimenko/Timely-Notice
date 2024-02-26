import IssueForm from "../_components/IssueForm";

const NewIssuePage = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <IssueForm type="new" />;
      </div>
    </>
  );
};

export default NewIssuePage;
