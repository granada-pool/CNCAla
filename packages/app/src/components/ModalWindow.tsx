import React, { PropsWithChildren, useContext } from "react";

import {
	Button,
	Heading,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Link,
	useColorModeValue,
} from "@chakra-ui/react";
import { AppContext } from "../context";
import { SocialMedia } from "./shell/SocialMedia";
import Logo from "./Logo";
import NextLink from "next/link";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface ModalWindowProps {
	title?: string;
	header?: string;
	subtitle?: string;
	email?: string;
	buttonLabel?: string;
	buttonLink?: string;
	backgroundColor?: string;
	shadowColor?: string;
	children?: ReactJSXElement;
	isOpen: boolean;
	onClose: () => void;
}

export default function ModalWindow(props: ModalWindowProps) {
	const {
		title,
		header,
		subtitle,
		buttonLabel,
		buttonLink,
		backgroundColor,
		shadowColor,
		isOpen,
		onClose,
		children,
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
				rounded="xl"
				px={4}
			>
				<ModalHeader>
					<HStack>
						<Link
							href="https://climateneutralcardano.org"
							boxShadow="none"
							border="none"
							_focus={{ boxShadow: "none", border: "none" }}
							ml={-4}
						>
							<Logo size={32} ml={-4} />
						</Link>
						{title}
					</HStack>
				</ModalHeader>
				<ModalCloseButton _focus={{ boxShadow: "none" }} />
				<ModalBody>
					<Stack align="center" spacing={6}>
						<Heading
							as="h3"
							fontSize={"3xl"}
							textAlign="center"
							size={"sm"}
						>
							{header}
						</Heading>
						<Text textAlign="justify">{subtitle}</Text>
						{buttonLabel && buttonLink ? (
							<NextLink href={buttonLink}>
								<Button>{buttonLabel}</Button>
							</NextLink>
						) : (
							<></>
						)}
						{children}
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
