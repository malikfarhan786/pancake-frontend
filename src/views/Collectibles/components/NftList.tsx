import React, { FunctionComponent } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import { Nft } from 'config/constants/types'
import useGetWalletNfts from 'hooks/useGetWalletNfts'
import NftCard, { NftCardProps } from './NftCard'
import NftGrid from './NftGrid'
import BunnySpeciaCard from './NftCard/BunnySpecialCard'
import EasterNftCard from './NftCard/EasterNftCard'

/**
 * A map of bunnyIds to special campaigns (NFT distribution)
 * Each NftCard is responsible for checking it's own claim status
 *
 */
const nftComponents = {
  hiccup: BunnySpeciaCard,
  bullish: BunnySpeciaCard,
  'easter-storm': EasterNftCard,
  'easter-flipper': EasterNftCard,
  'easter-caker': EasterNftCard,
}

const NftList = () => {
  const { refresh, lastUpdated, getTokenIdsByIdentifier } = useGetWalletNfts()

  return (
    <NftGrid>
      {orderBy(nfts, 'sortOrder').map((nft) => {
        const tokenIds = getTokenIdsByIdentifier(nft.identifier)

        const getNftCardComponent = (sortedNft: Nft): FunctionComponent<NftCardProps> => {
          if (!nftComponents[sortedNft.identifier]) {
            return NftCard
          }

          return nftComponents[sortedNft.identifier]
        }

        const Card = getNftCardComponent(nft)

        return (
          <div key={nft.name}>
            <Card nft={nft} tokenIds={tokenIds} refresh={refresh} lastUpdated={lastUpdated} />
          </div>
        )
      })}
    </NftGrid>
  )
}

export default NftList
