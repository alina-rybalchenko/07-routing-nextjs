import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { dehydrate } from '@tanstack/query-core';
import NotePreviewClient from '@/app/@modal/(.)notes/[id]/NotePreview';

interface NotePreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({
  params,
}: NotePreviewPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
