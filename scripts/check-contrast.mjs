import fs from "node:fs/promises";
const css = await fs.readFile("app/globals.css", "utf8");
const tokens = new Map(
  [...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6}|var\(--[\w-]+\));/gi)].map(
    (m) => [m[1], m[2]],
  ),
);
function color(name) {
  const value = tokens.get(name);
  if (!value) throw new Error(`Missing color token: ${name}`);
  if (value.startsWith("var(")) return color(value.slice(6, -1));
  return value.toUpperCase();
}
function luminance(hex) {
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((c) => parseInt(c, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function contrast(a, b) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
const roles = [
  ["Жовта кнопка й картка галузі", "forest", "sunflower", 4.5],
  ["Жовта кнопка при наведенні", "forest", "sunflower-hover", 4.5],
  ["Жовтий підпис на лісовій картці", "sunflower", "forest", 4.5],
  ["Світлий підпис на трав’яній картці", "cream", "grassland", 4.5],
  ["Основний текст", "bark", "paper", 4.5],
  ["Текст на кремовому", "bark", "cream", 4.5],
  ["Другорядний текст", "muted", "paper", 4.5],
  ["Другорядний текст на тонованому", "muted", "surface", 4.5],
  ["Трав’яна зелена секція", "cream", "algae", 4.5],
  ["Лісова зелена секція", "cream", "bark", 4.5],
  ["Панель виробничого етапу", "cream", "algae-deep", 4.5],
  ["Земляна кнопка", "action-ink", "bronze", 4.5],
  ["Земляна кнопка при наведенні", "action-ink", "action-hover", 4.5],
  ["Лаймова кнопка й виділений текст", "bark", "gold", 4.5],
  ["Вибрана вкладка процесу", "bark", "gold", 4.5],
  ["Вибраний фільтр", "cream", "algae", 4.5],
  ["Буквиця", "algae", "cream", 4.5],
  ["Поле форми", "bark", "input-surface", 4.5],
  ["Межа поля", "control-border", "input-surface", 3],
  ["Помилка форми", "error-ink", "error-surface", 4.5],
  ["Повідомлення про помилку", "error-ink", "paper", 4.5],
  ["Стан результату форми", "bark", "surface-soft", 4.5],
  ["Темний фокус на світлому", "bark", "cream", 3],
  ["Світле кільце фокусу на темному", "cream", "bark", 3],
  ["Посилання на світлому", "bark", "paper", 4.5],
  ["Посилання на темному", "cream", "bark", 4.5],
  ["Посилання при наведенні на темному", "gold", "bark", 4.5],
  ["Індикатор читання", "bronze", "paper", 3],
];
const checks = roles.map(([role, fg, bg, minimum]) => {
  const foreground = color(fg),
    background = color(bg),
    ratio = contrast(foreground, background);
  return {
    role,
    foreground,
    background,
    ratio: Number(ratio.toFixed(3)),
    minimum,
    pass: ratio >= minimum,
  };
});
const glassRgb = css
  .match(/--hero-glass-rgb:\s*([\d ]+);/)[1]
  .trim()
  .split(/\s+/)
  .map(Number);
const glassAlpha = Number(
  css.match(/--hero-glass-opacity-mobile:\s*([\d.]+);/)[1],
);
const glassBackground =
  "#" +
  glassRgb
    .map((c) =>
      Math.round(c * glassAlpha + 255 * (1 - glassAlpha))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")
    .toUpperCase();
for (const [role, fg, minimum] of [
  ["Hero: лаймовий великий заголовок", "gold", 3],
  ["Hero: світлий основний текст", "cream", 4.5],
]) {
  const ratio = contrast(color(fg), glassBackground);
  checks.push({
    role,
    foreground: color(fg),
    background: glassBackground,
    ratio: Number(ratio.toFixed(3)),
    minimum,
    pass: ratio >= minimum,
  });
}
const report = {
  checkedAt: new Date().toISOString(),
  palette: Object.fromEntries(
    ["forest", "grassland", "lime", "soil", "sunflower"].map((t) => [
      t,
      color(t),
    ]),
  ),
  method:
    "WCAG relative sRGB luminance; normal text 4.5:1, large text and control boundaries 3:1. Hero contrast uses the most transparent mobile glass panel composited over white, conservatively bounding the photo background; photos outside the panel have no overlay.",
  checks,
  passed: checks.every((x) => x.pass),
};
await fs.mkdir("validation", { recursive: true });
await fs.writeFile(
  "validation/color-contrast.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
