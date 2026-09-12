import { Mail, Phone } from "lucide-react";

import Section from "./Section";
import InfoItem from "./InfoItem";

export default function TourContact({ tour }) {
  return (
    <Section
      icon={Phone}
      title="Thông tin liên hệ"
      description="Thông tin liên hệ của tour"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoItem
          icon={Phone}
          label="Số điện thoại"
          value={tour.contactPhone}
          iconClass="text-emerald-500"
        />

        <InfoItem
          icon={Mail}
          label="Email"
          value={tour.contactEmail}
          iconClass="text-blue-500"
        />
      </div>
    </Section>
  );
}
