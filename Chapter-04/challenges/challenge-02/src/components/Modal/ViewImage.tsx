import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.75)" />
      
      <ModalContent maxW={900} w="fit-content" rounded="lg" bg="gray.800">
        <ModalBody p={0}>
          <Image src={imgUrl} w="auto" maxW={900} h="auto" maxH={600} />
        </ModalBody>
        <ModalFooter
          w="100%"
          px="2.5"
          py="2"
          fontSize="sm"
          color="white"
          display="flex"
          justifyContent="start"
        >
         <Link href={imgUrl} target="_blank">Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
