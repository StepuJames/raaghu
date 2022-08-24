const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
    path.join(__dirname, '../../tsconfig.json'),
    ['@libs/rds-elements','@libs/shared','@libs/state-management','@libs/rds-icon','@libs/rds-badge','@libs/rds-icon-label','@libs/rds-select-list','@libs/rds-label','@libs/rds-avatar','@libs/rds-like-dislike','@libs/rds-rating','@libs/rds-checkbox','@libs/rds-radio-button','@libs/rds-button','@libs/rds-big-number-widget']);

module.exports = {
    output: {
        uniqueName: "product",
        publicPath: "auto"
    },
    optimization: {
        runtimeChunk: false
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases(),
        }
    },
    experiments: {
        outputModule: true
    },
    plugins: [
        new ModuleFederationPlugin({
            library: { type: "module" },

            name: "contact-us",
            filename: "remoteEntry.js",
            exposes: {
                './AppModule': './projects/contact-us/src/app/app.module.ts',
            },


            shared: share({
                "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@ngrx/store": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "@ngrx/store-devtools": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                "rxjs": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
                ...sharedMappings.getDescriptors()
            })

        }),
        sharedMappings.getPlugin()
    ],
};