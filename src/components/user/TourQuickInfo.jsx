import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import InfoItem from "./InfoItem";

export default function TourQuickInfo({ tour }) {
  const maxPeople = tour?.maxPeople;

  const departureDate = tour?.dateDepart || "Chưa cập nhật";
  const departureTime = tour?.timeDepart || "";

  const departure =
    departureTime
      ? `${departureDate} - ${departureTime.slice(0, 5)}`
      : departureDate;

  const people =
    maxPeople !== null &&
    maxPeople !== undefined
      ? `Tối đa ${maxPeople} người`
      : "Chưa cập nhật";

  return (
    <div
      className="
        mb-12
        grid
        grid-cols-2
        gap-3
        md:grid-cols-4
      "
    >
      <InfoItem
        icon={<Clock3 size={19} />}
        label="Thời lượng"
        value={tour?.time || tour?.duration || "Chưa cập nhật"}
      />

      <InfoItem
        icon={<Users size={19} />}
        label="Số người"
        value={people}
      />

      <InfoItem
        icon={<CalendarDays size={19} />}
        label="Khởi hành"
        value={departure}
      />

      <InfoItem
        icon={<MapPin size={19} />}
        label="Điểm đến"
        value={tour?.destination || "Chưa cập nhật"}
      />
    </div>
  );
}
