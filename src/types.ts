import type { ClientEvents } from "discord.js";
import type { GiveawayEvents } from "prizebox";

export type DiscordEvents = keyof ClientEvents;
export type PrizeboxEvents = keyof GiveawayEvents;

export type AllEvents = DiscordEvents | PrizeboxEvents;

export type EventTargets = "client" | "giveaway";

export interface BaseEvent<K extends AllEvents = AllEvents> {
  name: K;
  target: EventTargets;
  once?: boolean;
  execute: (...args: any[]) => void | Promise<void>;
}
