# Student Project Instructions

These instructions apply only to the optional E2 work in this folder. They define process and evidence requirements; they do not provide numerical answers.

## Preserve the Sources

- Do not modify `motion.csv` or `motion_notes.md`.
- Read all of N1–N4 before writing code.
- Keep generated work in this student folder or a copy of it.

## Analysis Rules

- Read the CSV at runtime.
- Exclude missing positions with a recorded reason. Do not fill them with zero or invent values.
- Preserve time in seconds and convert position from cm to m for fitting and plotting.
- Use an ordinary least-squares line that includes an intercept.
- Report velocity and initial position with units.
- Do not infer temperature, uncertainty, instrument details, or real experimental conditions.

## Required Evidence

- Create `analysis.py`, `motion.png`, `report.md`, and `run-log.txt`.
- Record the actual command, output, errors, and exit status.
- Open and inspect the plot.
- State what was checked and what remains unknown.
- If code was not executed, say so. Never invent a successful run or a tool log.

The student remains responsible for reading the files and explaining the result.
