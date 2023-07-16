module.exports = function(api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "nativewind/babel",
            "transform-inline-environment-variables",
            [
                "module-resolver",
                {
                    root: ["./src"],
                    alias: {
                        "^@ui": "./src/components/ui",
                        "^@context": "./src/context",
                        "^@utils": "./src/utils",
                        "^@api": "./src/api",
                        "^@api/(.*)": "./src/api/\\1",
                        "^@screens/(.*)": "./src/screens/\\1",
                        "^@assets/(.*)": "./src/assets/\\1",
                        "^@components/(.*)": "./src/components/\\1",
                    },
                },
            ],
        ],
    };
};
