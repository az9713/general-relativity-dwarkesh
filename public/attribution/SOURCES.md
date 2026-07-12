# Sources, citations, and attribution

This course uses four visibly different evidence classes. A badge on the page tells the reader which class supports a passage. The links below are the reader-facing bibliography; the machine-readable provenance trail is in `source/`.

## 1. Lecture spine

- Adam Brown in conversation with Dwarkesh Patel, supplied locally as `transcript.txt`.
- Timestamp fragments: `source/timestamp_fragments.json`.
- Curated teaching claims: `source/claims.json`.
- Argument units: `source/argument_units.json`.

Claims labeled **Transcript** are tied to timestamp ranges in those registries. The transcript is the pedagogical spine, not the sole authority for every scientific or historical detail.

## 2. Reconstructed board work

- Reconstruction registry: `source/board_reconstructions.json`.
- Reconstruction method and plate notes: `02_RECONSTRUCTED_BOARD_NOTEBOOK.md`.

The drawings infer likely board arguments from spoken cues and standard GR pedagogy. Confidence labels are high, medium, or low. They are teaching redraws—not verified facsimiles of Professor Brown's physical board. A future video-still comparison should update the registry rather than silently replacing the evidence label.

## 3. General-relativity and observational references

### Primary scientific sources

- [Einstein Papers Project: Digital Einstein Papers](https://einsteinpapers.press.princeton.edu/) — searchable editions and translations of Einstein's published papers, correspondence, notebooks, and related documents.
- [LIGO: Observation of Gravitational Waves from a Binary Black Hole Merger (GW150914)](https://www.ligo.org/science/Publication-GW150914/index.php) — official discovery page, paper, data products, and explanatory material.
- [Event Horizon Telescope: first black-hole image announcement](https://eventhorizontelescope.org/press-release-april-10-2019-astronomers-capture-first-image-black-hole) — official 2019 M87* result and linked papers.
- [Event Horizon Telescope: first image of Sagittarius A*](https://eventhorizontelescope.org/press-release-astronomers-reveal-first-image-black-hole-heart-our-galaxy) — official 2022 Galactic-center result and linked papers.
- [NASA: general relativity](https://science.nasa.gov/universe/black-holes/) — observational orientation and black-hole terminology for general readers.

### Standard mathematical references

- Bernard Schutz, *A First Course in General Relativity*, 3rd ed., Cambridge University Press, 2022.
- James B. Hartle, *Gravity: An Introduction to Einstein's General Relativity*, Cambridge University Press, 2003.
- Sean Carroll, *Spacetime and Geometry*, Cambridge University Press, 2019.
- Charles W. Misner, Kip S. Thorne, and John Archibald Wheeler, *Gravitation*, Princeton University Press, 2017 reprint.

These support the course's GR-supplement material: the local scope of equivalence, geodesics and curvature, the Einstein field equation, Schwarzschild geometry, horizons versus singularities, gravitational redshift, tidal effects, light deflection, and gravitational waves. The course interprets these ideas conceptually and does not claim a tensor-calculus derivation.

## 4. Einstein, contemporaries, and quantum history

### Archival and institutional collections

- [Einstein Archives at the Hebrew University of Jerusalem](https://albert-einstein.huji.ac.il/) — manuscripts, letters, photographs, and biographical records.
- [Institute for Advanced Study: Albert Einstein](https://www.ias.edu/scholars/albert-einstein) — institutional record of Einstein's Princeton years.
- [Institute for Advanced Study: Kurt Gödel](https://www.ias.edu/scholars/kurt-godel) — institutional record relevant to the Einstein–Gödel friendship.
- [Institute for Advanced Study: J. Robert Oppenheimer](https://www.ias.edu/scholars/j-robert-oppenheimer) — institutional context for Einstein and Oppenheimer at the IAS.
- [Niels Bohr Archive](https://nbi.ku.dk/english/nba/) — archival material on Bohr, complementarity, and the Einstein–Bohr debates.
- [AIP Niels Bohr Library & Archives](https://www.aip.org/history-programs/niels-bohr-library) — oral histories, photographs, manuscripts, and history-of-physics collections.
- [The Turing Digital Archive](https://turingarchive.kings.cam.ac.uk/) — primary materials for assessing the absence of a documented Einstein–Turing relationship.
- [MIT Institute Archives and Special Collections](https://libraries.mit.edu/archives/) — institutional starting point for Claude Shannon material and MIT records.

### Official Nobel records

- [Albert Einstein — 1921 Physics Prize facts](https://www.nobelprize.org/prizes/physics/1921/einstein/facts/) and [presentation speech](https://www.nobelprize.org/prizes/physics/1921/ceremony-speech/).
- [Marie Curie — 1903 Physics Prize facts](https://www.nobelprize.org/prizes/physics/1903/marie-curie/facts/).
- [Marie Curie — 1911 Chemistry Prize facts](https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/facts/).
- [Niels Bohr — 1922 Physics Prize facts](https://www.nobelprize.org/prizes/physics/1922/bohr/facts/).
- [Erwin Schrödinger — 1933 Physics Prize facts](https://www.nobelprize.org/prizes/physics/1933/schrodinger/facts/).
- [Paul Dirac — 1933 Physics Prize facts](https://www.nobelprize.org/prizes/physics/1933/dirac/facts/).
- [Max Born — 1954 Physics Prize facts](https://www.nobelprize.org/prizes/physics/1954/born/facts/).
- [Ernest Rutherford — 1908 Chemistry Prize facts](https://www.nobelprize.org/prizes/chemistry/1908/rutherford/facts/).

The Nobel appendix uses the official prize wording and committee context to explain why Einstein's prize cited the photoelectric effect rather than relativity, and why Curie's two prizes recognized distinct work in two sciences. Prize counts are not treated as lifetime rankings.

## 5. Historical evidence policy

Historical claims should be checked in this order:

1. Einstein's papers, correspondence, and archival records.
2. Official Nobel and institutional archives.
3. First-person recollections, labeled as recollections.
4. Peer-reviewed history of science and scholarly biographies.
5. Popular histories for orientation only.

The archive labels anecdotes as **documented**, **recollected**, **disputed**, **near-encounter**, or **no documented meeting found**. In particular, Turing and Shannon are treated as near-encounters, not established Einstein friendships. Einstein's opposition to quantum incompleteness is separated from his foundational quantum contributions: light quanta, the photoelectric effect, stimulated emission, and Bose–Einstein statistics.

## 6. Software and generated visual assets

- [KaTeX](https://katex.org/) — local math rendering in the production build.
- [Vite](https://vite.dev/) — development server and static multi-page build.
- `public/assets/seminar-chalkboard.png` and `public/assets/einstein-engraving.png` — generated specifically for this course's learner-facing design; they are illustrative, not archival evidence.

## 7. Rights and corrections

No archival photograph should be added without rights and provenance metadata. If a citation, historical label, or reconstruction confidence changes, update this bibliography and the corresponding `source/` registry together so the visible course and evidence layer cannot drift apart.
