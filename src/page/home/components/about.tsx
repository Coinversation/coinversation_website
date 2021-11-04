import React from "react";
import "./about.less";
export default function About() {
  return (
    <div className="about" id="About">
      <div
        className="about_inner animate animate__animated"
        data-animate="animate__fadeInIn"
        data-animation-delay="2 .1s"
      >
        <h2
        // className="animate animate__animated"
        // data-animate="animate__fadeInUp"
        // data-animation-delay="2 .1s"
        >
          About The<i> Coinversation</i>
        </h2>
        <p className="text">
          Coinversation is financial derivatives and NFT protocol platform.
          Coinversation's evm version dapp has deployed Dex and NFT
          fragmentation protocol on Kusama and BSC. Coinversation will continue
          to make efforts in the direction of NFT+DEFI. Next, we will construct
          the NFT element components of the Polkadot ecology, such as defining
          the data format and calculation methods of the Polkadot ecology NFT.
          On this basis, Coinversation attempts to set standards for future NFT.
        </p>
        <ul className="first">
          <li>
            <img src={require("../img/icon_DEX.svg")} alt="logo" />
            <h3>DEX</h3>
            <p>
              Its core functions mainly include the AMM (automated market maker)
              of decentralized trading platform, staking and farming, which
              adoptes the AMM model. Users can trade Polkadot native tokens on
              Coinversation, or add liquidity to get rewards. By flushing funds
              into the liquidity pool, users can obtain LP Tokens, and use these
              LP tokens to exchange capital shares and earn transaction fees.
            </p>
          </li>
          <li>
            <img src={require("../img/icon_Cusd.svg")} alt="logo" />
            <h3>Synthetic Assets</h3>
            <p>
              It is not only a synthetic asset issuance platform, but also a
              decentralized contract trading platform. The user mortgages the
              $CTO or $DOT to generate synthetic assets in the collateral pool.
              The main functional modules of the entire system include: using
              collateral to cast synthetic assets, decentralized contract
              exchanges, collateral pools, fee pools, and oracles.
            </p>
          </li>
        </ul>
        <ul className="seconed">
          <li>
            <img src={require("../img/icon_nft.svg")} alt="logo" />
            <h3>NFT</h3>
            <h4>
              <i></i>NFT Fragmentation Protocol
            </h4>
            <p>
              It is a protocol that can merge, divide, and trade NFTs, which
              converts NFT into liquid tradable assets. In this protocol, users
              can fragment the NFT issued by the project into NFT100 tokens,
              which can buy and sell NFT100 tokens on Coinversation, and can
              also establish liquidity to obtain liquidity rewards.
            </p>
            <h4>
              <i></i>NFT Auction
            </h4>
            <p>
              Regarding Dutch auctions: Dutch auctions initially bid at prices
              that exceeded the seller’s expected income. The price is gradually
              reduced until a bidder accepts the current price. The bidder wins
              the auction and pays the price to purchase the NFT. Everyone can
              see the NFT being sold and can enjoy the artwork without
              participating. The bidders will be very excited about the rare NFT
              and look forward to the NFT bid launched, and will think about
              their auction strategy in advance.
            </p>
            <h4>
              <i></i>NFT meta-component
            </h4>
            <p>
              Constructing the NFT meta-component of the Polkadot ecology: It is
              an NFT that displays game assets in the form of text, any
              individual and project can create on this basis. It does not carry
              any multimedia content such as pictures, but only simple text.
              With the openness of the blockchain, anyone can create a virtual
              content experience with the help of NFT assets issued by
              coinversation.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
