// utils/firestoreConverters.ts
import { FirestoreDataConverter, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { CardProps } from '../components/common/CardList';

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
      button: data.button,
      buttonBloxProducts: data.buttonBloxProducts,
      lastEditedBy: data.lastEditedBy,
    };
  },
};

export { cardConverter };