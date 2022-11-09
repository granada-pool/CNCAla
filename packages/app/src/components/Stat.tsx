import {
	Box,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import CountUp from "react-countup";

interface Props {
	label: string;
	value: number;
	currency?: string;
}
export const Stat = (props: Props) => {
	const { label, value, currency, ...boxProps } = props;

	return (
		<Box
			w={"56"}
			px={{ base: "4", md: "4" }}
			py={{ base: "5", md: "6" }}
			bg="bg-surface"
			borderRadius="lg"
			boxShadow={useColorModeValue("sm", "sm-dark")}
			{...boxProps}
		>
			<Stack>
				<Text fontSize="sm" color="muted">
					{label}
				</Text>
				<Heading size={useBreakpointValue({ base: "sm", md: "md" })}>
					{`${currency ? currency : ""} `}
					<CountUp
						end={value}
						formattingFn={(v) => {
							return new Intl.NumberFormat("EN-US").format(v);
						}}
						redraw={false}
					/>
				</Heading>
			</Stack>
		</Box>
	);
};
