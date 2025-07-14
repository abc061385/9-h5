import { useTrans } from "@/hooks/useTrans";
import BaseImage from "@/components/base-image";

const CardsBox = () => {
  const t = useTrans();

  const cardsList = [
    {
      title: "邀请好友",
      image: "/images/home/home_card1.png",
      click: "jump('/pages/invite/invite')",
    },
    {
      title: "平台介绍",
      image: "/images/home/home_card2.png",
      click: "jump('/pages/textDetail?type=5')",
    },
    // {
    //   title: "节点购买",
    //   image: "/images/home/home_card3.png",
    //   click: "jump('/pages/nodes/nodes')", //老项目里被注释的跳转
    //   //老项目点击提示t("节点已售罄")
    // },
  ];
  return (
    <div>
      <div className="grid gap-3 mt-4 grid-cols-2">
        {cardsList.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded-md bg-white text-center pt-1 pb-2.5"
            >
              <BaseImage
                src={item.image}
                className="w-13.5 h-13.5 relative mx-auto"
              />
              <p className="text-xs font-medium">{t(item.title)}</p>
            </div>
          );
        })}
      </div>
      {/* <div className="mt-4">
        <h2 className="font-[860] text-base">
          {t("AI智能聊天")}
        </h2>
        <div>
          <Tabs
            tabs={[
              { label: t("投资"), value: 0 },
              { label: t("生活实用"), value: 1 },
              { label: t("工作"), value: 2 },
            ]}
            value={tabsValue}
            onChange={(e) => {
              setState({
                tabsValue: e,
              });
            }}
            type="text"
          />
        </div>
      </div> */}
    </div>
  );
};
export default CardsBox;
