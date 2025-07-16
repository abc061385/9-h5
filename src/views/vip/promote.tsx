const PromoteBox = () => {
  return (
    <div className="mt-7">
      <div className="flex items-center gap-1.5">
        <span className="font-bold">晋升VIP9</span>
        <div className="badge badge-soft badge-primary rounded-sm">
          &gt;=3000000USDT
        </div>
        <div className="badge badge-soft badge-primary rounded-sm">
          1个VIP9用户
        </div>
      </div>
      <div className="flex items-center gap-1">
        <progress
          className="progress progress-primary"
          value={10}
          max={100}
        ></progress>
        <span className="text-[#E4E0ED] text-sm font-[ysbth]">VIP9</span>
      </div>
      <div className="font-[510] text-xs text-text2">还差 29,875,293.00USDT</div>
    </div>
  );
};
export default PromoteBox;
