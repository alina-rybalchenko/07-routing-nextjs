// app/notes/filter/@sidebar/default.tsx
import Link from 'next/link';
import css from './SidebarNotes.module.css';

const TAGS = ['all', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {TAGS.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag === 'all' ? 'All notes' : tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
