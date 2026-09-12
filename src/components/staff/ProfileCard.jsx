export default function ProfileCard({ user, role, status }) {
  const avatarText = user.fullName
    .split(" ")
    .map((item) => item[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white text-2xl font-bold text-cyan-600 shadow-xl">
            {avatarText}
          </div>

          {/* User */}
          <div className="text-white">
            <h2 className="text-xl font-bold">{user.fullName}</h2>

            <p className="mt-1 text-sm text-cyan-50">{user.email}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${role.className}`}
              >
                {role.label}
              </span>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
              >
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
