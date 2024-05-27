import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, Text, Image, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImageURL, setSelectedImageURL] = useState('');

  function handleViewImage(url: string) {
    setSelectedImageURL(url)
    onOpen()
  }

  return (
    <>
      <SimpleGrid columns={3} gap="10">
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      <ModalViewImage imgUrl={selectedImageURL} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
