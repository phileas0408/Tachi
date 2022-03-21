import { BotConfig } from "../config";
import { DateTime } from "luxon";
import { integer } from "tachi-common";

/**
 * Random From Array - Selects a random value from an array.
 */
export function RFA<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function TruncateString(string: string, len = 30) {
	if (string.length < len) {
		return string;
	}

	return `${string.substring(0, len - 3)}...`;
}

/**
 * Checks whether a discord user has admin permissions or not. This lets them do
 * slightly more destructive things.
 */
export function IsAdmin(discordID: string) {
	return BotConfig.DISCORD.ADMIN_USERS.includes(discordID);
}

export function FormatDate(ms: number) {
	return DateTime.fromMillis(ms).toLocaleString(DateTime.DATE_HUGE);
}

export function Sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
}

export function Pluralise(int: integer, str: string) {
	if (int === 1) {
		return str;
	}

	return `${str}s`;
}
