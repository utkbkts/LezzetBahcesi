import RingLoader from "react-spinners/RingLoader";
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <RingLoader
        color={"black"}
        size={60}
        loading
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={1}
      />
    </div>
  );
}
