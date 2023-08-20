import {
	Container,
	Text,
	Stack,
	Heading,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import ModalWindow from "@cncala/app/components/ModalWindow";
import { CardanoWallet, useAssets, useWallet } from "@meshsdk/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Raffle() {
	const { connected } = useWallet();
	const assets = useAssets();
	const [isWinner, setIsWinner] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const winnerPolicyId =
		"f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a";

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

	return (
		<Container alignSelf={"center"}>
			<Stack spacing={{ base: "10" }} pt="16" align="center">
				<Heading size={"lg"}>
					{"CNC Ala Raffle's Claiming Portal"}
				</Heading>
				<Stack spacing="0">
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
						{"please connect your wallet to claim your prize! 🌳"}
					</Text>
				</Stack>
				<CardanoWallet />
			</Stack>
			{connected ? getModalWindow() : <></>}
		</Container>
	);
}
