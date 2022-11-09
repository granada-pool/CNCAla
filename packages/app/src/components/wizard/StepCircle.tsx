import { Circle, SquareProps } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface RadioCircleProps extends SquareProps {
	isCompleted: boolean;
	isActive: boolean;
	icon: ReactJSXElement;
}

export const StepCircle = (props: RadioCircleProps) => {
	const { isCompleted, isActive, icon } = props;
	return (
		<Circle
			size="8"
			bg={isCompleted ? "green.50" : "inherit"}
			borderWidth={isCompleted ? "0" : "2px"}
			borderColor={isActive ? "green.400" : "inherit"}
			{...props}
		>
			{icon}
		</Circle>
	);
};
