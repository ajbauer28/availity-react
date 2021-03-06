# @availity/list-group-item

> List Group Item with some Availity flair

## Installation

```bash
npm install @availity/list-group-item --save
```

### Usage

```javascript
import React from 'react';
import ListGroup from '@availity/list-group';
import ListGroupItem, { ListGroupItemStatus } from '@availity/list-group-item';
// ...
<ListGroup>
    <ListGroupItem>Item</ListGroupItem>
    <ListGroupItemStatus>Item2</ListGroupItemStatus>
</ListGroup>;
// ...
```

#### ListGroupItem (Default export)

Availity's ListGroup which can feature Cards and Selectable items

##### Props

-   **`borderColor`**: String. Optional. Adds the border to the left according to the UIKit styles. Must be used within a <code>ListGroup</code> from <code>@availity/list-group</code> with the prop <code>cards</code> set to <code>true</code>
-   **`color`**: String. Optional. Adds a contextual background color to the item.
-   **`tag`**: The tag/component which this component outputs. Default `li`

##### ListGroup Usage

```javascript
import React from 'react';
import ListGroup from '@availity/list-group';
import ListGroupItem from '@availity/list-group-item';
// ...
<ListGroup cards>
  <ListGroupItem borderColor="success" color="success">Item</ListGroupItem>
  <ListGroupItem borderColor="info">Item</ListGroupItem>
  <ListGroupItem borderColor="warning">Item</ListGroupItem>
  <ListGroupItem borderColor="danger" color="warning">Item</ListGroupItem>
  <ListGroupItem borderColor="secondary">Item</ListGroupItem>
  <ListGroupItem>Item</ListGroupItem>
</ListGroup>

<ListGroup>
  <ListGroupItem color="success">Item</ListGroupItem>
  <ListGroupItem color="warning">Item</ListGroupItem>
  <ListGroupItem>Item</ListGroupItem>
</ListGroup>
// ...
```

#### ListGroupItemStatus

ListGroup with helpful logic for an optional status badge and relative colors for the card and badge.

##### Props

In addition to the props of `ListGroupItem`

-   **`titleContent`**: Node. Optional. Renders title on the same level as the badge if used.
-   **`color`**: String. Optional. Adds the border color and default badge color. Default `info`
-   **`Badge`** String/Object. Optional. String rendered in `color`, Object structure `{text, color}` using object color if defined instead of prop color.
