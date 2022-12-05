import React from "react";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";

export default function MobileLogos() {
	return (
		<>
			<Image
				src={"/assets/images/cnc_logo_dark.png"}
				alt={"CNC"}
				loading="lazy"
				objectFit="contain"
				w={"72"}
			/>
			<SimpleGrid
				columns={{ base: 1, md: 3 }}
				gap={{ base: "5", md: "6" }}
			>
				<Box align="center">
					<Image
						src={"/assets/images/YummiUniverse_logo.png"}
						alt={"CNC"}
						loading="lazy"
						objectFit="contain"
						w={"20"}
					/>
				</Box>
				<Box align="center">
					<Image
						src={"/assets/images/Proxies_logo.png"}
						alt={"CNC"}
						loading="lazy"
						objectFit="contain"
						w={"36"}
					/>
				</Box>
				<Box align="center">
					<Image
						src={"/assets/images/EarthNative_logo.png"}
						alt={"CNC"}
						loading="lazy"
						objectFit="contain"
						w={"20"}
					/>
				</Box>
				<Box align="center">
					<Image
						src={"/assets/images/NEWM_logo.png"}
						alt={"CNC"}
						loading="lazy"
						objectFit="contain"
						w={"16"}
					/>
				</Box>
				<Box align="center">
					<Image
						src={"/assets/images/DripDropz_logo.png"}
						alt={"CNC"}
						loading="lazy"
						objectFit="contain"
						w={"36"}
						pt={"4"}
					/>
				</Box>
				<Box align="center">
					<Image
						src={"/assets/images/Madalemurs_logo.png"}
						alt={"CNC"}
						loading="lazy"
						objectFit="contain"
						w={"16"}
					/>
				</Box>
			</SimpleGrid>
		</>
	);
}
