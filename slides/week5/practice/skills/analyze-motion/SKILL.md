# analyze-motion

An optional, editable workflow for the student motion-data exercise. It defines a sequence of work without supplying calculated results.

## When to Use

Use this workflow for optional E2 when you need to turn the supplied CSV and notes into a reproducible script, plot, report, and run log.

## Workflow

1. Read `motion_notes.md` and restate the N1–N4 constraints before coding.
2. Inspect `motion.csv` and design explicit row-accounting and missing-value checks.
3. Write `analysis.py` to read the CSV, convert units, fit a line with an intercept, and create the plot.
4. Run the script in the available local environment. Capture the exact command, output, errors, and exit status in `run-log.txt`.
5. Open `motion.png` and inspect the plotted data, fitted line, labels, and units.
6. Complete `report.md` from `analysis-report-template.md`, using values produced by the executed script.
7. Compare the report with the source notes, script, plot, and run log. Correct any mismatch.

## Boundaries

- Preserve the original CSV and notes.
- Do not embed expected numerical results in the instructions or script.
- Do not infer conditions that N4 marks as unavailable.
- A generated file is not execution evidence. Only the actual run and inspected outputs support an execution claim.
- On failure, preserve the error and report the blocker.
