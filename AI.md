---
name: breadcrumbs
description: A customizable breadcrumbs navigation component that displays hierarchical path information with various styling options
keywords: breadcrumbs, navigation, path, hierarchy, trail, links
---

#### Breadcrumbs

Properties:
- `mode`: `'manual' | 'auto'` - Controls how breadcrumbs are generated. Default: `'manual'`
- `items`: `Array` - The array of breadcrumb items to display (used in manual mode). Default: `[{label: 'Home', url: '/', icon: '<svg>...</svg>'}, {label: 'Products'}, {label: 'Category'}, {label: 'Current Page'}]`
- `labelPropertyPath`: `string` - The property path to use for item labels. Default: `'label'`
- `urlPropertyPath`: `string` - The property path to use for item URLs (hidden in auto mode). Default: `'url'`
- `iconPropertyPath`: `string` - The property path to use for item icons (SVG). Default: `'icon'`
- `initialValue`: `object` - The initially selected breadcrumb item. Default: `null`

Display Settings:
- `displayStyle`: `'standard' | 'pills' | 'arrows' | 'underline'` - The visual style of the breadcrumbs. Default: `'standard'`
- `separatorType`: `'slash' | 'arrow' | 'chevron' | 'dot' | 'pipe' | 'dash' | 'custom'` - The type of separator between items. Default: `'slash'`
- `customSeparator`: `string` - Custom separator text or HTML/SVG when separatorType is 'custom'. Default: `''`
- `showHomeIcon`: `boolean` - Whether to show a home icon for the first item. Default: `true`
- `disableLastItemLink`: `boolean` - Whether to disable the link for the last (current) item. Default: `true`
- `responsiveCollapse`: `boolean` - Whether to collapse the breadcrumbs on mobile devices. Default: `false`

Styling - Colors:
- `linkColor`: `string` - The color of breadcrumb links. Default: `'#0066cc'`
- `activeColor`: `string` - The color of the active/current breadcrumb item. Default: `'#333333'`
- `separatorColor`: `string` - The color of the separators between breadcrumb items. Default: `'#999999'`
- `iconColor`: `string` - The color of icons in breadcrumb items. Default: `'#666666'`
- `pillBackgroundColor`: `string` - The background color of pill-style breadcrumb items. Default: `'#f0f0f0'`
- `activePillBackgroundColor`: `string` - The background color of the active pill-style breadcrumb item. Default: `'#e0e0e0'`
- `arrowBackgroundColor`: `string` - The background color of arrow-style breadcrumb items. Default: `'#f0f0f0'`

Styling - Typography:
- `fontFamily`: `string` - The font family for breadcrumb text. Default: `null`
- `fontSize`: `string` - The font size for breadcrumb text. Default: `'14px'`
- `fontWeight`: `'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'` - The font weight for breadcrumb text. Default: `'normal'`
- `activeItemFontWeight`: `'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'` - The font weight for the active/current breadcrumb item. Default: `'bold'`
- `hoverDecoration`: `'none' | 'underline' | 'overline' | 'line-through'` - The text decoration for breadcrumb links on hover. Default: `'underline'`

Styling - Layout:
- `horizontalPadding`: `string` - The horizontal padding of the breadcrumbs container. Default: `'0px'`
- `verticalPadding`: `string` - The vertical padding of the breadcrumbs container. Default: `'8px'`
- `itemSpacing`: `string` - The spacing between breadcrumb items. Default: `'4px'`
- `separatorSpacing`: `string` - The spacing around separators. Default: `'8px'`
- `separatorSize`: `string` - The font size of separators. Default: `'14px'`
- `borderRadius`: `string` - The border radius of the breadcrumbs container. Default: `'0px'`

Events:
- `click`: {value: item, index: number} - Triggered when a breadcrumb item is clicked
- `change`: {value: item} - Triggered when the selected breadcrumb item changes
- `initValueChange`: {value: item} - Triggered when the initial value changes

Actions:
- `setSelectedItem`: Sets the selected breadcrumb item. Args: item (object)

Variables:
- `selectedItem`: object - The currently selected breadcrumb item

Special features:
- Multiple visual styles (standard, pills, arrows, underline)
- Customizable separators including custom HTML/SVG
- Responsive collapsing for mobile devices
- Home icon option for the first item
- Ability to disable the last item link
- Dynamic property path selection for flexible data binding
- Auto mode that generates breadcrumbs based on the current page URL path
