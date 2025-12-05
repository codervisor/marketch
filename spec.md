# Project: Marketch (MVP)
## Role
You are a Senior Frontend Engineer and System Architect. Your goal is to build the MVP for "Marketch" — a tool that renders Markdown-like text into UI wireframes instantly (conceptually similar to Mermaid.js but for UI prototyping).

## 1. Product Core Concept
* **Input:** A DSL (Domain Specific Language) based on Markdown structure.
* **Output:** A visual UI Wireframe (rendered as React components).
* **Key Feature:** Split-screen interface. Left side is the code editor, right side is the live preview.
* **Design Philosophy:** Low-fidelity, "Sketchy" look (wireframe style), optimized for structure and layout over visual details.

## 2. Technical Stack
* **Framework:** React + Vite (TypeScript).
* **Styling:** Tailwind CSS (for layout) + Custom CSS (for the "wireframe" look).
* **Icons:** `lucide-react`.
* **State Management:** React Context or Zustand (keep it simple).
* **Parser Logic:** Custom recursive parser (no heavy AST libraries for MVP, logic detailed below).
* **Editor:** `react-simple-code-editor` or a simple `<textarea>` for MVP (upgrade later).

## 3. The "Marketch" Syntax Specification (v0.1)
The parser must interpret the following syntax rules. Indentation (2 spaces or 4 spaces) determines nesting.

* **Containers (`>`):** Define layout boxes.
    * `> Row` (Flex row)
    * `> Col` (Flex column - Default)
    * `> Card` (Box with border/shadow)
* **Components (`*`):** Define UI elements.
    * `* [Button] Label`
    * `* [Input] Placeholder`
    * `* [Text] Content` (Supports `h1`, `h2` via props)
    * `* [Image] AltText`
    * `* [Icon] IconName`
* **Attributes (`()`):** Optional props at the end of the line.
    * Example: `(color: red, align: center, style: primary)`
* **Structure Example:**
    ```text
    # Page Title
    > Card (padding: large)
      > Row (justify: between)
        * [Text] "Dashboard" (size: lg)
        * [Button] "Logout"
      * [Input] "Search..."
    ```

## 4. Architecture & Data Flow
1.  **Raw Text Input** -> **Lexer/Tokenizer** (Split lines, identify indent, type, content, props).
2.  **Parser** -> **Tree Construction** (Convert linear tokens into a nested JSON Tree/AST).
3.  **Renderer** -> **Recursive React Component** (Traverse the JSON Tree and render corresponding components).

## 5. Visual Style Guide (The "Wireframe" Look)
* Use a monospace or handwriting-style font if available (e.g., standard sans-serif is fine for MVP, but style it simply).
* **Borders:** 2px solid black (`border-2 border-black`).
* **Shadows:** Hard shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`) to mimic a brutalist/sketchy vibe.
* **Colors:** Monochrome (White, Black, Gray) mainly.

## 6. Implementation Plan (Step-by-Step)
Please execute the following steps. **Do not do everything at once. Start with Step 1.**

**Step 1: Project Setup**
* Initialize Vite + React + TS + Tailwind.
* Create a basic Layout: Left Sidebar (Editor), Right Sidebar (Preview).

**Step 2: Core Parser Implementation**
* Create `parser.ts`.
* Implement a function `parseMarketch(text: string): Node[]`.
* It should handle indentation logic to create a nested JSON object (AST).
* Write a test case with the "Structure Example" above to prove the JSON tree is correct.

**Step 3: Component Registry & Renderer**
* Create basic components: `MarketchButton`, `MarketchInput`, `MarketchContainer`, etc.
* Apply the "Wireframe" styling (borders, hard shadows) to these components.
* Create `Renderer.tsx` that takes the AST and recursively renders these components.

**Step 4: Integration**
* Connect the Editor `onChange` to the Parser -> Renderer pipeline.
* Ensure the preview updates in real-time.

---
**Action:**
Please start by executing **Step 1 and Step 2**. Set up the project and write the `parser.ts` logic. Show me the parser code and the expected JSON output before moving to UI rendering.
