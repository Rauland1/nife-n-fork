import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader">
      <Image
        src="/loading.svg"
        width={100}
        height={100}
        alt="Loading..."
        priority
      />
    </div>
  );
};

export default Loader;
