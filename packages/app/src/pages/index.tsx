import Link from "next/link";
import {
	Button,
	Center,
	Heading,
	HStack,
	Icon,
	Image,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import ContentCenter from "../components/shell/ContentCenter";
import { SocialMedia } from "../components/shell/SocialMedia";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { Stat } from "../components/Stat";
import { EaseInWithSlidingAnimation } from "../components/animations/EaseInWithSlidingAnimation";
import Wizard from "../components/wizard/Wizard";
import { GiForest, GiFruitTree, GiPlantSeed } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import Thermometer from "../components/thermometer";

export default function Home() {
	const { isDesktop } = useContext(AppContext);
	const [walletdonations, setWalletdonations] = useState(0);
	const goalADA = 750000;

	const [donationsLeft, setDonationsLeft] = useState(goalADA);

	const stats = [
		{
			label: "Donated",
			value: walletdonations,
			currency: "₳",
		},
		{
			label: "Goal",
			value: 300000,
			currency: "$",
		},
		{
			label: "Planted Trees",
			value: 1000,
			currency: "🌳",
		},
		{ label: "Regenerated hectares", value: 3.6 },
		{ label: "Lives changed", value: 50 },
		{ label: "Stake Pools", value: 20 },
	];

	useEffect(() => {
		const baseURL =
			"https://postgrest-api.mainnet.dandelion.reservoir.network";
		const spoWalletUrl = `${baseURL}/spo_wallet_sum`;
		const donationWalletUrl = `${baseURL}/donation_wallet_sum`;

		fetch(spoWalletUrl, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((spoWalletData) => {
				fetch(donationWalletUrl, {
					method: "GET",
				})
					.then((res) => res.json())
					.then((donationWalletData) => {
						const totalDonations =
							spoWalletData[0].donations +
							donationWalletData[0].donations;
						setWalletdonations(totalDonations.toFixed(0));
					})
					.catch((err) => {
						console.log(err.message);
					});
			})
			.catch((err) => {
				console.log(err.message);
			});

		setTimeout(() => {
			setDonationsLeft(goalADA - 200000);
		}, 10);
	}, [donationsLeft]);
	return (
		<ContentCenter>
			<Center>
				<Stack
					spacing={{ base: "6" }}
					minW={isDesktop ? "2xl" : "full"}
					align="center"
					pt="16"
				>
					<EaseInWithSlidingAnimation>
						<Stack
							spacing="4"
							px={isDesktop ? "0" : "1"}
							textAlign={isDesktop ? "justify" : "center"}
							pb={10}
						>
							<Heading
								size={isDesktop ? "lg" : "md"}
								alignSelf="left"
							>
								CNC Ala Donations
							</Heading>
							<Text
								overflowWrap="break-word"
								w={isDesktop ? "lg" : "100%"}
								fontSize={isDesktop ? "md" : "14"}
								pb="2"
							>
								This overview shows live data of the CNC Ala
								ISPO.
							</Text>
						</Stack>
						<HStack pb={10} pl={isDesktop ? "0" : "10"}>
							<Thermometer
								theme="dark"
								value={
									/*goalADA - walletdonations*/ donationsLeft
								}
								max={goalADA}
								format=" ADA left"
								size="large"
								height="450"
							/>
							<SimpleGrid
								columns={{ base: 1, md: 3 }}
								gap={{ base: "5", md: "6" }}
							>
								{stats.map(({ label, value, currency }) => (
									<Stat
										key={label}
										label={label}
										value={value}
										currency={currency}
									/>
								))}
							</SimpleGrid>
						</HStack>
					</EaseInWithSlidingAnimation>
					<EaseInWithSlidingAnimation duration={0.8} delay={0.5}>
						<Wizard
							steps={[
								{
									title: "Milestone 1",
									icon: (
										<Icon
											as={GiPlantSeed}
											color="green"
											boxSize="5"
										/>
									),
								},
								{
									title: "Milestone 2",
									icon: (
										<Icon
											as={RiPlantFill}
											color="green"
											boxSize="5"
										/>
									),
								},
								{
									title: "Milestone 3",
									icon: (
										<Icon
											as={FaSeedling}
											color="green"
											boxSize="5"
										/>
									),
								},
								{
									title: "Milestone 4",
									icon: (
										<Icon
											as={GiFruitTree}
											color="green"
											boxSize="5"
										/>
									),
								},
								{
									title: "Milestone 5",
									icon: (
										<Icon
											as={GiForest}
											color="green"
											boxSize="5"
										/>
									),
								},
							]}
						/>
					</EaseInWithSlidingAnimation>
					<EaseInWithSlidingAnimation duration={0.8} delay={0.5}>
						<HStack mt={8}>
							<Link
								href="https://climateneutralcardano.org/cnc-ala-ispo-eligible-pools/"
								passHref
							>
								<Button
									w="32"
									bgColor="olivedrab"
									borderRadius="20px"
									_hover={{
										bgColor: "green",
									}}
								>
									Stake with us
								</Button>
							</Link>
							<Link
								href="https://climateneutralcardano.org/donate/"
								passHref
							>
								<Button
									w="32"
									bgColor="olivedrab"
									borderRadius="20px"
									_hover={{
										bgColor: "green",
									}}
								>
									Donate
								</Button>
							</Link>
						</HStack>
					</EaseInWithSlidingAnimation>
					<EaseInWithSlidingAnimation
						initY={20}
						finalY={0}
						duration={0.8}
						delay={0.8}
					>
						<Stack align={"center"} spacing="0" pt="8">
							<Image
								src={"/assets/images/cnc_logo_dark.png"}
								alt={"CNC"}
								loading="lazy"
								objectFit="contain"
								w={isDesktop ? "sm" : "xs"}
							/>
							<SocialMedia />
						</Stack>
					</EaseInWithSlidingAnimation>
				</Stack>
			</Center>
		</ContentCenter>
	);
}
