# @availity/feature

> Check environment features for the current environment to determine if a particular feature is enabled.

Note: Only works with OpenShift deployed applications using the standard pipeline

## Installation

```bash
npm install @availity/feature axios --save
```

### Usage

```javascript
import React from 'react';
import Feature from '@availity/feature';
// ...
<Feature features="1234">
    {/* stuff to render if the feature indicated above in enabled in the environment */}
</Feature>
// ...
```

#### Feature (Default export)

Component which validates the environment's features to determine if children content should be shown.

##### Feature Props

-   **`features`**: String, or an array containing strings or an array containing strings. Required.
    -   **string**: The feature ID, eg: `'AV-1234'`
    -   **array**: The array can contain feature ID strings as well as other arrays which contain feature ID strings, eg: `['AV-1234', 'AV-2345', ['AV-3456', 'AV-4567'], ['AV-5678', 'AV-6789']]`. The items in deep/nested array indicate feature IDs which must all be enabled for feature to be consider feature (see the `children`), they act as "and". The items in the top array act as 'or', if any are enabled the feature would be consider enabled. The example `['AV-1234', 'AV-2345', ['AV-3456', 'AV-4567'], ['AV-5678', 'AV-6789']]` would be similar `'AV-1234' || 'AV-2345' || ('AV-3456' && 'AV-4567') || ('AV-5678' && 'AV-6789')`
-   **`loader`**: Boolean or node. Optional, default: `true`. When `true`, `BlockUi` will be used when loading the features. When a `node`, that node will be render instead of `BlockUi` when loading the features. When `false`, nothing will be render when loading the features.
-   **`whenDisabled`**: Node. Optional. The content which will be render when the features are disabled.
-   **`children`**: Node. Required. The content which will be render when the features are enabled.
-   **`negate`**: Boolean. Optional, default `false`. negation the feature (if the features specified is enabled, it will act as if it was disabled (shown the `whenDisabled` prop content) and if the features specified is disabled, it will be "enabled" and able to see the children content)

##### Feature Usage

```javascript
import React from 'react';
import Feature from '@availity/feature';
// ...
<Feature
    features={[
        'AV-1234',
        'AV-2345',
        ['AV-3456', 'AV-4567'],
        ['AV-5678', 'AV-6789'],
    ]}
>
    {/* ... */}
</Feature>
// ...
```

#### `isFeatureEnabled(features)`

Function which which validates the environment's features to determine if children content should be shown.

##### isFeatureEnabled Arguments

`isFeatureEnabled(features)`

-   **`features`**: String, or an array containing strings or an array containing strings. Required.
    -   **string**: The feature ID, eg: `'AV-1234'`
    -   **array**: The array can contain feature ID strings as well as other arrays which contain feature ID strings, eg: `['AV-1234', 'AV-2345', ['AV-3456', 'AV-4567'], ['AV-5678', 'AV-6789']]`. The items in deep/nested array indicate feature IDs which must all be enabled for feature to be consider feature (see the `children`), they act as "and". The items in the top array act as 'or', if any are enabled the feature would be consider enabled. The example `['AV-1234', 'AV-2345', ['AV-3456', 'AV-4567'], ['AV-5678', 'AV-6789']]` would be similar `'AV-1234' || 'AV-2345' || ('AV-3456' && 'AV-4567') || ('AV-5678' && 'AV-6789')`

##### Returns

A promise which can be awaited and resolves to `true` or `false` indicating whether the feature(s) are enabled or not;

##### isFeatureEnabled Usage

```javascript
import { isFeatureEnabled } from '@availity/feature';

async () => {
    const enabled = await isFeatureEnabled('AV-1234');
    if (!enabled) return;
    // do stuff, this feature is enabled!
};
```

#### `generate-features-json [path-to-features.json] [path-to-build-dist]` (CLI)

`generate-features-json` is a CLI tool which takes a `features.json` file and outputs environment specific `features.json` files to be used depending on which environment it's currently in. Note: This is where OpenShift comes into play. OpenShift will ensure the right file (based on the ENV) is placed in the right location when the pod starts.

##### generate-features-json Arguments

- **`path-to-features.json`**: Directory path or file location. Optional, default: `project/config/features.json`. If a directory path, a `features.json` file must exist in the directory. If a file location, it must be a `.json` file. Note: Follow the example `features.json` file for what the contents of the file should be.
- **`path-to-build-dist`**: Directory path: Optional, default: if `NODE_ENV` is "production" `dist/features`, else `build/features`. The location in which the various environment specific JSON files will be output. Note: OpenShift is looking for the `features` directory in the web root of the image, so if this value is changed, ensure that the resulting image has the `features` directory.

##### generate-features-json Usage

```bash
generate-features-json
generate-features-json ./features.json
generate-features-json other-path dist/features
```

###### As npm script

```json
{
  "scripts": {
    "build": "av build && generate-features-json"
  }
}
```

with extra parameters

```json
{
  "scripts": {
    "build": "av build && generate-features-json ./features.json"
  }
}
```

##### features.json

The `features.json` file is a single file which details "features" and the environments in which each feature is **disabled** in. Typically the name of the feature is the JIRA ticket number which the feature was developed for. This helps identify what the feature does by just knowing the name.
Possible `disabledEnvironments` values are `"DEV"`, `"STAGE"`, and `"PRD"`. These values line up with the `ENV` environment variable within OpenShift.

```json
[
  {
    "name": "PREC-4597",
    "description": "https://jira.availity.com:8443/browse/PREC-4597",
    "disabledEnvironments": ["PRD"]
  },
  {
    "name": "CB-675",
    "description": "https://jira.availity.com:8443/browse/PREC-4597",
    "disabledEnvironments": ["STAGE","PRD"]
  }
]
```

The environment specific features.json files which gets generated will be a simple array of disabled feature names. The above example would produce a `PRD.json` with `["PREC-4597", "CB-675"]` and `STAGE.json` with `["CB-675"]`.

Enabling and disabling features does require a deployment, but with the OpenShift CI/CD process, that _should_ be painless.