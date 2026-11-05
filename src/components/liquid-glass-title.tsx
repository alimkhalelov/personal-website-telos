"use client";

import React from "react";

interface LiquidGlassTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  style?: React.CSSProperties;
}

/**
 * Аутентичная Apple Liquid Glass 3D-типографика (iOS 18 / VisionOS):
 * 1. Проекционная тень преломления (ambient glass cast shadow).
 * 2. Оптический фацет (2px каустический ободок по контуру букв, собирающий свет).
 * 3. Диагональный спектральный блик (135°) с прозрачной серединой (12%), пропускающей фон.
 */
export function LiquidGlassTitle({
  children,
  className = "",
  as: Component = "h1",
  style = {},
}: LiquidGlassTitleProps) {
  return (
    <Component className={`apple-glass-title ${className}`} style={style}>
      {/* Слой 1: Проекционная тень преломления стекла на фон */}
      <span aria-hidden="true" className="apple-glass-shadow">
        {children}
      </span>

      {/* Слой 2: Оптический фацет и каустический ободок */}
      <span aria-hidden="true" className="apple-glass-rim">
        {children}
      </span>

      {/* Слой 3: Лицевое тело жидкого стекла */}
      <span className="apple-glass-core block">
        {children}
      </span>
    </Component>
  );
}
