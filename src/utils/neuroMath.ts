export type Language = "ka" | "en";

export type CognitiveStateId = "focus" | "drift" | "fatigue";

export interface WaveBand {
  id: "beta" | "alpha" | "theta";
  hz: string;
  amplitude: number;
  frequency: number;
  color: string;
}

export interface CognitiveStateProfile {
  id: CognitiveStateId;
  attentionScore: number;
  comprehensionRate: number;
  bands: WaveBand[];
  highlightedSentenceIndex: number;
}

export const COGNITIVE_PROFILES: Record<CognitiveStateId, CognitiveStateProfile> = {
  focus: {
    id: "focus",
    attentionScore: 91,
    comprehensionRate: 94,
    highlightedSentenceIndex: -1,
    bands: [
      { id: "beta", hz: "18.4 Hz", amplitude: 22, frequency: 4.2, color: "#1E40AF" },
      { id: "alpha", hz: "10.2 Hz", amplitude: 14, frequency: 2.4, color: "#0891B2" },
      { id: "theta", hz: "5.1 Hz", amplitude: 6, frequency: 1.3, color: "#64748B" },
    ],
  },
  drift: {
    id: "drift",
    attentionScore: 42,
    comprehensionRate: 38,
    highlightedSentenceIndex: 1,
    bands: [
      { id: "beta", hz: "13.1 Hz", amplitude: 8, frequency: 3.1, color: "#1E40AF" },
      { id: "alpha", hz: "9.4 Hz", amplitude: 24, frequency: 2.1, color: "#0891B2" },
      { id: "theta", hz: "6.4 Hz", amplitude: 18, frequency: 1.5, color: "#D97706" },
    ],
  },
  fatigue: {
    id: "fatigue",
    attentionScore: 28,
    comprehensionRate: 24,
    highlightedSentenceIndex: 2,
    bands: [
      { id: "beta", hz: "12.2 Hz", amplitude: 5, frequency: 2.8, color: "#1E40AF" },
      { id: "alpha", hz: "8.1 Hz", amplitude: 16, frequency: 1.8, color: "#0891B2" },
      { id: "theta", hz: "4.6 Hz", amplitude: 26, frequency: 1.1, color: "#DC2626" },
    ],
  },
};

export interface HourlyFocusPoint {
  hour: number;
  label: string;
  focusScore: number;
  status: "peak" | "steady" | "dip";
}

export const DAILY_FOCUS_CURVE: HourlyFocusPoint[] = [
  { hour: 8, label: "08:00", focusScore: 68, status: "steady" },
  { hour: 9, label: "09:00", focusScore: 84, status: "peak" },
  { hour: 10, label: "10:00", focusScore: 93, status: "peak" },
  { hour: 11, label: "11:00", focusScore: 90, status: "peak" },
  { hour: 12, label: "12:00", focusScore: 76, status: "steady" },
  { hour: 13, label: "13:00", focusScore: 54, status: "dip" },
  { hour: 14, label: "14:00", focusScore: 49, status: "dip" },
  { hour: 15, label: "15:00", focusScore: 66, status: "steady" },
  { hour: 16, label: "16:00", focusScore: 83, status: "peak" },
  { hour: 17, label: "17:00", focusScore: 87, status: "peak" },
  { hour: 18, label: "18:00", focusScore: 74, status: "steady" },
  { hour: 19, label: "19:00", focusScore: 58, status: "dip" },
  { hour: 20, label: "20:00", focusScore: 41, status: "dip" },
];

export function generateWaveformPath(
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  phaseOffset = 0,
  samples = 72
): string {
  if (width <= 0 || height <= 0 || samples < 2) {
    return "";
  }
  const midY = height / 2;
  const clampedAmp = Math.min(Math.max(amplitude, 1), midY - 2);
  const points: string[] = [];

  for (let i = 0; i <= samples; i++) {
    const progress = i / samples;
    const x = Number((progress * width).toFixed(2));
    const envelope = Math.sin(progress * Math.PI);
    const wave =
      Math.sin(progress * Math.PI * 2 * frequency + phaseOffset) * 0.72 +
      Math.sin(progress * Math.PI * 2 * (frequency * 1.65) + phaseOffset * 1.3) * 0.28;
    const y = Number((midY - wave * clampedAmp * (0.45 + 0.55 * envelope)).toFixed(2));
    points.push(`${i === 0 ? "M" : "L"}${x},${y}`);
  }

  return points.join(" ");
}

export function findPeakWindow(points: HourlyFocusPoint[]): {
  peakHour: HourlyFocusPoint;
  dipHour: HourlyFocusPoint;
  averageScore: number;
} {
  if (points.length === 0) {
    return {
      peakHour: { hour: 10, label: "10:00", focusScore: 0, status: "steady" },
      dipHour: { hour: 14, label: "14:00", focusScore: 0, status: "dip" },
      averageScore: 0,
    };
  }

  let peakHour = points[0];
  let dipHour = points[0];
  let sum = 0;

  for (const point of points) {
    sum += point.focusScore;
    if (point.focusScore > peakHour.focusScore) {
      peakHour = point;
    }
    if (point.focusScore < dipHour.focusScore) {
      dipHour = point;
    }
  }

  return {
    peakHour,
    dipHour,
    averageScore: Math.round(sum / points.length),
  };
}

export function generateFocusCurvePoints(
  points: HourlyFocusPoint[],
  width: number,
  height: number,
  paddingX = 16,
  paddingY = 16
): Array<{ x: number; y: number; point: HourlyFocusPoint }> {
  if (points.length === 0) return [];
  const innerWidth = Math.max(width - paddingX * 2, 1);
  const innerHeight = Math.max(height - paddingY * 2, 1);

  return points.map((point, index) => {
    const ratioX = points.length === 1 ? 0.5 : index / (points.length - 1);
    const x = Number((paddingX + ratioX * innerWidth).toFixed(2));
    const normalizedScore = Math.min(Math.max(point.focusScore, 0), 100) / 100;
    const y = Number((paddingY + (1 - normalizedScore) * innerHeight).toFixed(2));
    return { x, y, point };
  });
}

export interface PilotFormValues {
  name: string;
  role: "parent" | "teacher" | "student" | "partner";
  school: string;
  email: string;
  notes: string;
}

export interface PilotFormErrors {
  name?: string;
  school?: string;
  email?: string;
}

export function validatePilotForm(values: PilotFormValues, lang: Language): PilotFormErrors {
  const errors: PilotFormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (values.name.trim().length < 2) {
    errors.name =
      lang === "ka"
        ? "გთხოვთ მიუთითოთ სახელი და გვარი (მინ. 2 სიმბოლო)."
        : "Please enter your full name (at least 2 characters).";
  }

  if (values.school.trim().length < 2) {
    errors.school =
      lang === "ka"
        ? "მიუთითეთ სკოლა, მუნიციპალიტეტი ან ორგანიზაცია."
        : "Please enter your school, municipality, or organization.";
  }

  if (!emailRegex.test(values.email.trim())) {
    errors.email =
      lang === "ka"
        ? "გთხოვთ შეიყვანოთ ვალიდური ელ-ფოსტის მისამართი."
        : "Please enter a valid email address.";
  }

  return errors;
}

export function validateExplainInput(passage: string, lang: Language): string | null {
  const trimmed = passage.trim();
  if (trimmed.length < 15) {
    return lang === "ka"
      ? "გთხოვთ ჩაწეროთ ან აირჩიოთ მინიმუმ 15 სიმბოლოიანი სასწავლო მონაკვეთი."
      : "Please enter or choose at least 15 characters of study text.";
  }
  if (trimmed.length > 1500) {
    return lang === "ka"
      ? "ტექსტი არ უნდა აღემატებოდეს 1500 სიმბოლოს."
      : "Study passage must not exceed 1,500 characters.";
  }
  return null;
}
