import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { addDoc, updateDoc, doc, collection, getDocs } from 'firebase/firestore';
import Select from 'react-select';
import Tilt from 'react-parallax-tilt';
import { db } from '../../utils/firebase';
import { useAuth } from '../../contexts/authContext';

type ButtonProps = [string, string];

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const InfoCard: React.FC = () => {
  return (
    <div className="bg-[#0c0c0e] border-[#27272a] border text-white rounded-lg shadow-lg p-4 mb-4 shadow-yellow-glow">
      <h2 className="text-lg font-semibold">Welcome to the Minecraft page!</h2>
      <p>This page is updated by the Contributors</p>
    </div>
  );
};



const Tooltip: React.FC<TooltipProps> = ({ text, children }) => (
  <div className="relative group inline-block">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {text}
    </div>
  </div>
);

type CardProps = {
  id: string;
  name: string;
  platform: string[];
  pros: string[];
  neutral: string[];
  cons: string[];
  button: string[];
  lastEditedBy: string;
};

type CardListProps = {
  cards: CardProps[];
  canEdit: (cardId: string) => boolean;
};

const platformOptions = [
  { value: '/Bedrock.png', label: 'Bedrock Icon', text: 'Minecraft Bedrock', dropdowntext: 'Minecraft Bedrock' },
  { value: '/Dirt Block.png', label: 'Java Icon', text: 'Minecraft Java', dropdowntext: 'Minecraft Java' },
  { value: '/Blatant TNT.png', label: 'Blatant Client', text: 'Blatant Client - Blatant Cheat', dropdowntext: 'Blatant Client' },
  { value: '/Ghost Glass.png', label: 'Ghost Client', text: 'Ghost Client - Closet Cheat', dropdowntext: 'Ghost Client' },
  { value: '/linux-chicken.png', label: 'Linux', text: 'Supports Linux', dropdowntext: 'Linux' },
  { value: '/windows-mc.png', label: 'Windows', text: 'Supports Windows', dropdowntext: 'Windows' },
  { value: '/mc-apple.png', label: 'macOS', text: 'Supports macOS', dropdowntext: 'macOS' },
];


const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#0c0c0e', // Background color for the control (input box)
    borderColor: state.isFocused ? '#27272a' : '#27272a', // Border color for the control
    color: 'white',
    '&:hover': {
      borderColor: '#3B3B3F',
    },
    boxShadow: state.isFocused ? '0 0 0 1px #0c0c0e' : 'none',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#0c0c0e', // Background color for the dropdown menu
    borderColor: '#27272a',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#151517' : state.isFocused ? '#151517' : '#151517', // Background color for selected or focused option
    color: 'white',
    '&:hover': {
      backgroundColor: '#27272a',
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#27272a',
    color: 'black',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: 'white',
    '&:hover': {
      backgroundColor: '#27272a',
      color: 'white',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
  }),
};

const EditableCard: React.FC<CardProps & { canEdit: boolean; isNew?: boolean; onSave?: (card: CardProps | null) => void }> = ({
  id,
  name,
  platform,
  pros,
  neutral,
  cons,
  button,
  lastEditedBy,
  canEdit,
  isNew,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(isNew || false);
  const [editedName, setEditedName] = useState(name);
  const [editedPlatformIcons, setEditedPlatformIcons] = useState(platform);
  const [editedPros, setEditedPros] = useState(pros);
  const [editedNeutral, setEditedNeutral] = useState(neutral);
  const [editedCons, setEditedCons] = useState(cons);
  const [editedButtonLabel, setEditedButtonLabel] = useState(button[0]);
  const [editedButtonLink, setEditedButtonLink] = useState(button[1]);
  const { user } = useAuth();
  const handleEdit = () => {
    setIsEditing(true);
  };

const [selectedPlatforms, setSelectedPlatforms] = useState(platform);

  const handleConfirm = async () => {
    if (window.confirm('Are you sure you want to update this card?')) {
      try {
        if (isNew) {
          const newCard = {
            name: editedName,
            platform: editedPlatformIcons,
            pros: editedPros,
            neutral: editedNeutral,
            cons: editedCons,
            button: [editedButtonLabel, editedButtonLink],
            lastEditedBy: user?.displayName || 'unknown',
          };
          const docRef = await addDoc(collection(db, 'cards-mc'), newCard);
          onSave?.({ ...newCard, id: docRef.id });
        } else {
          await updateDoc(doc(db, 'cards-mc', id), {
            name: editedName,
            platform: editedPlatformIcons,
            pros: editedPros,
            neutral: editedNeutral,
            cons: editedCons,
            button: [editedButtonLabel, editedButtonLink],
            lastEditedBy: user?.displayName || 'unknown',
          });
          onSave?.({
            id,
            name: editedName,
            platform: editedPlatformIcons,
            pros: editedPros,
            neutral: editedNeutral,
            cons: editedCons,
            button: [editedButtonLabel, editedButtonLink],
            lastEditedBy: user?.displayName || 'unknown',
          });
        }
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onSave?.(null);
    } else {
      setIsEditing(false);
      setEditedName(name);
      setEditedPlatformIcons(platform);
      setEditedPros(pros);
      setEditedNeutral(neutral);
      setEditedCons(cons);
      setEditedButtonLabel(button[0]);
      setEditedButtonLink(button[1]);
    }
  };

const handlePlatformChange = (selectedOptions: any) => {
    const selectedPlatforms = selectedOptions.map((option: any) => option.value);
    setSelectedPlatforms(selectedPlatforms);
};


  

  return (
    <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} scale={1.05} transitionSpeed={250} glareEnable={true} glareMaxOpacity={0.10} glareColor='gray' glarePosition='all' glareBorderRadius='10px'>
      <div className="card-container bg-zinc-900 bg-opacity-20 border-zinc-800 border text-white rounded-lg shadow-lg p-6 max-w-md w-full h-full transform transition-transform flex flex-col justify-between relative">
        <div className="absolute top-4 right-4">
          {isEditing ? (
            <Select
              isMulti
              options={platformOptions}
              styles={customStyles}
              onChange={handlePlatformChange}
              value={platformOptions.filter(option => editedPlatformIcons.includes(option.value))}
              placeholder="Select Platforms"
              className="w-48"
            />
          ) : (
            <div className="flex space-x-2">
              {editedPlatformIcons.map((imagePath: string, index: number) => {
                const platformOption = platformOptions.find(option => option.value === imagePath);
                const platformLabel = platformOption?.text || 'Unknown';
                return (
                  <Tooltip key={index} text={platformLabel}>
                    <Image
                      src={imagePath}
                      alt={platformLabel}
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </Tooltip>
                );
            })}
          </div>
          )}
        </div>
        <div className="flex-grow">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-2xl font-semibold mb-2 bg-transparent border-b border-gray-500 focus:outline-none w-full"
            />
          ) : (
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
          )}
        </div>
        <div className="flex-grow mb-4 text-left">
          {(isEditing || editedPros.length > 0) && (
            <div className="mb-2 mx-4">
              <h3 className="text-green-400 font-semibold">About:</h3>
              {editedPros.map((pro, index) => (
                <div key={index} className="flex items-center">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={pro}
                        onChange={(e) => {
                          const newPros = [...editedPros];
                          newPros[index] = e.target.value;
                          setEditedPros(newPros);
                        }}
                        className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
                      />
                      <button onClick={() => {
                        const newPros = editedPros.filter((_, i) => i !== index);
                        setEditedPros(newPros);
                      }} className="text-red-400 ml-2">
                        ×
                      </button>
                    </>
                  ) : (
                    <li>{pro}</li>
                  )}
                </div>
              ))}
              {isEditing && (
                <button onClick={() => setEditedPros([...editedPros, ''])} className="text-green-400 mt-2">
                  + Add About
                </button>
              )}
            </div>
          )}
          {(isEditing || editedNeutral.length > 0) && (
            <div className="mb-2 mx-4">
              <h3 className="text-blue-400 font-semibold">Installation:</h3>
              {editedNeutral.map((item, index) => (
                <div key={index} className="flex items-center">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const newNeutral = [...editedNeutral];
                          newNeutral[index] = e.target.value;
                          setEditedNeutral(newNeutral);
                        }}
                        className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
                      />
                      <button onClick={() => {
                        const newNeutral = editedNeutral.filter((_, i) => i !== index);
                        setEditedNeutral(newNeutral);
                      }} className="text-blue-400 ml-2">
                        ×
                      </button>
                    </>
                  ) : (
                    <li>{item}</li>
                  )}
                </div>
              ))}
              {isEditing && (
                <button onClick={() => setEditedNeutral([...editedNeutral, ''])} className="text-blue-400 mt-2">
                  + Add Installation
                </button>
              )}
            </div>
          )}
          {(isEditing || editedCons.length > 0) && (
            <div className="mb-2 mx-4">
              <h3 className="text-gray-400 font-semibold">Version:</h3>
              {editedCons.map((con, index) => (
                <div key={index} className="flex items-center">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={con}
                        onChange={(e) => {
                          const newCons = [...editedCons];
                          newCons[index] = e.target.value;
                          setEditedCons(newCons);
                        }}
                        className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
                      />
                      <button onClick={() => {
                        const newCons = editedCons.filter((_, i) => i !== index);
                        setEditedCons(newCons);
                      }} className="text-gray-400 ml-2">
                        ×
                      </button>
                    </>
                  ) : (
                    <li>{con}</li>
                  )}
                </div>
              ))}
              {isEditing && (
                <button onClick={() => setEditedCons([...editedCons, ''])} className="text-gray-400 mt-2">
                  + Add Version
                </button>
              )}
            </div>
          )}
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between mt-4">
            {isEditing ? (
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full">
                  <input
                    type="text"
                    placeholder="Button Label"
                    value={editedButtonLabel}
                    onChange={(e) => setEditedButtonLabel(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Button Link"
                    value={editedButtonLink}
                    onChange={(e) => setEditedButtonLink(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-500 focus:outline-none"
                  />
                </div>
                <div className="flex space-x-2 mt-2 md:mt-0">
                  <a onClick={handleConfirm} className="inline-block transition-transform transform hover:scale-105 cursor-pointer">
                    <Image src="/Confirm.png" alt="Confirm" width={24} height={24} className="inline" />
                  </a>
                  <a onClick={handleCancel} className="inline-block transition-transform transform hover:scale-105 ml-2 cursor-pointer">
                    <Image src="/Cancel.png" alt="Cancel" width={24} height={24} className="inline" />
                  </a>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    if (button[1]) {
                      window.open(button[1], '_blank');
                    }
                  }}
                  className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-700 transition-transform transform hover:scale-105 flex-grow"
                >
                  {button[0]}
                </button>
                {canEdit && (
                  <div className="ml-2 flex-shrink-0">
                    <Image src="/Edit.png" alt="Edit" width={24} height={24} className="cursor-pointer" onClick={handleEdit} />
                  </div>
                )}
              </>
            )}
          </div>
          {lastEditedBy && (
            <p className="text-gray-500 mt-2 text-sm text-center">
              Last edited by {lastEditedBy}
            </p>
          )}
        </div>
      </div>
    </Tilt>
  );
};

const NewCard: React.FC<{ onSave: (card: CardProps | null) => void }> = ({ onSave }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<string[]>(['']);
  const [pros, setPros] = useState<string[]>(['']);
  const [neutral, setNeutral] = useState<string[]>(['']);
  const [cons, setCons] = useState<string[]>(['']);
  const [buttonLabel, setButtonLabel] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const { user } = useAuth();

  const handleConfirm = async () => {
    if (window.confirm('Are you sure you want to create this card?')) {
      const newCard = {
        name,
        platform,
        pros,
        neutral,
        cons,
        button: [buttonLabel, buttonLink],
        lastEditedBy: user?.displayName || 'unknown',
      };
      try {
        const docRef = await addDoc(collection(db, 'cards-mc'), newCard);
        onSave({ ...newCard, id: docRef.id });
        setIsEditing(false);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName('');
    setPlatform(['']);
    setPros(['']);
    setNeutral(['']);
    setCons(['']);
    setButtonLabel('');
    setButtonLink('');
    onSave(null); // Reset the new card state in the parent component
  };

  const handlePlatformChange = (selectedOptions: any) => {
    const selectedPlatforms = selectedOptions.map((option: any) => option.value);
    setPlatform(selectedPlatforms);
  };

  return (
      <EditableCard
        id=""
        name={name}
        platform={platform}
        pros={pros}
        neutral={neutral}
        cons={cons}
        button={[buttonLabel, buttonLink]}
        lastEditedBy=""
        canEdit={true}
        isNew={true}
        onSave={onSave}
      />
  );
};

const formatOptionLabel = ({ dropdowntext }: any) => (
  <div className="flex items-center">
    <span>{dropdowntext}</span>
  </div>
);

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const { user, role, editableCards } = useAuth();
  const [cardList, setCardList] = useState(cards);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const canEdit = (cardId: string) => {
    if (!user) return false;
    if (role === 'admin') return true;
    if (role === 'editor-mc') return true; // Allow editor-mc to edit all cards
    if (role === 'editor-mc' && editableCards) {
      return editableCards.includes(cardId);
    }
    return false;
  };

  const fetchCards = async () => {
    const querySnapshot = await getDocs(collection(db, 'cards-mc'));
    let updatedCards: CardProps[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        updatedCards.push({
            id: doc.id,
            name: data.name,
            platform: data.platform,
            pros: data.pros,
            neutral: data.neutral,
            cons: data.cons,
            button: data.button,
            lastEditedBy: data.lastEditedBy,
        });
    });

    if (selectedPlatforms.length > 0) {
        updatedCards = updatedCards.filter(card =>
            selectedPlatforms.every(platform => card.platform.includes(platform))
        );
    }

    setCardList(updatedCards);
};


  const handleSaveNewCard = (newCard: CardProps | null) => {
    if (newCard) {
      setCardList((prevList) => [...prevList, newCard]);
    }
    setIsAddingNew(false);
    fetchCards();
  };

  useEffect(() => {
    fetchCards();
  }, [selectedPlatforms]);

  return (
    <div>
      <InfoCard /> {/* Add the new component here */}
      <Select
        isMulti
        options={platformOptions}
        styles={customStyles}
        onChange={(selectedOptions) => setSelectedPlatforms(selectedOptions.map(option => option.value))}
        placeholder="Filter by Platforms & Types"
        className="mb-4"
        formatOptionLabel={formatOptionLabel}
      />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {cardList && cardList.map((card) => (
          <EditableCard key={card.id} {...card} canEdit={canEdit(card.id)} onSave={fetchCards} />
        ))}
        {role === 'admin' && !isAddingNew && (
          <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} scale={1.05} transitionSpeed={250} glareEnable={true} glareMaxOpacity={0.10} glareColor='gray' glarePosition='all' glareBorderRadius='10px'>
            <div
              className="bg-zinc-900 bg-opacity-25 border border-zinc-800 text-white rounded-lg shadow-lg p-6 max-w-md w-full h-full transform transition-transform hover:scale-105 flex items-center justify-center cursor-pointer"
              onClick={() => setIsAddingNew(true)}
            >
              <span className="text-2xl font-semibold">+ Add Card</span>
            </div>
          </Tilt>
        )}
        {role === 'admin' && isAddingNew && <NewCard onSave={handleSaveNewCard} />}
      </div>
    </div>
  );
};

export default CardList;
export type { CardProps, CardListProps };