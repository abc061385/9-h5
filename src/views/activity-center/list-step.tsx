import { Icon } from "@/components/icon";

const ListStepBox = () => {
  const list = [
    {
      date: "2025-08-05",
      country: "Japan",
      city: "Tokyo",
      flag: "🇯🇵",
      status: "open",
      description:
        "The Tokyo Activity Center connects users in East Asia with offline mentorship programs.",
    },
    {
      date: "2025-09-15",
      country: "UAE",
      city: "Dubai",
      flag: "🇦🇪",
      status: "open",
      description:
        "The Dubai Activity Center provides services for users in the Middle East and North Africa.",
    },
    {
      date: "2025-10-01",
      country: "Brazil",
      city: "São Paulo",
      flag: "🇧🇷",
      status: "open",
      description:
        "The São Paulo Activity Center serves as the hub for South American users.",
    },
    {
      date: null,
      country: "South Korea",
      city: "Seoul",
      flag: "🇰🇷",
      status: "under-construction",
      description:
        "The Seoul Activity Center is under construction and will be available soon.",
    },
    {
      date: null,
      country: "Egypt",
      city: "Cairo",
      flag: "🇪🇬",
      status: "under-construction",
      description:
        "The Cairo Activity Center is planned to expand services to North Africa.",
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-lg font-medium leading-6 text-center">
        Global studio distribution
      </h2>
      {list.map((v) => {
        return (
          <div className="pb-6 last:pb-0 flex gap-3 relative" key={v.city}>
            <div className="flex flex-col items-center">
              <input
                type="radio"
                className="radio radio-primary radio-custom"
              />
              <div
                className="w-[1px] bg-text3 absolute top-4.5"
                style={{ height: "calc(100% - 18px)" }}
              ></div>
            </div>
            <dl>
              <dt className="mb-4">
                {v.date || (
                  <span className="text-text5">Under Construction…</span>
                )}
              </dt>
              <dd className="bg-bg4 p-4 rounded-lg flex gap-4">
                <div className="size-10">{v.flag}</div>
                <div>
                  <h4 className="font-medium leading-6 flex justify-between items-center">
                    {v.country}
                    <Icon name="right-enter-white" className="w-1.5 h-2.5" />
                  </h4>
                  <p className="leading-5 text-sm mt-2 line-clamp-2">
                    {v.description}
                  </p>
                </div>
              </dd>
            </dl>
          </div>
        );
      })}
    </div>
  );
};
export default ListStepBox;
