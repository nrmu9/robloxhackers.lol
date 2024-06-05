import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Announcement from './Announcement';

type AnnouncementProps = {
  id: string;
  title: string;
  message: string;
  style: string;
  createdAt: Date;
};

const announcementConverter: FirestoreDataConverter<AnnouncementProps> = {
  toFirestore(announcement: AnnouncementProps): DocumentData {
    return { ...announcement, createdAt: announcement.createdAt.toISOString() };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): AnnouncementProps {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data.title,
      message: data.message,
      style: data.style,
      createdAt: new Date(data.createdAt),
    };
  },
};

const AnnouncementsList = () => {
  const announcementsCollection = collection(db, 'announcements').withConverter(announcementConverter);
  const [announcements, loading, error] = useCollectionData(announcementsCollection);
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    const savedDismissedAnnouncements = localStorage.getItem('dismissedAnnouncements');
    if (savedDismissedAnnouncements) {
      setDismissedAnnouncements(JSON.parse(savedDismissedAnnouncements));
    }
  }, []);

  const handleDismiss = (id: string) => {
    const updatedDismissedAnnouncements = [...dismissedAnnouncements, id];
    setDismissedAnnouncements(updatedDismissedAnnouncements);
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(updatedDismissedAnnouncements));
  };

  const handleEditComplete = () => {
    // Re-fetch announcements or update state as needed
  };

  if (loading) return <div>Loading announcements...</div>;
  if (error) return <div>Error loading announcements: {error.message}</div>;

  return (
    <div className="announcements-list mb-4 flex flex-col items-center">
      {announcements?.map((announcement) =>
        !dismissedAnnouncements.includes(announcement.id) ? (
          <Announcement
            key={announcement.id}
            {...announcement}
            onDismiss={() => handleDismiss(announcement.id)}
            onEditComplete={handleEditComplete}
          />
        ) : null
      )}
    </div>
  );
};

export default AnnouncementsList;
