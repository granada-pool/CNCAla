import React, { useContext, useEffect, useState } from "react";

import {
	Button,
	Heading,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Link,
	useColorModeValue,
	keyframes,
} from "@chakra-ui/react";
import { AppContext } from "../context";
import { SocialMedia } from "./shell/SocialMedia";
import Logo from "./Logo";
import { Props, useWithdrawal } from "../marlowe/marlowe-raffle";
import CNCSpinner from "./shell/CNCSpinner";

interface ModalWindowProps {
	wallet: any;
	isOpen: boolean;
	onClose: () => void;
}

export default function RaffleClaimModal(props: ModalWindowProps) {
	const txIds = [
		// V17 "9ff6883e1927db0cc4b96456c122e3dafa9ead72e2cb145c977d3c97c6e04a35",
		"sssad238sdfsdfsdfsdfj23ir932iro34jro34ijro3i4jro3i4jro3i4jror92r",
		"2eb616d46e85f080f484305bc23148c2b912554f02e97240c5b0ec0d81dd06e6",
		"b7e9df0cdb75a7f05fead74ec8b0fbaf42ad76c7346b1285bb4730500c4f9f68",
		"9ff6883e1927db0cc4b96456c122e3dafa9ead72e2cb145c977d3c97c6e04a35",
	];
	const { wallet, isOpen, onClose } = props;
	const backgroundColor = useColorModeValue("gray.50", "gray.800");
	const { isDesktop } = useContext(AppContext);
	const [currentTxIdIndex, setTxIdIndex] = useState(0);
	const hookProps: Props = {
		network: "preprod",
		wallet: wallet,
		txOutRef: {
			txId: txIds[currentTxIdIndex], //"9ff6883e1927db0cc4b96456c122e3dafa9ead72e2cb145c977d3c97c6e04a35",
			// txId: "c5d5e46a159c3caf563929ad7b5915f554cce0883e7790c4a11b20c808581cff",
			//txId: "c93175feff92ddfb571f4d12b9d34ab910594dce54ad4017a5670a0b43a930f5",
			// txId: "3605db0c5ae9be7623cd4ecb04f8e99d784da35258f2952896b25f7613968b54",
			txIx: 2,
		},
		blockfrostProjectId: "preprodD9cONxVqzHYtFEL4RObOZ46y4begqNHc",
	};

	const { status, reset } = useWithdrawal(hookProps);

	useEffect(() => {
		if (status.status === "Initializing") {
			console.log("Initializing for " + currentTxIdIndex);
		}

		if (
			status.status === "InitializationFailed" &&
			currentTxIdIndex < txIds.length
		) {
			setTxIdIndex(currentTxIdIndex + 1);
			console.log(currentTxIdIndex);
			const newHookProps = {
				network: "preprod",
				wallet: wallet,
				txOutRef: { txId: txIds[currentTxIdIndex], txIx: 2 },
				blockfrostProjectId: "preprodD9cONxVqzHYtFEL4RObOZ46y4begqNHc",
			} as Props;
			console.log("calling reset");
			reset(newHookProps);
			console.log(newHookProps.txOutRef.txId);
		}
	}, [status, currentTxIdIndex]);

	console.log(status);

	const animationKeyframes = keyframes`
	0% { opacity: 0; }
	50% { opacity: 1; }
	100% { opacity: 0; }
`;
	const animation = `${animationKeyframes} 2.5s ease-in-out infinite`;

	const getModalContent = () => {
		return (
			<Stack py="14">
				<CNCSpinner />
				<Text textAlign="center" animation={animation}>
					{"Looking for winner NFT" + currentTxIdIndex}
				</Text>
			</Stack>
		);
		switch (status.status) {
			case "Initializing":
				return (
					<Stack py="14">
						<CNCSpinner />
						<Text textAlign="center" animation={animation}>
							{"Looking for winner NFT"}
						</Text>
					</Stack>
				);
			case "ProcessingWithdrawal":
				return (
					<Stack py="14">
						<CNCSpinner />
						<Text textAlign="center" animation={animation}>
							{"Processing transaction"}
						</Text>
					</Stack>
				);
			case "InitializationFailed":
				return (
					<>
						<Heading
							as="h3"
							fontSize={"3xl"}
							textAlign="center"
							size={"sm"}
						>
							{"Better luck next time!"}
						</Heading>
						<Text textAlign="justify">
							{
								"Unfortunately, we couldn't find any winner NFT in your wallet. Thank you so much for participating and for helping us boost our impact in Madagascar!"
							}
						</Text>
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
					</>
				);
			case "AwaitingWithdrawalTrigger":
				return (
					<>
						<Heading
							as="h3"
							fontSize={"3xl"}
							textAlign="center"
							size={"sm"}
						>
							{"Congratulations, lucky winner!"}
						</Heading>
						<Text textAlign="justify">
							{
								"Your prize is a few clicks away. Thank you so much for participating and for helping us boost our impact in Madagascar!"
							}
						</Text>
						<Button
							w="2xs"
							bgColor="olivedrab"
							borderRadius="20px"
							onClick={status.trigger!}
							_hover={{
								bgColor: "green",
							}}
						>
							{"Claim Prize"}
						</Button>
					</>
				);
			case "WithdrawalFailed":
				return (
					<>
						<Heading
							as="h3"
							fontSize={"3xl"}
							textAlign="center"
							size={"sm"}
						>
							{"Something went wrong 💥"}
						</Heading>
						<Text textAlign="justify">
							{
								"Please try again or get in touch with the members of CNC on Twitter or Discord."
							}
						</Text>
					</>
				);
			case "WithdrawalSucceeded":
				return (
					<>
						<Stack align="center" spacing={6}>
							<Heading
								as="h3"
								fontSize={"3xl"}
								textAlign="center"
								size={"sm"}
							>
								{"Success! 🌳"}
							</Heading>
							<Text textAlign="justify">
								{
									"You should see your prize on your wallet soon. You can check the transaction here:"
								}
							</Text>
							<Link
								href={`https://${hookProps.network}.cardanoscan.io/transaction/${status.txId}`}
								target="_blank"
							>
								<Text textAlign="justify">{status.txId}</Text>
							</Link>
						</Stack>
					</>
				);
		}
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={isDesktop ? "2xl" : "xs"}
			motionPreset="slideInBottom"
			isCentered
		>
			<ModalOverlay bg={"blackAlpha.800"} />
			<ModalContent
				bgColor={backgroundColor}
				boxShadow={`0 0 7px 1px #48BB78`}
				rounded="xl"
				px={4}
			>
				<ModalHeader>
					<HStack>
						<Link
							href="https://climateneutralcardano.org"
							boxShadow="none"
							border="none"
							_focus={{ boxShadow: "none", border: "none" }}
							ml={-4}
						>
							<Logo size={32} ml={-4} />
						</Link>
					</HStack>
				</ModalHeader>
				<ModalCloseButton _focus={{ boxShadow: "none" }} />
				<ModalBody minH="2xs">
					<Stack align="center" spacing={6} py="8">
						{getModalContent()}
					</Stack>
				</ModalBody>
				<ModalFooter textAlign={"center"} alignSelf="center">
					<Stack>
						<Text fontWeight={"light"} fontSize={"sm"}>
							Join our community
						</Text>
						<SocialMedia />
					</Stack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
