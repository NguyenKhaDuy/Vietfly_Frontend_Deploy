import { Image, Clock3, UserRound } from "lucide-react";

import BannerStatCard from "./BannerStatCard";

export default function BannerStats({ banners }) {
  const todayCount = banners.filter((item) =>
    item.createdAt?.startsWith("09/09/2026"),
  ).length;

  const userCount = new Set(banners.map((item) => item.idUser)).size;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <BannerStatCard
        icon={<Image size={20} />}
        title="Tổng Banner"
        value={banners.length}
        description="Banner trong hệ thống"
      />

      <BannerStatCard
        icon={<Clock3 size={20} />}
        title="Cập nhật gần đây"
        value={todayCount}
        description="Banner cập nhật hôm nay"
      />

      <BannerStatCard
        icon={<UserRound size={20} />}
        title="Người tạo"
        value={userCount}
        description="Tài khoản đã tạo banner"
      />
    </div>
  );
}
