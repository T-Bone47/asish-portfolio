import { projects } from "@/data/projects";
import { ProjectIndexRow } from "@/components/work/ProjectIndexRow";

/**
 * Spec §12's own example shows continuous numbering (01–06) with a gap
 * between the flagship group and the rest — no separate "FLAGSHIP" /
 * "SUPPORTING" header text is given, so none is invented here.
 */
export function ProjectIndex() {
  return (
    <div className="border-t border-border-subtle">
      {projects.map((project, index) => {
        const isFirstSupporting = !project.featured && projects[index - 1]?.featured;
        return (
          <div key={project.id} className={isFirstSupporting ? "mt-8" : undefined}>
            <ProjectIndexRow project={project} index={index} />
          </div>
        );
      })}
    </div>
  );
}
