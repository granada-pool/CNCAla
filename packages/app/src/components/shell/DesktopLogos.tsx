import React from "react";
import { Center, Image, Link, SimpleGrid, Stack } from "@chakra-ui/react";

export default function DesktopLogos() {
	return (
		<Stack align="center">
			<Link href="https://climateneutralcardano.org/">
				<Image
					src={"/assets/images/cnc_logo_dark.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"xs"}
				/>
			</Link>
			<SimpleGrid columns={{ base: 7 }} gap={{ base: "2" }}>
				<Center>
					<Link href="https://cardanoproxies.io/">
						<Image
							src={"/assets/images/Proxies_logo.png"}
							alt={"CNC"}
							loading="lazy"
							objectFit="contain"
							w={"32"}
						/>
					</Link>
				</Center>
				<Center>
					<Link href="https://yummiuniverse.com/">
						<Image
							src={"/assets/images/YummiUniverse_logo.png"}
							alt={"CNC"}
							loading="lazy"
							objectFit="contain"
							w={"20"}
						/>
					</Link>
				</Center>
				<Center>
					<Link href="https://ada-anvil.io/">
						<Image
							src={"/assets/images/anvil_logo.png"}
							alt={"Anvil"}
							loading="lazy"
							objectFit="contain"
							w={"16"}
						/>
					</Link>
				</Center>
				<Center>
					<Link href="https://newm.io/">
						<Image
							src={"/assets/images/NEWM_logo.png"}
							alt={"CNC"}
							loading="lazy"
							objectFit="contain"
							w={"16"}
						/>
					</Link>
				</Center>
				<Center>
					<Link href="https://twitter.com/madaslemurs">
						<Image
							src={"/assets/images/Madalemurs_logo.png"}
							alt={"CNC"}
							loading="lazy"
							objectFit="contain"
							w={"16"}
						/>
					</Link>
				</Center>
				<Center>
					<Link href="https://earthnatives.io/">
						<Image
							src={"/assets/images/EarthNative_logo.png"}
							alt={"CNC"}
							loading="lazy"
							objectFit="contain"
							w={"20"}
						/>
					</Link>
				</Center>
				<Center>
					<Link href="https://dripdropz.io/">
						<Image
							src={"/assets/images/DripDropz_logo.png"}
							alt={"CNC"}
							loading="lazy"
							objectFit="contain"
							w={"32"}
						/>
					</Link>
				</Center>
			</SimpleGrid>
		</Stack>
	);
}
