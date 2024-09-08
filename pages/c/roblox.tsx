import React, { useContext } from 'react';
import CardList from '@/components/common/CardList';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '@/utils/firebase';
import { collection, DocumentData, QueryDocumentSnapshot, FirestoreDataConverter } from 'firebase/firestore';
import { AuthContext } from '@/contexts/authContext';
import AnnouncementsList from '@/components/common/AnnouncementsList';
import Script from 'next/script';

type ButtonProps = [string, string];

type CardProps = {
  id: string;
  name: string;
  platform: string[];
  pros: string[];
  neutral: string[];
  cons: string[];
  note: string;
  button: ButtonProps;
  buttonBloxProducts: ButtonProps;
  lastEditedBy: string;
};

const cardConverter: FirestoreDataConverter<CardProps> = {
  toFirestore(card: CardProps): DocumentData {
    return { ...card };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): CardProps {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      platform: data.platform,
      pros: data.pros,
      neutral: data.neutral,
      cons: data.cons,
      note: data.note,
      button: data.button,
      buttonBloxProducts: data.buttonBloxProducts,
      lastEditedBy: data.lastEditedBy,
    };
  },
};

const ExploitsPage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const role = authContext?.role;
  const editableCards = authContext?.editableCards;

  const cardsCollection = collection(db, 'cards').withConverter(cardConverter);
  const [cards, loading, error] = useCollectionData(cardsCollection);

  const canEdit = (cardId: string) => {
    if (!user) return false;
    if (role === 'admin') return true;
    if (role === 'editor' && editableCards) {
      return editableCards.includes(cardId);
    }
    return false;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading cards: {error.message}</div>;

  return (
    <div className='min-h-screen'>
      <div className="relative p-4 z-10">
        <AnnouncementsList />
        <CardList cards={cards || []} canEdit={canEdit} />
      </div>
    </div>
  );
};

export default ExploitsPage;
