import { Image } from "@chakra-ui/react";
export default function Logo({ ...props }) {
	return (
		<Image
			src={"/assets/images/cnc_logo_dark.png"}
			alt={"CNC"}
			loading="lazy"
			objectFit="contain"
			w={"40"}
		/>
	);
}
