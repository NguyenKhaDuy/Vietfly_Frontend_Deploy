import BannerCard from "./BannerCard";

export default function BannerList({ banners, onPreview, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {banners.map((banner) => (
        <BannerCard
          key={banner.idBanner}
          banner={banner}
          onPreview={() => onPreview(banner)}
          onEdit={() => onEdit(banner)}
          onDelete={() => onDelete(banner)}
        />
      ))}
    </div>
  );
}
