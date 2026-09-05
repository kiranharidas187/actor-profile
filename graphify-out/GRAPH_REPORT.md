# Graph Report - actor-profile  (2026-09-05)

## Corpus Check
- 32 files · ~44,188 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 699 nodes · 865 edges · 95 communities (51 shown, 38 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Actor Page (Route + Sections + Data Loader)
- Priya Menon Content Fixture
- Site Schema
- Theme Presets & Resolver
- Actor Schema (Core Shape)
- Animation Skill Vocabulary
- Runtime Dependencies (package.json)
- Actor Schema — Top-Level Fields
- TypeScript Compiler Config
- Actor Schema — Nested Item Fields
- CLAUDE.md Project Decisions
- Arjun Das Content Fixture
- Theme Radius Enum & Placeholder Generator
- Actor Schema — Headshot Image
- Actor Schema — Showreel
- Actor Schema — Array Fields
- Actor Schema — Image Def
- Credit Medium Enum
- Shared devDependencies
- Theme Schema — Root
- Theme Schema — Accent Colour Override
- check-theme.mjs Script
- Type Pairing Enum
- Preset Name Enum
- site.json Content File
- Density Enum
- Build Config File List
- Actor Schema — Small String Fields
- Actor Schema — Credits Array
- Actor Schema — Stats Array
- Actor Schema — Year Field
- Theme Schema — Motion Field
- actor.schema.json — awards
- actor.schema.json — format
- actor.schema.json — gallery
- actor.schema.json — exclusiveMinimum
- actor.schema.json — press
- actor.schema.json — training
- actor.schema.json — url
- theme.schema.json — $schema
- theme.json — theme.json
- actor.schema.json — category
- actor.schema.json — company
- actor.schema.json — director
- actor.schema.json — label
- actor.schema.json — program
- actor.schema.json — project
- actor.schema.json — publication
- actor.schema.json — role
- actor.schema.json — school
- actor.schema.json — title
- actor.schema.json — value
- package.json — ajv-formats
- package.json — eslint
- package.json — @eslint/js
- package.json — eslint-plugin-react-hooks
- package.json — eslint-plugin-react-refresh
- package.json — @fontsource/spectral
- package.json — @fontsource-variable/archivo
- package.json — @fontsource-variable/bodoni-moda
- package.json — @fontsource-variable/fraunces
- package.json — @fontsource-variable/ibm-plex-sans
- package.json — @fontsource-variable/inter
- package.json — motion
- package.json — prettier
- package.json — @react-router/dev
- package.json — @tailwindcss/vite
- package.json — @types/node
- package.json — @types/react
- package.json — @types/react-dom
- package.json — typescript
- package.json — typescript-eslint
- package.json — vite
- package.json — vite-imagetools
- package.json — vitest
- package.json — wcag-contrast
- wcag-contrast.d.ts — wcag-contrast.d.ts
- SKILL.md — animation-vocabulary skill
- favicon.svg — Favicon Icon (Actor Bust Glyph)
- headshot.jpg — Arjun Das Headshot Placeholder
- full-body.jpg — Priya Menon Full-Body Placeholder
- gallery-1.jpg — Priya Menon Gallery Placeholder 1
- gallery-2.jpg — Priya Menon Gallery Placeholder 2
- gallery-3.jpg — Priya Menon Gallery Placeholder 3
- gallery-4.jpg — Priya Menon Gallery Placeholder 4
- gallery-5.jpg — Priya Menon Gallery Placeholder 5
- gallery-6.jpg — Priya Menon Gallery Placeholder 6
- headshot.jpg — Priya Menon Headshot Placeholder
- showreel-poster.jpg — Priya Menon Showreel Poster Placeholder

## God Nodes (most connected - your core abstractions)
1. `required` - 30 edges
2. `compilerOptions` - 17 edges
3. `actor-profile project memory (CLAUDE.md)` - 13 edges
4. `animate skill` - 12 edges
5. `emil-design-eng skill` - 10 edges
6. `SectionHeading()` - 10 edges
7. `scripts` - 9 edges
8. `apple-design skill` - 9 edges
9. `required` - 9 edges
10. `additionalProperties` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Emil Kowalski skill installed project-scoped` --rationale_for--> `emil-design-eng skill`  [EXTRACTED]
  CLAUDE.md → .agents/skills/emil-design-eng/SKILL.md
- `actor-profile README` --conceptually_related_to--> `actor-profile project memory (CLAUDE.md)`  [INFERRED]
  README.md → CLAUDE.md
- `Non-negotiable animation rules (project)` --conceptually_related_to--> `animate skill`  [INFERRED]
  CLAUDE.md → .agents/skills/animate/SKILL.md
- `Non-negotiable animation rules (project)` --conceptually_related_to--> `emil-design-eng skill`  [INFERRED]
  CLAUDE.md → .agents/skills/emil-design-eng/SKILL.md
- `Non-negotiable animation rules (project)` --conceptually_related_to--> `Animation Standards Reference`  [INFERRED]
  CLAUDE.md → .agents/skills/review-animations/STANDARDS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CLAUDE.md 'Decisions made so far' group** — claude_no_graphifyy_cli_decision, claude_react_router_v7_decision, claude_dependencies_placement_decision, claude_no_vitejs_plugin_react_decision, claude_package_pins_decision, claude_emil_skill_installation_decision, claude_one_milestone_per_commit_decision [EXTRACTED 1.00]
- **Emil Kowalski-derived animation skill family** — agents_skills_animate_skill, agents_skills_animate_expo_skill, agents_skills_review_animations_skill, agents_skills_improve_animations_skill, agents_skills_find_animation_opportunities_skill, agents_skills_prototype_skill, agents_skills_emil_design_eng_skill [EXTRACTED 1.00]
- **Shared --ease-out/--ease-in-out/--ease-drawer curve vocabulary** — agents_skills_animate_skill, agents_skills_emil_design_eng_skill, agents_skills_review_animations_standards, agents_skills_improve_animations_audit, agents_skills_find_animation_opportunities_skill, agents_skills_animate_recipes, agents_skills_prototype_picker [INFERRED 0.85]
- **Solid-colour placeholder image fixtures** — public_photos_arjun_das_headshot_placeholder, public_photos_priya_menon_full_body_placeholder, public_photos_priya_menon_gallery_1_placeholder, public_photos_priya_menon_gallery_2_placeholder, public_photos_priya_menon_gallery_3_placeholder, public_photos_priya_menon_gallery_4_placeholder, public_photos_priya_menon_gallery_5_placeholder, public_photos_priya_menon_gallery_6_placeholder, public_photos_priya_menon_headshot_placeholder, public_photos_priya_menon_showreel_poster_placeholder [EXTRACTED 1.00]

## Communities (95 total, 38 thin omitted)

### Community 0 - "Actor Page (Route + Sections + Data Loader)"
Cohesion: 0.07
Nodes (47): ActorPage(), SectionHeading(), VideoFacade(), VideoFacadeProps, actorModules, getActorBySlug(), getAllActors(), siteModule (+39 more)

### Community 1 - "Priya Menon Content Fixture"
Cohesion: 0.05
Nodes (41): agent, agency, email, name, phone, awards, bio, contact (+33 more)

### Community 2 - "Site Schema"
Cohesion: 0.05
Nodes (41): description, additionalProperties, description, type, description, description, minLength, type (+33 more)

### Community 3 - "Theme Presets & Resolver"
Cohesion: 0.08
Nodes (31): darkroom, greenRoom, PRESETS, marquee, screenTest, BASE_SPACE_STEPS_REM, fluidClamp(), pickOnAccent() (+23 more)

### Community 4 - "Actor Schema (Core Shape)"
Cohesion: 0.05
Nodes (41): description, type, properties, description, minLength, type, additionalProperties, description (+33 more)

### Community 5 - "Animation Skill Vocabulary"
Cohesion: 0.15
Nodes (31): Expo Animation Recipes, animate-expo skill, Animation Recipes (web), animate skill, --ease-drawer curve token, --ease-out curve token, Raycast no-animation example, Origin-aware transform-origin pattern (+23 more)

### Community 6 - "Runtime Dependencies (package.json)"
Cohesion: 0.07
Nodes (26): isbot, dependencies, isbot, react, react-dom, react-router, @react-router/node, name (+18 more)

### Community 7 - "Actor Schema — Top-Level Fields"
Cohesion: 0.08
Nodes (25): agency, bio, contact, credits, headline, location, photos, slug (+17 more)

### Community 8 - "TypeScript Compiler Config"
Cohesion: 0.09
Nodes (22): DOM, DOM.Iterable, ES2023, node, vite/client, compilerOptions, isolatedModules, jsx (+14 more)

### Community 9 - "Actor Schema — Nested Item Fields"
Cohesion: 0.11
Nodes (20): alt, caption, category, height, items, label, level, medium (+12 more)

### Community 10 - "CLAUDE.md Project Decisions"
Cohesion: 0.15
Nodes (16): actor-profile project memory (CLAUDE.md), Content and colour never hardcoded rule, @react-router/node and isbot must be dependencies, Emil Kowalski skill installed project-scoped, graphify skill (external reference), Two hard requirements (JSON content + single-file theming), Rejected typosquat graphifyy CLI, @vitejs/plugin-react not used (+8 more)

### Community 11 - "Arjun Das Content Fixture"
Cohesion: 0.12
Nodes (15): bio, contact, email, credits, headline, alt, height, src (+7 more)

### Community 12 - "Theme Radius Enum & Placeholder Generator"
Cohesion: 0.15
Nodes (12): round, sharp, soft, radius, description, enum, type, actorsDir (+4 more)

### Community 13 - "Actor Schema — Headshot Image"
Cohesion: 0.15
Nodes (13): headshot, allOf, description, allOf, description, additionalProperties, description, properties (+5 more)

### Community 14 - "Actor Schema — Showreel"
Cohesion: 0.15
Nodes (13): youtubeId, allOf, description, poster, showreel, youtubeId, additionalProperties, description (+5 more)

### Community 15 - "Actor Schema — Array Fields"
Cohesion: 0.21
Nodes (12): additionalProperties, items, minItems, type, items, skills, socials, description (+4 more)

### Community 16 - "Actor Schema — Image Def"
Cohesion: 0.18
Nodes (11): description, type, properties, alt, src, width, description, type (+3 more)

### Community 17 - "Credit Medium Enum"
Cohesion: 0.20
Nodes (10): Commercial, Feature Film, Short Film, Television, Theatre, Web Series, description, enum (+2 more)

### Community 18 - "Shared devDependencies"
Cohesion: 0.22
Nodes (9): ajv, globals, devDependencies, ajv, globals, sharp, tailwindcss, sharp (+1 more)

### Community 19 - "Theme Schema — Root"
Cohesion: 0.22
Nodes (8): preset, additionalProperties, description, $id, required, $schema, title, type

### Community 20 - "Theme Schema — Accent Colour Override"
Cohesion: 0.22
Nodes (9): description, pattern, type, additionalProperties, description, properties, type, accent (+1 more)

### Community 21 - "check-theme.mjs Script"
Cohesion: 0.25
Nodes (7): ajv, checkContrastSet(), fail(), root, schema, themeJson, validate

### Community 22 - "Type Pairing Enum"
Cohesion: 0.25
Nodes (8): archivo-archivo, bodoni-plex, fraunces-inter, spectral-plex, typePair, description, enum, type

### Community 23 - "Preset Name Enum"
Cohesion: 0.25
Nodes (8): darkroom, green-room, marquee, screen-test, description, enum, type, preset

### Community 24 - "site.json Content File"
Cohesion: 0.29
Nodes (6): description, footer, copyrightName, socials, name, $schema

### Community 25 - "Density Enum"
Cohesion: 0.29
Nodes (7): comfortable, compact, spacious, description, enum, type, density

### Community 26 - "Build Config File List"
Cohesion: 0.33
Nodes (5): react-router.config.ts, scripts/**/*.mjs, src, vite.config.ts, include

### Community 27 - "Actor Schema — Small String Fields"
Cohesion: 0.33
Nodes (6): description, type, properties, caption, instructor, platform

### Community 28 - "Actor Schema — Credits Array"
Cohesion: 0.40
Nodes (5): description, items, minItems, type, credits

### Community 29 - "Actor Schema — Stats Array"
Cohesion: 0.40
Nodes (5): stats, description, examples, items, type

### Community 30 - "Actor Schema — Year Field"
Cohesion: 0.40
Nodes (5): year, description, maximum, minimum, type

### Community 31 - "Theme Schema — Motion Field"
Cohesion: 0.40
Nodes (5): description, maximum, minimum, type, motion

### Community 32 - "actor.schema.json — awards"
Cohesion: 0.50
Nodes (4): description, items, type, awards

### Community 33 - "actor.schema.json — format"
Cohesion: 0.50
Nodes (4): description, format, type, date

### Community 34 - "actor.schema.json — gallery"
Cohesion: 0.50
Nodes (4): description, items, type, gallery

### Community 35 - "actor.schema.json — exclusiveMinimum"
Cohesion: 0.50
Nodes (4): description, exclusiveMinimum, type, height

### Community 36 - "actor.schema.json — press"
Cohesion: 0.50
Nodes (4): description, items, type, press

### Community 37 - "actor.schema.json — training"
Cohesion: 0.50
Nodes (4): training, description, items, type

### Community 38 - "actor.schema.json — url"
Cohesion: 0.50
Nodes (4): url, description, format, type

### Community 39 - "theme.schema.json — $schema"
Cohesion: 0.50
Nodes (4): properties, $schema, description, type

### Community 41 - "actor.schema.json — category"
Cohesion: 0.67
Nodes (3): description, type, category

### Community 42 - "actor.schema.json — company"
Cohesion: 0.67
Nodes (3): description, type, company

### Community 43 - "actor.schema.json — director"
Cohesion: 0.67
Nodes (3): description, type, director

### Community 44 - "actor.schema.json — label"
Cohesion: 0.67
Nodes (3): description, type, label

### Community 45 - "actor.schema.json — program"
Cohesion: 0.67
Nodes (3): description, type, program

### Community 46 - "actor.schema.json — project"
Cohesion: 0.67
Nodes (3): description, type, project

### Community 47 - "actor.schema.json — publication"
Cohesion: 0.67
Nodes (3): publication, description, type

### Community 48 - "actor.schema.json — role"
Cohesion: 0.67
Nodes (3): role, description, type

### Community 49 - "actor.schema.json — school"
Cohesion: 0.67
Nodes (3): school, description, type

### Community 50 - "actor.schema.json — title"
Cohesion: 0.67
Nodes (3): title, description, type

### Community 51 - "actor.schema.json — value"
Cohesion: 0.67
Nodes (3): value, description, type

## Knowledge Gaps
- **384 isolated node(s):** `DensityKey`, `FontPairing`, `RadiusKey`, `ThemeColorTokens`, `TypePairKey` (+379 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 401 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `required` connect `Actor Schema — Nested Item Fields` to `actor.schema.json — awards`, `actor.schema.json — gallery`, `Site Schema`, `actor.schema.json — press`, `actor.schema.json — training`, `Actor Schema — Top-Level Fields`, `Actor Schema — Array Fields`, `Build Config File List`, `Actor Schema — Credits Array`, `Actor Schema — Stats Array`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `properties` connect `Actor Schema — Small String Fields` to `Actor Schema (Core Shape)`, `Actor Schema — Array Fields`, `Actor Schema — Image Def`, `Credit Medium Enum`, `Actor Schema — Credits Array`, `Actor Schema — Stats Array`, `Actor Schema — Year Field`, `actor.schema.json — awards`, `actor.schema.json — format`, `actor.schema.json — gallery`, `actor.schema.json — exclusiveMinimum`, `actor.schema.json — press`, `actor.schema.json — training`, `actor.schema.json — url`, `actor.schema.json — category`, `actor.schema.json — company`, `actor.schema.json — director`, `actor.schema.json — label`, `actor.schema.json — program`, `actor.schema.json — project`, `actor.schema.json — publication`, `actor.schema.json — role`, `actor.schema.json — school`, `actor.schema.json — title`, `actor.schema.json — value`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `properties` connect `Actor Schema (Core Shape)` to `actor.schema.json — awards`, `actor.schema.json — press`, `actor.schema.json — training`, `Actor Schema — Top-Level Fields`, `Actor Schema — Headshot Image`, `Actor Schema — Showreel`, `Actor Schema — Array Fields`, `Actor Schema — Credits Array`, `Actor Schema — Stats Array`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `DensityKey`, `FontPairing`, `RadiusKey` to the rest of the system?**
  _384 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Actor Page (Route + Sections + Data Loader)` be split into smaller, more focused modules?**
  _Cohesion score 0.06696428571428571 - nodes in this community are weakly interconnected._
- **Should `Priya Menon Content Fixture` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `Site Schema` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._