/**
 *
 * @param {JSX.Element} Component
 * @param {object} [options]
 * @return {JSX.Element}
 */
export function withAssetChartQuery(Component: JSX.Element, options?: object): JSX.Element;
/**
 *
 * @param {Object} a
 * @param {Object} b
 * @return {number}
 */
export function sortPriceByTime(a: any, b: any): number;
/**
 *
 * @param {object} data
 * @return {array}
 */
export function mapPriceData(data: object): any[];
/**
 * {high: String, low: String, close: String, open: String}
 * @param {object} data
 * @return {object}
 */
export function getOhlc(data: object): object;
/**
 *
 * @param {object} data
 * @param {string} volUpColor
 * @param {string} volDownColor
 * @return {array}
 */
export function mapVolumeData(data: object, volUpColor: string, volDownColor: string): any[];
/**
 *
 * @param {Object} a
 * @param {Object} b
 * @return {number}
 */
export function sortByASAPrice(a: any, b: any): number;
/**
 * {ask: String, bid: String, spread: String}
 * @todo: Move to SDK
 * @param {object} orderBook
 * @return {object}
 */
export function getBidAskSpread(orderBook: object): object;
/**
 * Use Asset Chart Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {string} props.interval Interval to aggregate chart by
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useAssetChartQuery({ interval, asset, options, }: {
    asset: any;
    interval: string;
    options?: any;
}): object;
export default useAssetChartQuery;
