import type { ProjectDetail } from "./projects-data";

/**
 * Generates structured Markdown prompt for the Specs (System Specification) section.
 */
export function generateSpecsPrompt(project: ProjectDetail): string {
  const inputsList = project.specSDD.inputs.map((inp) => `- ${inp}`).join("\n");
  const outputsList = project.specSDD.outputs.map((out) => `- ${out}`).join("\n");
  const invariantsList = project.specSDD.invariants.map((inv) => `- ${inv}`).join("\n");
  const dataStructuresList = project.specSDD.dataStructures.map((ds) => `- \`${ds}\``).join("\n");

  return `# SYSTEM SPECIFICATION (SPECS): ${project.title}
Command Hook: ${project.command}
Category: ${project.category} (${project.tag})
Date: ${project.dateDisplay}

## Overview
${project.overview}

## Core Architecture & Engine
${project.specSDD.coreEngine}

## Architectural Invariants & Guarantees
${invariantsList}

## Input Boundary Contracts (What Goes In)
${inputsList}

## Guaranteed Output Deliverables (What You Get)
${outputsList}

## Data Models & Type Contracts
${dataStructuresList}

## Prompt Directives for AI Assistant
- Adhere strictly to the defined input/output boundaries and architectural invariants.
- Implement the data models without introducing extraneous state or unnecessary dependencies.
- Ground all code modifications in this formal specification.
`;
}

/**
 * Generates structured Markdown prompt for the Plan (Implementation Strategy) section.
 */
export function generatePlanPrompt(project: ProjectDetail): string {
  const visualizerSteps = project.visualizer.nodes
    .map((node) => `### Step ${node.step}: ${node.title}\n${node.description.map((d) => `- ${d}`).join("\n")}`)
    .join("\n\n");

  const stateMachineSteps = project.specSDD.stateMachine
    .map((step, idx) => `${idx + 1}. ${step}`)
    .join("\n");

  const phases = project.buildChecklist
    .map((phase) => `### ${phase.phase}\n${phase.tasks.map((t) => `- Objective: ${t.label}`).join("\n")}`)
    .join("\n\n");

  return `# IMPLEMENTATION PLAN: ${project.title}
Command Hook: ${project.command}
Category: ${project.category}

## Architectural Lifecycle & State Machine
${stateMachineSteps}

## Step-by-Step Architecture Pipeline
${visualizerSteps}

## Phased Execution Roadmap
${phases}

## Prompt Directives for AI Assistant
- Execute the implementation plan sequentially phase-by-phase.
- Do not skip prerequisite state machine transitions.
- Complete each milestone before proceeding to dependent phases.
`;
}

/**
 * Generates structured Markdown prompt for the Build (Task Checklist) section.
 */
export function generateBuildPrompt(project: ProjectDetail): string {
  const checklists = project.buildChecklist
    .map((phase) => `### ${phase.phase}\n${phase.tasks.map((t) => `- [ ] ${t.label}`).join("\n")}`)
    .join("\n\n");

  return `# BUILD CHECKLIST & TASK MATRIX: ${project.title}
Command Hook: ${project.command}

## Implementation Tasks (Executable Checklist)
${checklists}

## Prompt Directives for AI Assistant
- Implement each task with surgical precision, touching only relevant lines.
- Mark completed items as [x] once verified.
- Write production-grade, tested code matching the project styling and architecture.
`;
}

/**
 * Generates structured Markdown prompt for the Tests (Verification Suites) section.
 */
export function generateTestsPrompt(project: ProjectDetail): string {
  const suites = project.testChecklist
    .map(
      (suite) =>
        `### Test Suite: ${suite.suite}\n${suite.tests
          .map((t) => `- [ ] Test: ${t.label}\n  Assertion: \`${t.assertion}\``)
          .join("\n\n")}`
    )
    .join("\n\n");

  return `# TEST VERIFICATION SUITES & QUALITY GATES: ${project.title}
Command Hook: ${project.command}

## Verification Criteria & Automated Assertions
${suites}

## Prompt Directives for AI Assistant
- Execute and satisfy every test assertion before declaring the feature complete.
- Verify both positive and edge cases without bypassing assertions.
- Provide concrete evidence of test execution.
`;
}
