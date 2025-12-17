'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Loader from '@/components/Loader/Loader';
import Error from '@/components/Error/Error';
import Pagination from '@/components/Pagination/Pagination';

interface NotesClientProps {
  initialTag?: string;
  initialPage?: number;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [tag] = useState(initialTag);
  const [page, setPage] = useState(1);

  const query = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, tag],
    queryFn: () => fetchNotes({ page, tag }),
    staleTime: 1000 * 60, // кеш на 1 минуту
  });

  if (query.isLoading) return <Loader />;
  if (query.isError || !query.data) return <Error />;

  const data = query.data;

  return (
    <div>
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
      <NoteList notes={data.notes} />
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
