import Suggestion from "./Suggestion";

const Suggestions = ({ data }) => {
  return (
    <>
      <Suggestion
        header={"Try the local couisine"}
        subtitle={"The best dishes around your area"}
        suggestions={data.filter((item, index) => index <= 8)}
      />
      <Suggestion
        header={"How about something spicy?"}
        subtitle={"Lorem ipsum dolor sit amet."}
        suggestions={data.filter((item, index) => index >= 9 && index <= 18)}
      />
    </>
  );
};

export default Suggestions;
