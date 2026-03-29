# Dependabot Alerts Review

**Reviewed on:** 2026-03-29  
**Repository:** `shankardtu/portfolio`

This project currently uses `react-scripts@5.0.1` (Create React App). That stack brings older transitive dependencies, so some Dependabot alerts can be reduced with `overrides`, while others are best fixed by upgrading the build toolchain.

## Current decisions in this repository

### Kept as explicit overrides (low-risk pins)

- `minimatch` -> `3.1.2`
- `picomatch` -> `2.3.1`
- `nth-check` -> `2.1.1`
- `underscore` -> `1.13.7`

These were chosen to reduce high-signal transitive risk without forcing incompatible major upgrades across the CRA dependency tree.

### Not globally force-pinned

- `svgo`
- `path-to-regexp`

Rationale:

- CRA uses `@svgr/plugin-svgo@5`, which is tied to SVGO 1.x era behavior in parts of the toolchain. A global SVGO major override can break SVG build transforms.
- `path-to-regexp` is pulled from `express@4` via `webpack-dev-server` transitives. Durable remediation generally requires upstream package/toolchain upgrades rather than forced overrides.

## Environment caveat (important)

In this execution environment, npm registry/advisory endpoints can return `403 Forbidden`. Because of that:

- lockfile regeneration may fail,
- `npm audit` may fail,
- alert validation must be repeated in CI or local dev with full npm access.

## Recommended next pass

1. Migrate from `react-scripts@5` to a maintained toolchain (for example Vite).
2. Run a clean reinstall and regenerate lockfile in an unrestricted npm environment.
3. Re-open/review the closed Dependabot alerts and verify status after lockfile refresh.
4. Keep only compatibility-safe overrides after migration and remove no-longer-needed pins.
