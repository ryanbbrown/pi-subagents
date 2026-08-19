import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { requiresHeadlessDrain, supportsDeferredWake } from "../../src/runs/background/session-mode.ts";

describe("session completion mode", () => {
	it("keeps RPC sessions wakeable without a local UI", () => {
		const ctx = { mode: "rpc", hasUI: false } as const;

		assert.equal(supportsDeferredWake(ctx), true);
		assert.equal(requiresHeadlessDrain(ctx), false);
	});

	it("keeps TUI sessions wakeable", () => {
		const ctx = { mode: "tui", hasUI: true } as const;

		assert.equal(supportsDeferredWake(ctx), true);
		assert.equal(requiresHeadlessDrain(ctx), false);
	});

	it("drains print and JSON sessions before exit", () => {
		for (const mode of ["print", "json"] as const) {
			const ctx = { mode, hasUI: false } as const;
			assert.equal(supportsDeferredWake(ctx), false);
			assert.equal(requiresHeadlessDrain(ctx), true);
		}
	});

	it("uses an injected UI when an older host omits the mode", () => {
		const ctx = { hasUI: true } as const;

		assert.equal(supportsDeferredWake(ctx), true);
		assert.equal(requiresHeadlessDrain(ctx), false);
	});
});
