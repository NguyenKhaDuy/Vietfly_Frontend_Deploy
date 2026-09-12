import TourCard from "./TourCard";

function TourGrid({ tours }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {tours.map((tour) => (
        <TourCard key={tour.idTour} tour={tour} />
      ))}
    </div>
  );
}

export default TourGrid;
