import { Info, Tag, UserRound } from "lucide-react";

import Section from "./Section";
import InfoItem from "./InfoItem";

export default function TourManagement({ tour }) {
  return (
    <Section
      icon={UserRound}
      title="Thông tin quản lý"
      description="Nhân viên và danh mục của tour"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoItem
          icon={UserRound}
          label="Nhân viên phụ trách"
          value={tour.nameStaff}
          iconClass="text-violet-500"
        />

        <InfoItem
          icon={Tag}
          label="Danh mục"
          value={tour.nameCategory}
          iconClass="text-blue-500"
        />

        <InfoItem icon={Info} label="Staff ID" value={tour.staffId} />

        <InfoItem icon={Tag} label="Category ID" value={tour.categoryId} />
      </div>
    </Section>
  );
}
