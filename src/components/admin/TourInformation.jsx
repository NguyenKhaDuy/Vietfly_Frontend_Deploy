import { CalendarDays, Clock3, Info, MapPin, Tag, Users } from "lucide-react";

import Section from "./Section";
import InfoItem from "./InfoItem";

export default function TourInformation({ tour }) {
  return (
    <Section
      icon={Info}
      title="Thông tin tour"
      description="Thông tin cơ bản và phân loại"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* DANH MỤC */}
        <InfoItem
          icon={Tag}
          label="Danh mục"
          value={tour?.nameCategory || "--"}
          iconClass="text-blue-500"
        />

        {/* ĐIỂM ĐẾN */}
        <InfoItem
          icon={MapPin}
          label="Điểm đến"
          value={tour?.destination || "--"}
          iconClass="text-red-500"
        />

        {/* SỐ KHÁCH */}
        <InfoItem
          icon={Users}
          label="Số khách tối đa"
          value={
            tour?.maxPeople !== null && tour?.maxPeople !== undefined
              ? `${tour.maxPeople} khách`
              : "--"
          }
          iconClass="text-emerald-500"
        />

        {/* NGÀY KHỞI HÀNH */}
        <InfoItem
          icon={CalendarDays}
          label="Ngày khởi hành"
          value={tour?.dateDepart || "--"}
          iconClass="text-violet-500"
        />

        {/* GIỜ KHỞI HÀNH */}
        <InfoItem
          icon={Clock3}
          label="Giờ khởi hành"
          value={tour?.timeDepart?.substring(0, 5) || "--"}
          iconClass="text-orange-500"
        />

        {/* THỜI LƯỢNG */}
        <InfoItem
          icon={Clock3}
          label="Thời lượng"
          value={tour?.time || "--"}
          iconClass="text-cyan-500"
        />
      </div>
    </Section>
  );
}
