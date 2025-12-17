// app/notes/filter/[...tag]/page.tsx
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import NotesClient from './Notes.client';

interface PageProps {
  params: { tag?: string[] };
}

export default async function NotesFilterTagPage({ params }: PageProps) {
  const tags = params.tag ?? [];
  const tagParam = tags[0] ?? 'all';
  const tag = tagParam === 'all' ? undefined : tagParam;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ['notes', 1, tag],
    queryFn: () => fetchNotes({ page: 1, tag }),
  });

  return <NotesClient initialTag={tag} initialPage={1} />;
}
