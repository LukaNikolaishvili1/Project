import test from "node:test";
import assert from "node:assert/strict";
import {
  COGNITIVE_PROFILES,
  DAILY_FOCUS_CURVE,
  findPeakWindow,
  generateFocusCurvePoints,
  generateWaveformPath,
  validateExplainInput,
  validatePilotForm,
} from "./neuroMath";

test("generateWaveformPath returns valid SVG path starting with M and containing L segments", () => {
  const path = generateWaveformPath(300, 80, 20, 3, 0, 24);
  assert.ok(path.startsWith("M0,"));
  assert.ok(path.includes(" L"));
  const segments = path.split(" ");
  assert.equal(segments.length, 25);
});

test("generateWaveformPath returns empty string for invalid dimensions", () => {
  assert.equal(generateWaveformPath(0, 80, 20, 3), "");
  assert.equal(generateWaveformPath(300, 0, 20, 3), "");
});

test("findPeakWindow accurately identifies peak 10:00 and dip 20:00 in daily curve", () => {
  const summary = findPeakWindow(DAILY_FOCUS_CURVE);
  assert.equal(summary.peakHour.label, "10:00");
  assert.equal(summary.peakHour.focusScore, 93);
  assert.equal(summary.dipHour.label, "20:00");
  assert.equal(summary.dipHour.focusScore, 41);
  assert.ok(summary.averageScore > 60 && summary.averageScore < 80);
});

test("generateFocusCurvePoints maps focusScore=100 near top padding and 0 near bottom", () => {
  const coords = generateFocusCurvePoints(
    [
      { hour: 10, label: "10:00", focusScore: 100, status: "peak" },
      { hour: 20, label: "20:00", focusScore: 0, status: "dip" },
    ],
    200,
    100,
    10,
    10
  );
  assert.equal(coords.length, 2);
  assert.equal(coords[0].x, 10);
  assert.equal(coords[0].y, 10);
  assert.equal(coords[1].x, 190);
  assert.equal(coords[1].y, 90);
});

test("COGNITIVE_PROFILES shows highest attention in focus state and lowest in fatigue", () => {
  assert.ok(
    COGNITIVE_PROFILES.focus.attentionScore > COGNITIVE_PROFILES.drift.attentionScore
  );
  assert.ok(
    COGNITIVE_PROFILES.drift.attentionScore > COGNITIVE_PROFILES.fatigue.attentionScore
  );
});

test("validatePilotForm catches invalid fields and passes valid submission", () => {
  const invalidErrors = validatePilotForm(
    { name: "A", role: "teacher", school: "", email: "not-an-email", notes: "" },
    "en"
  );
  assert.ok(invalidErrors.name);
  assert.ok(invalidErrors.school);
  assert.ok(invalidErrors.email);

  const validErrors = validatePilotForm(
    {
      name: "Nino Beridze",
      role: "teacher",
      school: "Tbilisi Public School #55",
      email: "nino@school.ge",
      notes: "Interested in 8th grade pilot",
    },
    "ka"
  );
  assert.deepEqual(validErrors, {});
});

test("validateExplainInput enforces minimum and maximum passage length", () => {
  assert.ok(validateExplainInput("მოკლე", "ka") !== null);
  assert.equal(
    validateExplainInput("დავით აღმაშენებელმა შექმნა მუდმივი ლაშქარი და გააძლიერა ქვეყანა.", "ka"),
    null
  );
  assert.ok(validateExplainInput("a".repeat(1501), "en") !== null);
});
