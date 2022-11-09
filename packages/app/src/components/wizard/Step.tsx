import {
	BoxProps,
	Divider,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { StepCircle } from "./StepCircle";

interface StepProps extends BoxProps {
	title: string;
	description: string;
	isCompleted: boolean;
	isActive: boolean;
	isLastStep: boolean;
	isFirstStep: boolean;
	icon: ReactJSXElement;
}

export const Step = (props: StepProps) => {
	const {
		isActive,
		isCompleted,
		isLastStep,
		isFirstStep,
		title,
		description,
		icon,
		...stackProps
	} = props;
	const isMobile = useBreakpointValue({ base: true, md: false });

	const orientation = useBreakpointValue<"horizontal" | "vertical">({
		base: "vertical",
		md: "horizontal",
	});

	return (
		<Stack
			spacing="4"
			direction={{ base: "row", md: "column" }}
			flex="1"
			{...stackProps}
		>
			<Stack
				spacing="0"
				align="center"
				direction={{ base: "column", md: "row" }}
			>
				<Divider
					display={isMobile ? "none" : "initial"}
					orientation={orientation}
					borderWidth="1px"
					borderColor={
						isFirstStep
							? "transparent"
							: isCompleted || isActive
							? "green.400"
							: "inherit"
					}
				/>
				<StepCircle
					isActive={isActive}
					isCompleted={isCompleted}
					icon={icon}
				/>
				<Divider
					orientation={orientation}
					borderWidth="1px"
					borderColor={
						isCompleted
							? "green.400"
							: isLastStep
							? "transparent"
							: "inherit"
					}
				/>
			</Stack>
			<Stack
				spacing="0.5"
				pb={isMobile && !isLastStep ? "8" : "0"}
				align={{ base: "start", md: "center" }}
			>
				<Text
					color={
						isCompleted
							? "emphasized"
							: isActive
							? "green.400"
							: "green.800"
					}
					fontWeight={isActive ? "extrabold" : "medium"}
				>
					{title}
				</Text>
				<Text color="muted">{description}</Text>
			</Stack>
		</Stack>
	);
};
