import { vi } from "vitest";
vi.mock("../src/ts/constants/env-config", () => ({
  envConfig: {
    backendUrl: "invalid",
    scriptureApiUrl: "http://localhost:8080",
    isDevelopment: true,
    clientVersion: "TEST",
    recaptchaSiteKey: "test",
    quickLoginEmail: undefined,
    quickLoginPassword: undefined,
  },
}));
