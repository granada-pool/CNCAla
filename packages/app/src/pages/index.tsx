import { Icon, Stack, useDisclosure } from "@chakra-ui/react";
import ContentCenter from "../components/shell/ContentCenter";
import { SocialMedia } from "../components/shell/SocialMedia";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { EaseInWithSlidingAnimation } from "../components/animations/EaseInWithSlidingAnimation";
import Wizard from "../components/wizard/Wizard";
import { GiForest, GiFruitTree, GiPlantSeed } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import DesktopLogos from "../components/shell/DesktopLogos";
import MobileLogos from "../components/shell/MobileLogos";
import ModalWindow from "../components/ModalWindow";
import Dashboard from "../components/Dashboard";

export default function Home() {
	const { isDesktop } = useContext(AppContext);

	useEffect(() => {

		setTimeout(() => {
			if (!popoverClosed) {
				setPopoverToClosed(true);
				onOpen();
			}
		}, 10000);
	}, []);

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
					<Dashboard />
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
