import {
  Cloud,
  CloudRain,
  Droplets,
  Thermometer,
  Umbrella,
  Wind,
  Sun,
} from "lucide-react";

const weatherConfig = {
  SUNNY: {
    label: "Trời nắng",
    icon: Sun,
  },
  CLOUDY: {
    label: "Nhiều mây",
    icon: Cloud,
  },
  RAINY: {
    label: "Có mưa",
    icon: CloudRain,
  },
  PARTLY_CLOUDY: {
    label: "Mây rải rác",
    icon: Cloud,
  },
};

const formatNumber = (value, suffix = "") => {
  if (value === null || value === undefined || value === "") {
    return "--";
  }

  return `${Number(value).toFixed(1)}${suffix}`;
};

export default function TourWeather({ tour }) {
  const weather = weatherConfig[tour?.weather] || {
    label: tour?.weather || "Chưa cập nhật",
    icon: Cloud,
  };

  const WeatherIcon = weather.icon;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Thời tiết</h2>

            <p className="mt-1 text-sm text-slate-500">
              Dự báo cho ngày khởi hành
              {tour?.weatherForDate ? ` • ${tour.weatherForDate}` : ""}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <WeatherIcon size={25} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm">
                <WeatherIcon size={30} />
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  {weather.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {tour?.weatherType === "FORECAST"
                    ? "Dự báo thời tiết"
                    : "Thông tin thời tiết"}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatNumber(tour?.temperatureMax)}°
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">Cao nhất</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <WeatherItem
            icon={Thermometer}
            label="Nhiệt độ thấp"
            value={`${formatNumber(tour?.temperatureMin)}°C`}
          />

          <WeatherItem
            icon={Umbrella}
            label="Khả năng mưa"
            value={`${formatNumber(tour?.precipitationProbability)}%`}
          />

          <WeatherItem
            icon={Droplets}
            label="Lượng mưa"
            value={`${formatNumber(tour?.precipitationSum)} mm`}
          />

          <WeatherItem
            icon={Wind}
            label="Gió tối đa"
            value={`${formatNumber(tour?.windSpeedMax)} km/h`}
          />
        </div>

        {tour?.weatherUpdatedAt && (
          <p className="mt-5 text-xs text-slate-400">
            Cập nhật lúc {tour.weatherUpdatedAt}
          </p>
        )}
      </div>
    </section>
  );
}

function WeatherItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm">
        <Icon size={18} />
      </div>

      <p className="mt-3 text-xs text-slate-400">{label}</p>

      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}
