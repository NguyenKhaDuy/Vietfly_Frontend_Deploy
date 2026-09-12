import {
  CalendarDays,
  CheckCircle2,
  Info,
  RefreshCw,
  Tag,
  UserRound,
} from "lucide-react";

import Section from "./Section";
import InfoItem from "./InfoItem";

export default function TourSystemInfo({ tour, status }) {
  return (
    <Section
      icon={Info}
      title="Thông tin hệ thống"
      description="Thông tin quản lý và cập nhật"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <InfoItem icon={Info} label="ID Tour" value={tour.idTour} />

        <InfoItem icon={UserRound} label="Staff ID" value={tour.staffId} />

        <InfoItem icon={Tag} label="Category ID" value={tour.categoryId} />

        <InfoItem icon={CalendarDays} label="Ngày tạo" value={tour.createdAt} />

        <InfoItem
          icon={RefreshCw}
          label="Cập nhật lần cuối"
          value={tour.updatedAt}
        />

        <InfoItem
          icon={CheckCircle2}
          label="Trạng thái"
          value={status.label}
          iconClass="text-emerald-500"
        />
      </div>
    </Section>
  );
}
