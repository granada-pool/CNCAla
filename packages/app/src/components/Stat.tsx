import {
	Box,
	Divider,
	Heading,
	HStack,
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
	value?: number;
	description: string;
	dual?: { label: string; value: number }[];
	currency?: string;
	decimals?: number;
}
export const Stat = (props: Props) => {
	const { label, dual, value, description, currency, decimals, ...boxProps } =
		props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Box
				w={{ base: "48", md: "52", lg: "60" }}
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

					{dual ? (
						<HStack>
							<Stack w={"50%"} spacing="-1">
								<Text fontSize="sm" color="muted">
									{dual[0].label}
								</Text>
								<Heading
									size={useBreakpointValue({
										base: "xs",
									})}
								>
									<CountUp
										end={dual[0].value}
										formattingFn={(v) => {
											return new Intl.NumberFormat(
												"EN-US"
											).format(v);
										}}
										redraw={false}
										decimals={decimals}
									/>
								</Heading>
							</Stack>
							<Divider h="12" orientation="vertical" px="auto" />
							<Stack w={"50%"} spacing="-1">
								<Text fontSize="sm" color="muted">
									{dual[1].label}
								</Text>
								<Heading
									size={useBreakpointValue({
										base: "xs",
									})}
								>
									<CountUp
										end={dual[1].value}
										formattingFn={(v) => {
											return new Intl.NumberFormat(
												"EN-US"
											).format(v);
										}}
										redraw={false}
										decimals={decimals}
									/>
								</Heading>
							</Stack>
						</HStack>
					) : (
						<Heading
							size={useBreakpointValue({ base: "sm", md: "md" })}
						>
							{`${currency ? currency : ""} `}
							<CountUp
								end={value}
								formattingFn={(v) => {
									return new Intl.NumberFormat(
										"EN-US"
									).format(v);
								}}
								redraw={false}
								decimals={decimals}
							/>
						</Heading>
					)}
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
