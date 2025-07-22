import BigNumber from "bignumber.js";

// 预设全局配置
BigNumber.config({
  DECIMAL_PLACES: 18,
  ROUNDING_MODE: BigNumber.ROUND_HALF_UP,
});

function toBigNumber(x: number | string | BigNumber): BigNumber {
  return new BigNumber(x);
}

export default toBigNumber;
