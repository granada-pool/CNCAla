import {
	Container,
	Text,
	Stack,
	Heading,
	useDisclosure,
	Center,
} from "@chakra-ui/react";
import { EaseInWithSlidingAnimation } from "@cncala/app/components/animations/EaseInWithSlidingAnimation";
import { CardanoWallet, useAssets, useWallet } from "@meshsdk/react";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AppContext } from "@cncala/app/context";
import RaffleClaimModal from "@cncala/app/components/RaffleClaimModal";
import DesktopLogosRaffle from "@cncala/app/components/shell/DesktopLogosRaffle";
import MobileLogosRaffle from "@cncala/app/components/shell/MobileLogosRaffle";

export default function Raffle() {
	const { isDesktop } = useContext(AppContext);
	const { wallet, connected } = useWallet();
	const assets = useAssets();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (connected && wallet["_walletInstance"]) {
			onOpen();
		}
	}, [connected]);

	return (
		<Container alignSelf={"center"}>
			<Stack spacing={{ base: "0" }} pt="16" align="center">
				<EaseInWithSlidingAnimation>
					<Heading size={isDesktop ? "lg" : "md"}>
						{"CNC Ala Raffle's Claiming Portal"}
					</Heading>
					<Stack py="10">
						<Text
							overflowWrap="break-word"
							w={isDesktop ? "2xl" : "100%"}
							fontSize={"xl"}
							align="center"
						>
							{
								"If you received the winning NFT from our Marlowe smart contract,"
							}
						</Text>
						<Text
							overflowWrap="break-word"
							w={isDesktop ? "2xl" : "100%"}
							fontSize={"xl"}
							align="center"
						>
							{
								"please connect your wallet to claim your prize! 🌳"
							}
						</Text>
					</Stack>
					<Center>
						<CardanoWallet />
					</Center>
				</EaseInWithSlidingAnimation>
				<EaseInWithSlidingAnimation initY={20} delay={0.5}>
					<Image
						src="/assets/images/winner_nfts.png"
						alt={"Winner NFTs"}
						width={800}
						height={600}
					/>
				</EaseInWithSlidingAnimation>
				<EaseInWithSlidingAnimation>
					<Stack
						spacing="4"
						direction={isDesktop ? "row" : "column"}
						align={"center"}
						pb={16}
					>
						{isDesktop ? (
							<DesktopLogosRaffle />
						) : (
							<MobileLogosRaffle />
						)}
					</Stack>
				</EaseInWithSlidingAnimation>
			</Stack>
			{connected && assets ? (
				<RaffleClaimModal
					wallet={wallet["_walletInstance"]}
					assets={assets}
					isOpen={isOpen}
					onClose={onClose}
				/>
			) : (
				<></>
			)}
		</Container>
	);
}
