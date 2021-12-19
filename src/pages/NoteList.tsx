import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import Note from '../components/Note';
import Sidebar from '../components/Sidebar';

// import Masonry from 'react-masonry-css';

// import noteList from '../notes';

interface NoteListProps {
    toggleTheme: () => void;
}

export default function NoteList({ toggleTheme }: NoteListProps) {
    const [notes, setNotes] = useState<[]>([]);
    const [columns, setColumns] = useState('');

    console.log(`${process.env.REACT_APP_SERVER_URL}/notes`);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/notes`
                );

                setNotes(await response.json());

                // console.log(await response.json());
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col h-screen min-h-screen antialiased bg-gray-200 dark:bg-gray-900">
            <Header
                className="flex-shrink-0"
                toggleTheme={toggleTheme}
                columns={columns}
                setColumns={setColumns}
            />
            <div className="flex flex-1 overflow-y-hidden">
                <Sidebar className="" />
                <ResponsiveMasonry
                    columnsCountBreakPoints={
                        columns || {
                            350: 1,
                            768: 2,
                            1024: 3,
                            1280: 4,
                            1536: 5,
                            1792: 6,
                            2048: 7,
                            2304: 8,
                            2560: 9,
                            2816: 10,
                        }
                    }
                    className="w-full p-5 mt-6 overflow-y-auto"
                >
                    <Masonry gutter="30px" className="px-6">
                        {notes.map((filename, index) => {
                            if (
                                (index > 600 && index < 700) ||
                                filename === 'Words.json'
                            ) {
                                return <Note filename={filename} key={index} />;
                            } else {
                                return <></>;
                            }
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    );
}
