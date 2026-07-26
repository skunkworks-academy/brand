# Skunkworks Academy Brand

Official source repository for the Skunkworks Academy identity system and the `brand.skunkworksacademy.com` brand-governance portal.

## Published portal

The root `index.html` provides:

- Brand foundations and canonical design tokens
- Logo selection, clearspace and prohibited-use rules
- Digital UI and subdomain implementation guidance
- Social media usage rules
- Co-branding hierarchy and partner-mark separation
- Brand terms of use
- Interactive pre-publication governance checklist
- Responsive light and dark themes

The dedicated `colour-system.html` page provides the complete visual palette, RGB values, supporting neutrals, accessibility note and the approved `70 / 20 / 8 / 2` usage ratio.

## Source of truth

Canonical v1 values:

- Ink Navy: `#03033A` — RGB `3, 3, 58`
- Skunk Blue: `#1E6BD0` — RGB `30, 107, 208`
- Signal Orange: `#F24208` — RGB `242, 66, 8`
- White: `#FFFFFF` — RGB `255, 255, 255`
- Off White: `#F7F9FC` — RGB `247, 249, 252`
- Graphite: `#15171A` — RGB `21, 23, 26`
- Steel Gray: `#D8DEE8` — RGB `216, 222, 232`
- Slate Text: `#5A6472` — RGB `90, 100, 114`

Approved usage ratio:

- `70%` White / Off White
- `20%` Ink / Graphite
- `8%` Skunk Blue
- `2%` Signal Orange

`#8FBAFF` is an accessibility support token for small text on Ink Navy. It does not replace canonical Skunk Blue.

Typography:

- Display: Inter Black / Extra Bold
- Body and UI: Open Sans
- Technical: IBM Plex Mono

Machine-readable values are maintained in `assets/tokens.json`.

## Deployment

This repository is designed for GitHub Pages deployment from the `main` branch root. The `CNAME` file maps the site to `brand.skunkworksacademy.com`.

Required DNS record:

```text
Type: CNAME
Name: brand
Target: skunkworks-academy.github.io
```

## Governance

Core identity changes require review by the Skunkworks Academy brand owner or delegated design lead. Do not mix deprecated marks with current assets. Third-party, partner and co-branded publication requires approval before release.

## Contact

- Brand and approval requests: `brand@skunkworks.academy`
- Training and Academy enquiries: `training@skunkworks.africa`
