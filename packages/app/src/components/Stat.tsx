import {
	Box,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import CountUp from "react-countup";
import ModalWindow from "./ModalWindow";

interface Props {
	label: string;
	value: number;
	description: string;
	currency?: string;
	decimals?: number;
}
export const Stat = (props: Props) => {
	const { label, value, description, currency, decimals, ...boxProps } =
		props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Box
				w={{ base: "48", md: "52", lg: "56" }}
				px={{ base: "4", md: "4" }}
				py={{ base: "5", md: "6" }}
				bg="bg-surface"
				borderRadius="lg"
				boxShadow={useColorModeValue("sm", "sm-dark")}
				_hover={{
					cursor: "pointer",

					transform: "scale(1.05)",
					transition: "0.2s",
					boxShadow: "0px 0px 10px #48BB78",
				}}
				onClick={onOpen}
				{...boxProps}
			>
				<Stack>
					<Text fontSize="sm" color="muted">
						{label}
					</Text>
					<Heading
						size={useBreakpointValue({ base: "sm", md: "md" })}
					>
						{`${currency ? currency : ""} `}
						<CountUp
							end={value}
							formattingFn={(v) => {
								return new Intl.NumberFormat("EN-US").format(v);
							}}
							redraw={false}
							decimals={decimals}
						/>
					</Heading>
				</Stack>
			</Box>
			<ModalWindow
				header={label}
				subtitle={description}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};
