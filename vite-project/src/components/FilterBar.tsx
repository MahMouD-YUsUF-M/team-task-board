import type { Project } from '../types';
import { useTaskActions, useTaskState } from '../state/hooks';
import { isStatusFilter } from '../utils/guards';

export function FilterBar({ projects }: { projects: Project[] }) {
  const { filters } = useTaskState();
  const { setFilter } = useTaskActions();

  return (
    <section className="filters" aria-label="Filters">
      <label>
        Status
        <select
          value={filters.status}
          onChange={(e) => {
            const value = e.target.value;
            if (isStatusFilter(value)) setFilter({ status: value });
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label>
        Project
        <select value={filters.projectId} onChange={(e) => setFilter({ projectId: e.target.value })}>
          <option value="all">All projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Search
        <input
          type="search"
          value={filters.search}
          placeholder="Search titles…"
          onChange={(e) => setFilter({ search: e.target.value })}
        />
      </label>
    </section>
  );
}
