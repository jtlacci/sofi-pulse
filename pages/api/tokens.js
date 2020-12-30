import nextConnect from 'next-connect';
import axios from 'axios';
import _ from 'lodash'

const handler = nextConnect();

const sofiSymbols = ['audio','alex','kerman','joon','ksk','pew','magic','boi','rac','first','yachty','pump','whale','hue','skull','osina','rare','coin','seed','rng','yup','ladz','jamm','fwb','1337','swagg','robot','vnchr','dsgn','ven','rcle','cnsl','karma','ddim','uwl','cherry','gen','ant']
const nameFilter = ['coinvest', 'aragon', 'daostack', 'whale-coin']

export const main = async () => {
    // filter out sofi tokens from coingecko feed
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/list')
    const sofiTokens = data.filter(token => sofiSymbols.includes(token.symbol) && !nameFilter.includes(token.id))

    // get detailed data from coingecko feed
    const detailRes = await Promise.all(sofiTokens.map(({id}) => axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&community_data=false&sparkline=false`)))
    const sofiDetails = detailRes.map(({data}) => {
        return _.pick(data, ['id', 'name', 'symbol', 'contract_address', 'market_data','tickers'])
    })

    const uniswapSofi = sofiDetails.map(token => ({...token, tickers:token.tickers.filter(({market}) => market.identifier === 'uniswap')})).filter(({tickers}) => tickers.length)

    const sofiVolume = uniswapSofi.map(token => { 
      const { converted_volume } = token.tickers[0];
      const { price_change_percentage_24h, market_cap } = token.market_data;
  
      return ({
          ..._.omit(token,['market_data', 'tickers']),
          volume: converted_volume.usd,
          dayChange: price_change_percentage_24h,
          marketcap: market_cap.usd,
      })
  })

  
    const sortedSofi = sofiVolume.sort((a,b) => b.volume - a.volume);

    const sofiIndex = sortedSofi.slice(0,11)

    return sofiIndex
}

handler.get(async (req, res) => {
    try {
      res.status(201).json(await main());
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  },
);

export default handler;