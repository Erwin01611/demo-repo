# Portfolio 3D - Project Brief

## Project Overview
Building an immersive 3D portfolio website inspired by lusion.co, featuring scroll-based WebGL animations to showcase Farrukh Mirzaev's work in data science, automation, and process optimization.

## About Farrukh Mirzaev

### Professional Identity
**Automation-First Data Scientist** who builds intelligent systems that eliminate repetitive work, freeing humans to focus on creative and strategic tasks.

### Background
- **Current Role**: Payroll Operations Automation Specialist at Navan Berlin (Part-time)
- **Education**: 
  - M.Sc. Data Science & Decision Support (In Progress) - Europa-Universität Viadrina
  - B.Sc. International Business Administration (Completed Jan 2025) - Europa-Universität Viadrina
- **Location**: Frankfurt (Oder), Germany (commutes to Berlin)
- **Languages**: Uzbek (Native), Russian (Bilingual), English (C1+), German (B2), Spanish (A1)

### Key Achievements
- Eliminated 14+ hours of monthly manual work through automation
- Reduced processing errors by 90%+
- Led critical Workday migration with zero critical issues at go-live
- Built production data pipelines for multi-language document processing

### Core Philosophy
"As AI gets better, I help organizations redesign work—automating the tedious, amplifying the creative. I'm building the future where AI handles the boring stuff, so people can do the interesting stuff."

## Positioning Strategy

### Target Audience
Finance, FinOps, and Accounting managers who need:
- Compliance & audit risk mitigation
- Scaling without headcount increases
- Liberation from Excel/PDF manual processing hell
- System integration across platforms
- Knowledge documentation and risk reduction
- Cost efficiency and measurable ROI

### Value Proposition
"I build automation systems that help finance teams scale without adding headcount—while reducing compliance risk."

### What Farrukh Brings
- **Analytical Rigor**: Strong quantitative background with proven statistical methods and ML application
- **Technical Versatility**: Full data science stack (Python, R, SQL) with production system development
- **Business Impact**: Track record of eliminating manual work (14+ hours monthly) and improving accuracy (90%+ error reduction)
- **Domain Flexibility**: Experience across finance, operations, and analytics
- **Problem-Solving Mindset**: Identifies bottlenecks, designs solutions, measures impact

## Website Vision

### Core Message (Hero Section)
"What if your month-end close took 2 days instead of 5?

What if reconciliation happened automatically with zero errors?

That's what I build."

### Visual Aesthetic
- **Color Palette**: 
  - Primary: Deep blue/purple (trust, tech, intelligence)
  - Accent: Bright cyan/electric blue (energy, innovation)
  - Background: Dark (#0a0a0a or #050505)
  - Text: White/off-white
  - Highlight: Gradient blue → cyan
- **Typography**: Modern geometric sans-serif (Inter, Space Grotesk, Sora)
- **3D Style**: Smooth, polished materials with subtle emissive glow, glass morphism for UI cards

### Website Structure (8 Sections)

#### Section 1: Hero / Impact Statement (0-100vh)
- **3D Element**: Floating data particles/nodes organizing into connected network
- **Message**: The aspirational questions
- **Animation**: Particles start scattered → organize into system
- **Text**: Name and title fade in

#### Section 2: The Problem (100-200vh)
- **3D Element**: Rotating cube filled with chaotic documents, spreadsheets, PDFs
- **Message**: Paint the pain points:
  - 14 hours lost to manual data entry
  - Errors in compliance reports
  - Month-end that never ends
  - Knowledge trapped in one person's head
- **Animation**: Documents swirl chaotically, cube fragments/breaks

#### Section 3: The Transformation (200-300vh)
- **3D Element**: Broken cube transforms into sleek organized pipeline
- **Message**: What changes with automation:
  - 14 hours → Seconds
  - 90%+ fewer errors
  - Infinite scalability
  - Zero knowledge risk
- **Animation**: Chaos → Order transformation, pipeline glows/pulses

#### Section 4A: Workday Migration Case Study (300-400vh)
- **3D Element**: Two systems (DATEV & Workday) connecting with data flow
- **Content**:
  - **Challenge**: "Critical migration. Zero margin for error."
  - **Solution**: "End-to-end testing protocols. Comprehensive validation."
  - **Impact**: "Zero critical issues at go-live. Failed uploads: 2-3 → 0-1"
- **Animation**: Data flows smoothly between systems

#### Section 4B: PDF Automation Case Study (400-500vh)
- **3D Element**: Stack of PDFs exploding into structured data tables
- **Content**:
  - **Challenge**: "14 hours monthly bottleneck in manifest preparation"
  - **Solution**: "Python automation reading filenames + PDF content"
  - **Impact**: "14 hours → seconds. Every. Single. Month."
- **Animation**: PDFs scatter and reorganize into data grids

#### Section 4C: Reconciliation System Case Study (500-600vh)
- **3D Element**: Magnifying glass scanning documents, extracting highlighted data
- **Content**:
  - **Challenge**: "No Excel exports. 400-page PDFs. Manual audit nightmare."
  - **Solution**: "Regex-based extraction across EN/DE formats"
  - **Impact**: "6 hours monthly saved. Audit-ready data in seconds."
- **Animation**: Magnifying glass sweeps, data points light up and extract

#### Section 5: How I Work / Philosophy (600-700vh)
- **3D Element**: Interconnected gears/mechanisms showing process
- **Message**: My 5-step approach:
  1. **Identify** the bottleneck (where humans waste time)
  2. **Validate** the impact (is it worth solving?)
  3. **Build** the solution (pragmatic, not perfect)
  4. **Test** rigorously (finance can't afford errors)
  5. **Document** everything (no knowledge silos)
- **Animation**: Each gear lights up and rotates for each principle

#### Section 6: Technical Stack (700-800vh)
- **3D Element**: Tech stack as floating 3D cards/badges orbiting center
- **Content**:
  - **Inner orbit**: Python, R, SQL
  - **Middle orbit**: pandas, scikit-learn, Three.js, GSAP
  - **Outer orbit**: Power BI, Workday, DATEV, Excel
- **Animation**: Stack rotates on scroll, hover shows descriptions

#### Section 7: The Bigger Picture (800-900vh)
- **3D Element**: Human + AI figure working together harmoniously
- **Message**:
  "AI is getting better every day.
  
  My mission: Free humans from tedious work.
  
  Let AI handle the boring stuff.
  Let people do the interesting stuff.
  
  That's the future I'm building."
- **Animation**: Figures start separate → collaborate, light connects them

#### Section 8: Contact / CTA (900-1000vh)
- **3D Element**: Simple elegant geometric shape (sphere or minimal logo)
- **Message**: "Let's eliminate your bottlenecks."
- **CTA Buttons**: Email, LinkedIn, GitHub, Download CV
- **Animation**: Geometric shape gently rotates, contact elements fade in

## Technical Requirements

### Core Technology Stack
- **React + Vite**: Modern build tooling
- **Three.js + React Three Fiber (R3F)**: WebGL 3D rendering
- **@react-three/drei**: Helpful R3F abstractions
- **GSAP + ScrollTrigger**: DOM animation synchronized with scroll
- **Lenis**: Smooth scrolling (optional)

### Key Features
- Scroll progress tracking (0-1 normalized)
- Full-screen WebGL canvas with scroll sync (no drift)
- Lerp-based smooth animations
- Custom cursor
- Parallax effects
- Mobile optimization
- Performance monitoring

### Hosting
- GitHub Pages (current) or Vercel/Netlify (recommended)
- Static site hosting (no server needed)
- GPU rendering happens client-side

## Success Metrics

### User Experience
- Smooth 60fps performance on desktop
- 30fps minimum on mobile
- Load time < 3 seconds
- Clear storytelling through scroll

### Business Goals
- Effectively communicate value proposition
- Showcase technical capability through execution
- Differentiate from "typical" portfolio sites
- Generate interest from finance/operations hiring managers

## Claude's Role

**Acting as Product Manager / Orchestrator:**
- Provide high-level direction and strategy
- Break down complex features into phases
- Review progress and suggest next steps
- Help with positioning and messaging
- Debug conceptual issues
- Maintain project context across sessions

**NOT responsible for:**
- Writing actual code (that's Claude Code's job)
- Direct file manipulation
- Detailed implementation

## Project Status
See `PROGRESS.md` for current status and next steps.

## Implementation Plan
See `ROADMAP.md` for complete phase-by-phase plan.

## Working with the Team
See `WORKFLOW.md` for instructions on using Claude Project + Claude Code together.
