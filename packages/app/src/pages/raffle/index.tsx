import {
	Container,
	Text,
	Stack,
	Heading,
	Button,
	useDisclosure,
	Center,
} from "@chakra-ui/react";
import ModalWindow from "@cncala/app/components/ModalWindow";
import { EaseInWithSlidingAnimation } from "@cncala/app/components/animations/EaseInWithSlidingAnimation";
import { CardanoWallet, useAssets, useWallet } from "@meshsdk/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Raffle() {
	const { connected } = useWallet();
	const assets = useAssets();
	const [isWinner, setIsWinner] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const winnerPolicyId =
		"13ff06b51c6c6b4d171255280027982d8e50055470516614195b4ec6";

	useEffect(() => {
		if (assets && connected) {
			assets.map((asset) => {
				if (winnerPolicyId === asset["policyId"]) {
					setIsWinner(true);
				}
			});
			onOpen();
		}
	}, [assets]);

	const getModalWindow = () => {
		if (isWinner) {
			return (
				<ModalWindow
					header="Congratulations, lucky winner!"
					subtitle="Your prize is a few clicks away. Thank you so much for participating and for helping us boost our impact in Madagascar!"
					isOpen={isOpen}
					onClose={onClose}
				>
					<Button
						w="2xs"
						bgColor="olivedrab"
						borderRadius="20px"
						_hover={{
							bgColor: "green",
						}}
					>
						{"Claim Prize"}
					</Button>
				</ModalWindow>
			);
		}
		return (
			<ModalWindow
				header="Better luck next time!"
				subtitle="Unfortunately, we couldn't find any winner NFT in your wallet. Thank you so much for participating and for helping us boost our impact in Madagascar!"
				isOpen={isOpen}
				onClose={onClose}
			>
				<Link href="/">
					<Button
						w="2xs"
						bgColor="olivedrab"
						borderRadius="20px"
						_hover={{
							bgColor: "green",
						}}
					>
						{"Discover the CNC Ala"}
					</Button>
				</Link>
			</ModalWindow>
		);
	};

	return (
		<Container alignSelf={"center"}>
			<Stack spacing={{ base: "0" }} pt="16" align="center">
				<EaseInWithSlidingAnimation>
					<Heading size={"lg"}>
						{"CNC Ala Raffle's Claiming Portal"}
					</Heading>
					<Stack py="10">
						<Text
							overflowWrap="break-word"
							w={"2xl"}
							fontSize={"xl"}
							align="center"
						>
							{
								"If you received the winning NFT from our Marlowe smart contract,"
							}
						</Text>
						<Text
							overflowWrap="break-word"
							w={"2xl"}
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
						width={1100}
						height={600}
					/>
				</EaseInWithSlidingAnimation>
			</Stack>

			{connected ? getModalWindow() : <></>}
		</Container>
	);
}
