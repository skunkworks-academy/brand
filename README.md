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

## Source of truth

Canonical v1 values:

- Ink Navy: `#03033A`
- Skunk Blue: `#1E6BD0`
- Signal Orange: `#F24208`
- White: `#FFFFFF`
- Off White: `#F7F9FC`
- Graphite: `#15171A`
- Steel Gray: `#D8DEE8`
- Slate Text: `#5A6472`

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
