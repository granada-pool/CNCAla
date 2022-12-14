import React from "react";
import { Image, Link } from "@chakra-ui/react";

export default function DesktopLogos() {
	return (
		<>
			<Link href="https://cardanoproxies.io/">
				<Image
					src={"/assets/images/Proxies_logo.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"32"}
				/>
			</Link>
			<Link href="https://yummiuniverse.com/">
				<Image
					src={"/assets/images/YummiUniverse_logo.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"20"}
				/>
			</Link>
			<Link href="https://newm.io/">
				<Image
					src={"/assets/images/NEWM_logo.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"16"}
				/>
			</Link>
			<Link href="https://climateneutralcardano.org/">
				<Image
					src={"/assets/images/cnc_logo_dark.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"52"}
				/>
			</Link>
			<Link href="https://twitter.com/madaslemurs">
				<Image
					src={"/assets/images/Madalemurs_logo.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"16"}
				/>
			</Link>
			<Link href="https://earthnatives.io/">
				<Image
					src={"/assets/images/EarthNative_logo.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"20"}
				/>
			</Link>
			<Link href="https://dripdropz.io/">
				<Image
					src={"/assets/images/DripDropz_logo.png"}
					alt={"CNC"}
					loading="lazy"
					objectFit="contain"
					w={"32"}
				/>
			</Link>
		</>
	);
}
