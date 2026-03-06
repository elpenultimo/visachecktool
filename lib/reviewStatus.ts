import { Requirement } from "@/data/requirements";

type ExtendedRequirement = Requirement & {
  lastReviewedAt?: string;
  ultimaRevision?: string;
};

export type ReviewStatusKey = "green" | "yellow" | "red";

export type ReviewStatusInfo = {
  key: ReviewStatusKey;
  label: string;
  helperText: string;
  emoji: string;
};

export type ReviewMetadata = {
  status: ReviewStatusInfo;
  lastReviewedText: string;
  lastReviewedDate: Date | null;
  ageInMs: number;
  monthsSinceReview: number | null;
};

const MS_IN_MONTH = 1000 * 60 * 60 * 24 * 30;

const statusConfig: Record<ReviewStatusKey, ReviewStatusInfo> = {
  green: {
    key: "green",
    label: "Updated",
    helperText: "Last review less than 6 months ago",
    emoji: "🟢",
  },
  yellow: {
    key: "yellow",
    label: "Needs review",
    helperText: "Last review between 6 and 12 months ago",
    emoji: "🟡",
  },
  red: {
    key: "red",
    label: "Outdated",
    helperText: "Last review over 12 months ago",
    emoji: "🔴",
  },
};

const getLastReviewedValue = (requirement: ExtendedRequirement) => {
  const raw =
    requirement.lastReviewed?.trim() ||
    requirement.lastReviewedAt?.trim() ||
    requirement.ultimaRevision?.trim() ||
    "";

  return raw.length > 0 ? raw : null;
};

const safeDateFromString = (value: string | null) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
};

export const getReviewMetadata = (requirement: ExtendedRequirement): ReviewMetadata => {
  const lastReviewedValue = getLastReviewedValue(requirement);
  const lastReviewedDate = safeDateFromString(lastReviewedValue);
  const now = new Date();

  const ageInMs = lastReviewedDate ? now.getTime() - lastReviewedDate.getTime() : Number.POSITIVE_INFINITY;
  const monthsSinceReview = Number.isFinite(ageInMs) ? ageInMs / MS_IN_MONTH : null;

  let statusKey: ReviewStatusKey = "red";

  if (monthsSinceReview !== null && monthsSinceReview < 6) {
    statusKey = "green";
  } else if (monthsSinceReview !== null && monthsSinceReview < 12) {
    statusKey = "yellow";
  }

  return {
    status: statusConfig[statusKey],
    lastReviewedText: lastReviewedValue ?? "No date",
    lastReviewedDate,
    ageInMs,
    monthsSinceReview,
  };
};

export const REVIEW_STATUS_CONFIG = statusConfig;
