import React from "react";
import { Center, Image, Link, SimpleGrid } from "@chakra-ui/react";

export default function MobileLogos() {
	return (
		<>
			<Link href="https://climateneutralcardano.org/">
				<Image
					src={"/assets/images/cnc_logo_dark.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"72"}
				/>
			</Link>
			<SimpleGrid
				columns={{ base: 1, md: 3 }}
				gap={{ base: "5", md: "6" }}
			>
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
					<Link href="https://cardanoproxies.io/">
						<Image
							src={"/assets/images/Proxies_logo.png"}
							alt={"CNC"}
							loading="lazy"
							objectFit="contain"
							w={"36"}
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
					<Link href="https://dripdropz.io/">
						<Image
							src={"/assets/images/DripDropz_logo.png"}
							alt={"CNC"}
							loading="lazy"
							objectFit="contain"
							w={"36"}
							pt={"4"}
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
			</SimpleGrid>
		</>
	);
}
