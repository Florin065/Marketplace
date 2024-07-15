interface ImportMeta {
    glob<T = unknown>(pattern: string, options?: { import?: string, eager?: boolean }): Record<string, T>;
}