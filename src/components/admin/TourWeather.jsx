import {
  CalendarDays,
  CloudRain,
  CloudSun,
  RefreshCw,
  Tag,
  Thermometer,
  Wind,
} from "lucide-react";

import Section from "./Section";
import InfoItem from "./InfoItem";

function formatNumber(value, digits = 2) {
  if (value === null || value === undefined) {
    return "--";
  }

  return Number(value).toFixed(digits);
}

function formatWeather(weather) {
  const map = {
    CLEAR: "Trời quang",
    CLOUDY: "Nhiều mây",
    PARTLY_CLOUDY: "Có mây",
    RAIN: "Có mưa",
    DRIZZLE: "Mưa phùn",
    THUNDERSTORM: "Dông",
    SNOW: "Tuyết",
  };

  return map[weather] || weather || "--";
}

function formatWeatherType(type) {
  const map = {
    FORECAST: "Dự báo",
    CURRENT: "Hiện tại",
    HISTORICAL: "Lịch sử",
  };

  return map[type] || type || "--";
}

export default function TourWeather({ tour }) {
  return (
    <Section
      icon={CloudSun}
      title="Thông tin thời tiết"
      description="Dữ liệu thời tiết dự kiến cho ngày khởi hành"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* THỜI TIẾT */}
        <InfoItem
          icon={CloudSun}
          label="Thời tiết"
          value={formatWeather(tour?.weather)}
          iconClass="text-sky-500"
        />

        {/* NGÀY DỰ BÁO */}
        <InfoItem
          icon={CalendarDays}
          label="Dự báo ngày"
          value={tour?.weatherForDate || "--"}
          iconClass="text-blue-500"
        />

        {/* NHIỆT ĐỘ */}
        <InfoItem
          icon={Thermometer}
          label="Nhiệt độ"
          value={
            tour?.temperatureMin !== null &&
            tour?.temperatureMin !== undefined &&
            tour?.temperatureMax !== null &&
            tour?.temperatureMax !== undefined
              ? `${formatNumber(tour.temperatureMin)}°C - ${formatNumber(
                  tour.temperatureMax,
                )}°C`
              : "--"
          }
          iconClass="text-orange-500"
        />

        {/* XÁC SUẤT MƯA */}
        <InfoItem
          icon={CloudRain}
          label="Xác suất mưa"
          value={
            tour?.precipitationProbability !== null &&
            tour?.precipitationProbability !== undefined
              ? `${tour.precipitationProbability}%`
              : "--"
          }
          iconClass="text-blue-500"
        />

        {/* LƯỢNG MƯA */}
        <InfoItem
          icon={CloudRain}
          label="Lượng mưa"
          value={
            tour?.precipitationSum !== null &&
            tour?.precipitationSum !== undefined
              ? `${formatNumber(tour.precipitationSum)} mm`
              : "--"
          }
          iconClass="text-sky-500"
        />

        {/* GIÓ */}
        <InfoItem
          icon={Wind}
          label="Tốc độ gió tối đa"
          value={
            tour?.windSpeedMax !== null && tour?.windSpeedMax !== undefined
              ? `${formatNumber(tour.windSpeedMax)} km/h`
              : "--"
          }
          iconClass="text-cyan-500"
        />

        {/* LOẠI DỮ LIỆU */}
        <InfoItem
          icon={Tag}
          label="Loại dữ liệu"
          value={formatWeatherType(tour?.weatherType)}
          iconClass="text-violet-500"
        />

        {/* CẬP NHẬT */}
        <InfoItem
          icon={RefreshCw}
          label="Cập nhật"
          value={tour?.weatherUpdatedAt || "--"}
          iconClass="text-slate-500"
        />
      </div>
    </Section>
  );
}
