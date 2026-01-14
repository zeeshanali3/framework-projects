# Grids Component

The `Grids` component is a reusable, customizable card-based grid system built using Material UI components. It displays data in a grid format and includes optional action buttons, checkboxes, and customizable headers.

## Features

- Displays a grid of data using Material UI's `Grid` and `Card` components.
- Optional buttons for actions like "View Details" with customizable colors and variants.
- Long press and double-click functionality to enable checkboxes.
- Dynamic headers: can display images and important fields in the card header.
- Supports an optional `ActionButtons` component that accepts props for adding buttons with icons and functions.

## Installation

Ensure you have Material UI installed in your project. If not, install it using:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

Copy the `Grids` component into your project and use it as outlined below.

## Usage

### Basic Example

```jsx
import React from "react";
import Grids from "./Grids";

const App = () => {
  return (
    <Grids
      Incomingdata={[
        {
          ComponentID: 1,
          Name: "Component A",
          Score: 85,
          Date: "Some Date",
          image: "https://www.w3schools.com/images/w3schools_green.jpg",
          Category: "Category",
        },
        {
          ComponentID: 2,
          Name: "Component B",
          Score: 90,
          Date: "Some Date",
          image: "https://www.w3schools.com/images/w3schools_green.jpg",
          Category: "Category",
        },
        {
          ComponentID: 3,
          Name: "Component C",
          Score: 75,
          Date: "Some Date",
          image: "https://www.w3schools.com/images/w3schools_green.jpg",
          Category: "Category",
        },
      ]}
      headers={[
        {
          field: "image",
          headerName: "Image",
          width: 90,
          visible: true,
          important: true,
          isImage: true,
        },
        {
          field: "ComponentID",
          headerName: "Component ID",
          width: 90,
          visible: true,
          important: true,
        },
        {
          field: "Name",
          headerName: "Name",
          width: 150,
          visible: true,
          important: true,
        },
        {
          field: "Score",
          headerName: "Score",
          width: 110,
          visible: true,
          important: false,
        },
        {
          field: "Date",
          headerName: "Date",
          width: 130,
          visible: true,
          important: false,
        },
      ]}
      buttonEnable={true}
      buttonColor="primary"
      buttonVarient="outlined"
      actionButtons={true}
      checkBoxEnable={true}
      headColor="#e5e5e5"
      headTextColor="black"
    />
  );
};

export default App;
```

### Props

| Prop Name        | Type      | Default       | Description                                                                           |
| ---------------- | --------- | ------------- | ------------------------------------------------------------------------------------- |
| `Incomingdata`   | `array`   | **Required**  | Array of data objects, each representing a row in the grid.                           |
| `headers`        | `array`   | **Required**  | Array of header configuration objects defining how each field is displayed.           |
| `buttonEnable`   | `boolean` | `false`       | Enables the "View Details" button on each card.                                       |
| `buttonColor`    | `string`  | `"secondary"` | Color of the button, e.g., `"primary"`, `"secondary"`, `"error"`.                     |
| `buttonVarient`  | `string`  | `"contained"` | Variant of the button, e.g., `"text"`, `"outlined"`, `"contained"`.                   |
| `actionButtons`  | `boolean` | `true`        | Displays action buttons on each card. The `ActionButtons` component must be provided. |
| `checkBoxEnable` | `boolean` | `false`       | Enables checkboxes for the grid rows.                                                 |
| `headColor`      | `string`  | `#e5e5e5`     | Background color for the card headers.                                                |
| `headTextColor`  | `string`  | `black`       | Text color for the card headers.                                                      |

### Data Structure

#### Incomingdata

Each item in the `Incomingdata` array is an object that contains the data for a single card. The fields should correspond to the `field` values provided in the `headers` prop. Example:

```javascript
Incomingdata = [
  {
    ComponentID: 1,
    Name: "Component A",
    Score: 85,
    Date: "Some Date",
    image: "https://www.w3schools.com/images/w3schools_green.jpg",
    Category: "Category",
  },
  // Additional data objects...
];
```

#### Headers

Each header object configures how a particular field in `Incomingdata` is displayed. It can be marked as `important`, `visible`, and can specify whether it is an image. Example:

```javascript
headers = [
  {
    field: "image",
    headerName: "Image",
    isImage: true,
    visible: true,
    important: true,
  },
  {
    field: "Name",
    headerName: "Name",
    visible: true,
    important: true,
  },
  // Additional header configurations...
];
```

### ActionButtons Component

The `ActionButtons` component is expected to accept props for rendering buttons with icons and specific functions. You can customize the buttons for each card by passing different props to this component.

Example of `ActionButtons` component:

### Event Listeners

- **Long Press**: Holding down on a card for 1 second will trigger the checkboxes if `checkBoxEnable` is set to true.
- **Double Click**: Double-clicking a card will toggle the checkboxes.
