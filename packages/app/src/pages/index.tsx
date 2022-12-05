import Link from "next/link";
import {
	Button,
	Heading,
	HStack,
	Icon,
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
import DesktopLogos from "../components/shell/DesktopLogos";
import MobileLogos from "../components/shell/MobileLogos";

export default function Home() {
	const { isDesktop } = useContext(AppContext);
	const [walletdonations, setWalletdonations] = useState(0);
	const goalADA = 100000;

	const [donationsLeft, setDonationsLeft] = useState(goalADA);

	const stats = [
		{
			label: "Donated",
			value: walletdonations,
			description:
				"Total ADA donated either by pools or direct donation. This data is directly fetched from the Cardano blockchain.",
			currency: "₳",
		},
		{
			label: "Planted Seeds",
			value: 5544,
			description:
				"In Pot- total seeds or seedlings planted either in germinator or pot, plus the total in Ground- seedlings or young trees planted in the ground at site.",
			currency: "🌱",
		},
		{
			label: "Initial Goal",
			value: goalADA,
			description: "Goal for phase one, Ranomafana site, 3.6 hectares.",
			currency: "₳",
		},
		{
			label: "Regenerated hectares",
			value: 3.6,
			description:
				"Total hectares regenerated between three sites, starting with Ranomafana site.",
			decimals: 1,
		},
		{
			label: "Stake Pools",
			value: 25,
			description:
				"Number of official CNC Ala ISPO pools. These SPOs are donating 85 ADA from the first block minted every epoch (fixed fee).",
		},
		{
			label: "Hours Worked",
			value: 7632,
			description:
				"Total number of hours worked and paid for by the project.",
		},
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
						setWalletdonations(totalDonations);
					})
					.catch((err) => {
						console.log(err.message);
					});
			})
			.catch((err) => {
				console.log(err.message);
			});

		setTimeout(() => {
			setDonationsLeft(
				walletdonations < goalADA ? goalADA - walletdonations : 0
			);
		}, 10);
	}, [walletdonations]);
	return (
		<ContentCenter>
			<Stack
				spacing={{ base: "6" }}
				minW={isDesktop ? "2xl" : "full"}
				pt="16"
				align="center"
			>
				<EaseInWithSlidingAnimation>
					<Stack
						spacing="4"
						textAlign={isDesktop ? "justify" : "center"}
						pb={10}
						align="center"
					>
						<Stack align="center">
							<Heading size={isDesktop ? "lg" : "md"}>
								CNC Ala Donations
							</Heading>
							<Text
								overflowWrap="break-word"
								w={isDesktop ? "xl" : "100%"}
								fontSize={isDesktop ? "md" : "14"}
								pb="2"
								align="center"
							>
								This overview shows live data of the CNC Ala
								ISPO.
							</Text>
						</Stack>
						<HStack mt={8}>
							<Link
								href="https://climateneutralcardano.org/cnc-ala-ispo-eligible-pools/"
								passHref
							>
								<Button
									w="36"
									bgColor="olivedrab"
									borderRadius="20px"
									_hover={{
										bgColor: "green",
									}}
								>
									<Stack spacing="-0.5">
										<Text
											fontSize={isDesktop ? "md" : "14"}
										>
											Support ISPO
										</Text>
										<Text
											fontSize={isDesktop ? "md" : "14"}
										>
											Earn rewards
										</Text>
									</Stack>
								</Button>
							</Link>
							<Text>or</Text>
							<Link
								href="https://climateneutralcardano.org/donate/"
								passHref
							>
								<Button
									w="36"
									bgColor="olivedrab"
									borderRadius="20px"
									_hover={{
										bgColor: "green",
									}}
								>
									Donate directly
								</Button>
							</Link>
						</HStack>
					</Stack>
					<HStack pb={10} pl={isDesktop ? "0" : "10"}>
						<Thermometer
							theme="dark"
							value={Math.round(donationsLeft)}
							max={goalADA}
							format=" ADA left"
							size="large"
							height="450"
						/>
						<SimpleGrid
							columns={{ base: 1, md: 2 }}
							gap={{ base: "5", md: "6" }}
						>
							{stats.map(
								({
									label,
									value,
									description,
									currency,
									decimals,
								}) => (
									<Stat
										key={label}
										label={label}
										value={value}
										description={description}
										decimals={decimals}
										currency={currency}
									/>
								)
							)}
						</SimpleGrid>
					</HStack>
				</EaseInWithSlidingAnimation>
				<EaseInWithSlidingAnimation duration={0.8} delay={0.5}>
					<Wizard
						steps={[
							{
								title: "Project Start",
								icon: (
									<Icon
										as={GiPlantSeed}
										color="green"
										boxSize="5"
									/>
								),
							},
							{
								title: "Start Donations",
								icon: (
									<Icon
										as={RiPlantFill}
										color="green"
										boxSize="5"
									/>
								),
							},
							{
								title: "ISPO Launch",
								icon: (
									<Icon
										as={FaSeedling}
										color="green"
										boxSize="5"
									/>
								),
							},
							{
								title: "ISPO End",
								icon: (
									<Icon
										as={GiFruitTree}
										color="green"
										boxSize="5"
									/>
								),
							},
							{
								title: "NFT Redemption",
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
				<EaseInWithSlidingAnimation
					initY={20}
					finalY={0}
					duration={0.8}
					delay={0.8}
				>
					<Stack align={"center"} spacing="6" pt="8">
						<Stack
							spacing="4"
							direction={isDesktop ? "row" : "column"}
							align={"center"}
						>
							{isDesktop ? <DesktopLogos /> : <MobileLogos />}
						</Stack>
						<SocialMedia />
					</Stack>
				</EaseInWithSlidingAnimation>
			</Stack>
		</ContentCenter>
	);
}
