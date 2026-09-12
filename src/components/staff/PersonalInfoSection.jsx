import { CalendarDays, Mail, Phone, UserRound } from "lucide-react";

import InfoItem from "./InfoItem";
import InputField from "./InputField";

export default function PersonalInfoSection({
  user,
  form,
  isEditing,
  setForm,
}) {
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDobDisplay = (value) => {
    if (!value) {
      return "";
    }

    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-");

      return `${day}/${month}/${year}`;
    }

    // DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return value;
    }

    return "";
  };

  const dobDisplayValue = formatDobDisplay(form.dob);

  const handleDobTextChange = (value) => {
    // Chỉ lấy số
    let numbers = value.replace(/\D/g, "");

    // Tối đa 8 số
    numbers = numbers.slice(0, 8);

    if (numbers.length < 8) {
      updateField("dob", "");
      return;
    }

    const day = numbers.slice(0, 2);
    const month = numbers.slice(2, 4);
    const year = numbers.slice(4, 8);

    updateField("dob", `${year}-${month}-${day}`);
  };

  const handleDobPickerChange = (value) => {
    // input type=date trả YYYY-MM-DD
    updateField("dob", value);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900">
          Thông tin cá nhân
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Các thông tin cơ bản của tài khoản.
        </p>
      </div>

      {isEditing ? (
        <div className="grid gap-5 md:grid-cols-2">
          <InputField
            icon={UserRound}
            label="Họ và tên"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />

          <InfoItem icon={Mail} label="EMAIL" value={user.email} />

          <InputField
            icon={Phone}
            label="Số điện thoại"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Ngày sinh
            </label>

            <div className="relative">
              <CalendarDays
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
              />

              <input
                id="dobDisplay"
                type="text"
                value={dobDisplayValue}
                placeholder="DD/MM/YYYY"
                maxLength={10}
                onChange={(e) => handleDobTextChange(e.target.value)}
                onClick={() => {
                  document.getElementById("dobPicker")?.showPicker?.();
                }}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
              />

              <input
                id="dobPicker"
                type="date"
                value={
                  /^\d{4}-\d{2}-\d{2}$/.test(form.dob || "") ? form.dob : ""
                }
                onChange={(e) => handleDobPickerChange(e.target.value)}
                className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0"
                tabIndex={-1}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <InfoItem icon={UserRound} label="HỌ VÀ TÊN" value={user.fullName} />

          <InfoItem icon={Mail} label="EMAIL" value={user.email} />

          <InfoItem icon={Phone} label="SỐ ĐIỆN THOẠI" value={user.phone} />

          <InfoItem
            icon={CalendarDays}
            label="NGÀY SINH"
            value={formatDobDisplay(user.dob)}
          />
        </div>
      )}
    </div>
  );
}
