import type { ExtensionContext } from "@earendil-works/pi-coding-agent";

interface SessionModeContext {
	hasUI: ExtensionContext["hasUI"];
	mode?: ExtensionContext["mode"];
}

/** Return whether Pi can wake this session after the current agent turn ends. */
export function supportsDeferredWake(ctx: SessionModeContext): boolean {
	if (ctx.mode === "tui" || ctx.mode === "rpc") return true;
	if (ctx.mode === "print" || ctx.mode === "json") return false;
	return ctx.hasUI;
}

/** Return whether the current process must drain child work before its turn ends. */
export function requiresHeadlessDrain(ctx: SessionModeContext): boolean {
	return !supportsDeferredWake(ctx);
}
