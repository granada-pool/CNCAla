import React, { useContext } from "react";

import {
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { AppContext } from "../context";
import { SocialMedia } from "./shell/SocialMedia";

interface ModelWindowProps {
	title?: string;
	header?: string;
	subtitle?: string;
	email?: string;
	buttonLabel?: string;
	buttonLink?: string;
	backgroundColor?: string;
	shadowColor?: string;
	isOpen: boolean;
	onClose: () => void;
}

export default function ModalWindow(props: ModelWindowProps) {
	const {
		title,
		header,
		subtitle,
		backgroundColor,
		shadowColor,
		isOpen,
		onClose,
	} = props;
	const fallbackBackgroundColor = useColorModeValue("gray.50", "gray.800");
	const { isDesktop } = useContext(AppContext);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={isDesktop ? "2xl" : "xs"}
			motionPreset="slideInBottom"
			isCentered
		>
			<ModalOverlay bg={"blackAlpha.800"} />
			<ModalContent
				bgColor={
					backgroundColor ? backgroundColor : fallbackBackgroundColor
				}
				boxShadow={`0 0 7px 1px ${
					shadowColor ? shadowColor : "#48BB78"
				}`}
				minH={{ base: "xs", lg: "sm" }}
				minW={{ base: "xs" }}
				rounded="xl"
			>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton _focus={{ boxShadow: "none" }} />
				<ModalBody mt={{ base: 0, lg: 8 }}>
					<Stack align="center" spacing={6}>
						<Heading
							as="h3"
							fontSize={"3xl"}
							textAlign="center"
							size={"sm"}
						>
							{header}
						</Heading>
						<Text textAlign="center">{subtitle}</Text>
					</Stack>
				</ModalBody>
				<ModalFooter textAlign={"center"} alignSelf="center">
					<Stack>
						<Text fontWeight={"light"} fontSize={"sm"}>
							Join our community
						</Text>
						<SocialMedia />
					</Stack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
