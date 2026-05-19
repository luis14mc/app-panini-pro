---
name: Tournament Prestige
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#e1c64a'
  on-secondary: '#3a3000'
  secondary-container: '#a79013'
  on-secondary-container: '#322900'
  tertiary: '#ffffff'
  on-tertiary: '#422c07'
  tertiary-container: '#ffddb1'
  on-tertiary-container: '#7c5f36'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#fee263'
  secondary-fixed-dim: '#e1c64a'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#534600'
  tertiary-fixed: '#ffddb1'
  tertiary-fixed-dim: '#e5c18f'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#5b421c'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-26:
    fontFamily: Sora
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 110px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system embodies the prestige, history, and monumental scale of the world's greatest sporting event. It pivots away from ephemeral digital trends toward a "Modern Monumental" aesthetic—combining the raw power of high-contrast monochrome with the luxurious, enduring quality of FIFA Gold. 

The target audience ranges from casual fans to elite stakeholders, requiring a UI that feels both accessible and exclusive. We employ a mix of **Minimalism** and **High-Contrast** styles to ensure the "26" motif and the trophy imagery remain the undisputed focal points. The emotional response should be one of anticipation, excellence, and global unity. Visuals are crisp, authoritative, and unapologetically bold.

## Colors

The palette is strictly governed by the official tournament colors. **Black (#000000)** serves as the infinite canvas, providing maximum contrast for typography and imagery. **White (#FFFFFF)** is reserved for primary branding motifs, essential text, and structural "26" iconography, ensuring high legibility and impact.

**FIFA Gold (#CFB53B)** is our primary accent, used to denote victory, the trophy, and premium interactions. For complex surfaces or hero elements, use the defined three-point gradient to simulate the metallic luster of the world cup trophy. Avoid mid-tone grays; use opacity of white on black to maintain a clean, high-contrast spectrum.

## Typography

This design system utilizes **Sora** exclusively to leverage its geometric, technical, and futuristic characteristics. Its wide apertures and distinctive letterforms reflect a forward-looking, global sporting event.

- **Headlines:** Use Bold and ExtraBold weights. Large display sizes should use tight tracking to create a "monolithic" feel.
- **Body:** Maintain generous line heights for readability against the dark background.
- **Labels:** Always utilize the uppercase styling with increased letter-spacing to evoke a sense of formal data and technical precision.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a cinematic, controlled composition. A 12-column grid is used with 24px gutters. On mobile, the system shifts to a fluid 4-column model.

Spacing is aggressive and rhythmic, based on an 8px base unit. Hero sections should utilize large vertical padding (128px+) to allow the brand motifs to breathe. Content is often center-aligned for "moment of glory" presentations or left-aligned for data-heavy tournament statistics.

## Elevation & Depth

Depth is achieved primarily through **Tonal Layers** and **Subtle Glows**. Since the background is pure black, elevation is suggested by shifting surface colors to very dark grays (e.g., #111111) or by applying a 1px white border at low opacity (10-15%).

Interactive elements may use a soft "Gold Aura"—a diffused, low-opacity shadow using the FIFA Gold color—to suggest the glow of the trophy. Glassmorphism is used sparingly for overlays, utilizing a heavy backdrop blur (20px+) to maintain focus on the content beneath.

## Shapes

The shape language is **Soft** but disciplined. We avoid fully round or "bubbly" aesthetics to maintain a serious, professional sporting tone.

A standard radius of 4px (0.25rem) is used for small components like inputs and buttons, while larger containers like cards use 8px (0.5rem). This slight rounding softens the high-contrast "bite" of the monochrome palette without sacrificing the architectural strength of the layout.

## Components

### Buttons
- **Primary:** Pure White background with Black text. Bold weight. No border.
- **Secondary:** FIFA Gold gradient background with Black text. Reserved for "Win" or "Trophy" related calls to action.
- **Ghost:** Transparent background with 1px White border.

### Cards
- Surfaces should be #0A0A0A or #111111 with a subtle 1px border (#FFFFFF at 10% opacity). 
- Hover states should trigger a FIFA Gold border transition.

### Chips & Tags
- Rectangular with 4px corners. 
- Use Black background with White 1px borders for standard categories.
- Use Gold text for "Live" or "Featured" status.

### Input Fields
- Underlined or fully enclosed in a 1px white border. 
- Focus state switches the border to FIFA Gold with a very subtle gold outer glow.

### Tournament Bracket / List
- Use high-contrast dividers (White at 10% opacity). 
- Highlight the "Winner" path using FIFA Gold lines and gradients.