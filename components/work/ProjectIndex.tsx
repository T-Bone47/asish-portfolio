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
      {/* Engineering Index Header Bar */}
      <div
        aria-hidden="true"
        className="flex items-center justify-between border-b border-border-subtle/60 px-3 py-2.5 font-technical text-[10px] uppercase tracking-widest text-foreground-faint"
      >
        <div className="flex items-center gap-6">
          <span>{"//"} ID</span>
          <span>{"//"} SYSTEM IDENTIFIER & SPECIFICATION</span>
        </div>
        <div className="hidden lg:flex items-center gap-16">
          <span>{"//"} SYSTEM TRACE</span>
          <span>{"//"} VERIFIED EVIDENCE</span>
        </div>
      </div>

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
