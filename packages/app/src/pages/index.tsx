import Link from "next/link";
import {
	Button,
	Heading,
	HStack,
	Icon,
	SimpleGrid,
	Stack,
	Text,
	useDisclosure,
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
import { MdOutlineInfo } from "react-icons/md";
import Thermometer from "../components/thermometer";
import DesktopLogos from "../components/shell/DesktopLogos";
import MobileLogos from "../components/shell/MobileLogos";
import { getStats, Stats } from "../components/data/_data";
import ModalWindow from "../components/ModalWindow";

export default function Home() {
	const { isDesktop, isTablet } = useContext(AppContext);
	const [walletdonations, setWalletdonations] = useState(0);

	const goalADA = 100000;
	const [donationsLeft, setDonationsLeft] = useState(goalADA);

	const stats = getStats(walletdonations, goalADA, isTablet);

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

		setTimeout(() => {
			if (!popoverClosed) {
				setPopoverToClosed(true);
				onOpen();
			}
		}, 10000);
	}, [walletdonations]);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [popoverClosed, setPopoverToClosed] = useState(false);

	const getModalWindow = () => {
		return (
			<ModalWindow
				header="Get your milestone CNFTs! 🌳"
				subtitle="You can now mint the CNC Ala's milestone NFTs. These beautiful artworks created by Devin Field (SPO of YOON) include important achievements of the ISPO within their metadata, and they represent a certificate of participation in the world's first #ImpactStaking ISPO."
				buttonLabel="Mint now 🌱"
				buttonLink="https://cncala.ada-anvil.io/"
				isOpen={isOpen}
				onClose={onClose}
			/>
		);
	};

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
								CNC Ala Dashboard
							</Heading>
							<Stack spacing="0">
								<Text
									overflowWrap="break-word"
									w={isDesktop ? "xl" : "100%"}
									fontSize={isDesktop ? "md" : "14"}
									align="center"
								>
									{`The world's first RealFi ISPO is growing
								strong.`}
								</Text>
								<Text
									overflowWrap="break-word"
									w={isDesktop ? "xl" : "100%"}
									fontSize={isDesktop ? "md" : "14"}
									pb="2"
									align="center"
								>
									{`Join us and become an #ImpactStaking
								pioneer!`}
								</Text>
							</Stack>
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
					<Stack align="center" spacing="0">
						<HStack pb={10} pl={isDesktop ? "0" : "10"}>
							<Thermometer
								theme="dark"
								value={Math.round(walletdonations)}
								max={goalADA}
								label={`${new Intl.NumberFormat("EN-US").format(
									Math.round(donationsLeft)
								)} ADA left`}
								size="large"
								height="450"
							/>
							<Stack>
								<SimpleGrid
									columns={{ base: 1, md: 2, lg: 3 }}
									gap={{ base: "5", md: "6" }}
								>
									{stats.map(
										({
											label,
											labelColor,
											value,
											dual,
											description,
											currency,
											decimals,
										}: Stats) => (
											<Stat
												key={label}
												label={label}
												labelColor={labelColor}
												value={value}
												dual={dual}
												description={description}
												decimals={decimals}
												currency={currency}
											/>
										)
									)}
								</SimpleGrid>
								<HStack pt={2}>
									<Icon as={MdOutlineInfo} boxSize="6" />
									<Text fontSize={isDesktop ? "md" : "sm"}>
										Click on the stats to read more about
										each category.
									</Text>
								</HStack>
							</Stack>
						</HStack>
					</Stack>
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
				<EaseInWithSlidingAnimation>
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
			{getModalWindow()}
		</ContentCenter>
	);
}
