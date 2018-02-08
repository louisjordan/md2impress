module.exports = {
  parser: {
    p1: [
      `# Only one slide`,
      `# First Slide
------
## Second Slide`
    ],
    p2: [
      `# First Slide
----
## Second Slide`,
      `# First Slide
------
## Second Slide`
    ],
    p3: [
      `# Fist Slide
====
## Second Slide`,
      `# First Slide
===========
## Second Slide`
    ],
    p4: [
      `# First Slide
---
## Second Slide`,
      `# First Slide
==
## Second Slide`
    ],
    p5: [
      `# First Slide
=-=-=-
## Second Slide`
    ],
    p6: [
      `# First Slide
==== ## Second Slide`
    ],
    p7: [`<!-- x:1 y:2 z:3 rotate:180 -->`],
    p8: [
      `<!-- x:10 -->
y:20`
    ],
    p9: [`<!-- x:1 y=2 -->`],
    p10: [`<!-- id=intro x:100 class:blue -->`],
    p11: [
      `<!-- x:10 -->
# Slide One`
    ],
    p12: [
      `<!-- x:100 -->
No heading, just a paragraph.`
    ],
    p13: [`<!-- class=slide,blue -->`]
  }
};
