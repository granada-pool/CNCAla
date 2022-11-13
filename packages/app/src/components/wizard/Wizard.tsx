import React from "react";

import { Flex, Stack } from "@chakra-ui/react";

import { Step } from "./Step";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useStep } from "@momentum/app/hooks";

interface StepData {
	title: string;
	description?: string;
	icon: ReactJSXElement;
}

interface IWizardContext {
	goToNextStep: () => void;
	goToPrevStep: () => void;
}

export const WizardContext = React.createContext<IWizardContext>(null);

export default function Wizard({
	steps,
	...props
}: {
	steps: StepData[];
	props?: any;
}) {
	const [currentStep, actions] = useStep({
		maxStep: steps.length,
		initialStep: 2,
	});

	return (
		<WizardContext.Provider value={actions}>
			<Stack direction="column" w={"2xl"} h="100%" {...props}>
				<Stack spacing="0" direction={{ base: "column", md: "row" }}>
					{steps.map((step, id) => (
						<Step
							key={id}
							cursor="pointer"
							title={step.title}
							description={step.description}
							isActive={currentStep === id}
							isCompleted={currentStep > id}
							isFirstStep={id === 0}
							isLastStep={steps.length === id + 1}
							icon={step.icon}
						/>
					))}
				</Stack>
				<Flex direction="column" justifyContent="center"></Flex>
			</Stack>
		</WizardContext.Provider>
	);
}
