# Motion Data Notes

> These are synthetic classroom data. They do not represent a real experiment and cannot establish a physical law.

- **N1:** `time_s` is time in s. `position_cm` is position in cm. Position includes a nonzero initial coordinate and must not be mislabeled as distance traveled from the origin.
- **N2:** The position at `time_s=2` is missing. The primary analysis excludes this row and records the reason. It does not fill the value with zero or interpolate it.
- **N3:** Fit the remaining valid rows with an ordinary least-squares line that includes an intercept. Report velocity and initial position. Convert position from cm to m in the final plot.
- **N4:** Temperature, measurement uncertainty, instrument details, and real experimental conditions were not provided. None of them can be inferred from these materials.
