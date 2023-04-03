import {
	Stack,
	Heading,
	HStack,
	Button,
	SimpleGrid,
	Icon,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { AppContext } from "../context";
import { getStats, Stats } from "./data/_data";
import { Stat } from "./Stat";
import Thermometer from "./thermometer";

export default function Dashboard() {
	const { isDesktop, isTablet } = useContext(AppContext);

	const [walletdonations, setWalletdonations] = useState(0);

	const goalADA = 100000;
	const [donationsLeft, setDonationsLeft] = useState(goalADA);

	const stats = getStats(walletdonations, goalADA, isTablet);
	const baseURL = "https://cardano-mainnet.blockfrost.io/api/v0/addresses";

	const spoDonationWalletAddress =
		"addr1qyepertnhz6mjtafljc7562fxxv2wvsrqx2k6ak29v8s8hx8uuzh9vplnwfxx6yqsev5qa2r9475zv2us50dm8dxml0q8tk4sa";
	const directDonationWalletAddress =
		"addr1q8kdahqnjpjwdha024mdup3h75p5z239r9qhfyzy8x7v3m3ssaukq8dknegkm4c8q30atap7f08qlax7zratelsmgwcsmjpy0p";
	const lovelaceAdaConvertionFactor = 1000000;

	useEffect(() => {
		const fetchDonations = async () => {
			const responseSpoDonationWallet = await fetch(
				`${baseURL}/${spoDonationWalletAddress}/total`,
				{
					method: "GET",
					headers: {
						project_id: process.env.PROJECT_ID,
					},
				}
			);
			const spoDonationWalletData =
				await responseSpoDonationWallet.json();
			const responseDirectDonationWallet = await fetch(
				`${baseURL}/${directDonationWalletAddress}/total`,
				{
					method: "GET",
					headers: {
						project_id: process.env.PROJECT_ID,
					},
				}
			);
			const directDonationWalletData =
				await responseDirectDonationWallet.json();
			const totalDonations =
				Math.round(
					Number(
						spoDonationWalletData["received_sum"][0]["quantity"]
					) / lovelaceAdaConvertionFactor
				) +
				Math.round(
					Number(
						directDonationWalletData["received_sum"][0]["quantity"]
					) / lovelaceAdaConvertionFactor
				);

			setWalletdonations(totalDonations);
		};

		fetchDonations();
		setTimeout(() => {
			setDonationsLeft(
				walletdonations < goalADA ? goalADA - walletdonations : 0
			);
		}, 10);
	}, [walletdonations]);

	return (
		<>
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
								<Text fontSize={isDesktop ? "md" : "14"}>
									Support ISPO
								</Text>
								<Text fontSize={isDesktop ? "md" : "14"}>
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
								Click on the stats to read more about each
								category.
							</Text>
						</HStack>
					</Stack>
				</HStack>
			</Stack>
		</>
	);
}
