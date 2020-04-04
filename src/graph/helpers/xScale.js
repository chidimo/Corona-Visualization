import { localeFromTSMonthShort } from '../../dateUtils';

export const xScale = (dataPoints) => {
  let xAxesData = dataPoints.map((e) => localeFromTSMonthShort(e.recordDate));
  return xAxesData;
};
