import Link from "next/link";
import {
	Button,
	Center,
	Heading,
	HStack,
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
import Thermometer from "react-thermometer-component";

export default function Home() {
	const { isDesktop } = useContext(AppContext);
	const [spoWalletdonations, setSpoWalletdonations] = useState(0);
	const goalADA = 750000;

	const stats = [
		{
			label: "Donated",
			value: `${new Intl.NumberFormat().format(spoWalletdonations)} ₳`,
		},
		{ label: "Goal", value: `${new Intl.NumberFormat().format(750000)} ₳` },
		{
			label: "Planted Trees",
			value: `${new Intl.NumberFormat().format(1000)} 🌳`,
		},
		{ label: "Stake Pools", value: "20" },
	];

	useEffect(() => {
		fetch(
			"http://postgrest-api.mainnet.dandelion.reservoir.network/spo_wallet_donations"
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setSpoWalletdonations(data[0].donations.toFixed(0));
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);
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
								value={goalADA - spoWalletdonations}
								max={goalADA}
								format=" ADA left"
								size="large"
								height="300"
							/>
							<SimpleGrid
								columns={{ base: 1, md: 2 }}
								gap={{ base: "5", md: "6" }}
							>
								{stats.map(({ label, value }) => (
									<Stat
										key={label}
										label={label}
										value={value}
									/>
								))}
							</SimpleGrid>
						</HStack>
					</EaseInWithSlidingAnimation>
					<EaseInWithSlidingAnimation duration={0.8} delay={0.8}>
						<HStack>
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
						</HStack>
					</EaseInWithSlidingAnimation>
					<EaseInWithSlidingAnimation
						initY={20}
						finalY={0}
						duration={0.8}
						delay={0.5}
					>
						<Stack align={"center"} spacing="0" pt="20">
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
