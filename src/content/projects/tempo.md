---
title: "Tempo — Interval Visualizer & Telemetry HUD"
category: "Kinematics & Telemetry"
section: "projects"
tags: ["Interval Running", "Kinematics", "Zero Dependencies", "HUD", "HIIT"]
summary: "Zero-dependency progressive interval visualizer and telemetry HUD engineered for endurance athletes with Push & Pull stages and 60 FPS procedural IK runner."
visibility: "public"
date: "2026-11-05"
---

# Tempo — Precision Progressive Interval & Pacing Visualizer

**Tempo** is a zero-dependency, browser-native progressive interval visualizer and telemetry HUD engineered for endurance athletes, interval runners, and high-intensity interval training (HIIT).

[![Live Demo](https://img.shields.io/badge/Live%20Demo-alimkhalelov.github.io%2Ftempo-38bdf8?style=flat-square)](https://alimkhalelov.github.io/tempo/)

## Core Architectural Pillars

### 1. Dynamic Harmonic Push & Pull Progression
Decomposes any workout duration into balanced symmetric divisor stages ($9 \to 6 \to 5 \to 3 \to 2 \to 3 \to 5 \to 6 \to 9$) with an invariant halfway equator milestone ($k=2$).

### 2. Dual-Axis Cinematic Camera Engine
Viewport smoothly zooms up to $4.8\times$ on the active segment to eliminate perceived psychological fatigue, combined with sinusoidal sweeping transitions during stage shifts.

### 3. Procedural Inverse Kinematics (IK) Runner
Hardware-accelerated 60 FPS skeletal runner SVG featuring:
- Dual-bounce Center-of-Gravity (CoG) displacement
- Trigonometric hip-knee linkages with non-linear knee flexion
- Anti-phase upper body counter-balance arms

### 4. Zero-Dependency Single Bundle
Engineered as a single, ultra-light 52 KB asset running natively on desktop browsers, mobile screens, or treadmill-mounted displays.
