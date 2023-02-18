bugs:
1. all the stats in the child 1 reset after button123 in the child 2 is clicked.
    - why: child 1 and child 2 component dismounted and then re-mounted everytime the parent re-render, because
    it was defined inside a component that re-render everytime the parent re-render.
    - solution: define child 1 and 2 outside the Barrier component.

- search "BASIC REACT:" for some important react basic knowledge
- "RRD:" for react-router-dom related comments