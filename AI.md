---
name: ww-breadcrumb
description: A customizable breadcrumbs navigation component that displays hierarchical path information with various styling options
keywords: breadcrumbs, navigation, path, hierarchy, trail, links
---

#### Breadcrumbs

Properties:
- `mode`: `'manual' | 'auto'` - Controls how breadcrumbs are generated. Default: `'manual'`
- `items`: `Array` - The array of breadcrumb items to display (used in manual mode). Default: `[{label: 'Home'}, {label: 'Products'}, {label: 'Category'}, {label: 'Current Page'}]`
- `labelPropertyPath`: `string` - The property path to use for item labels. Default: `'label'`
- `urlPropertyPath`: `string` - The property path to use for item URLs (hidden in auto mode). Default: `'url'`
- `iconPropertyPath`: `string` - The property path to use for item icons (SVG). Default: `'icon'`
- `initialValue`: `object` - The initially selected breadcrumb item. Default: `null`

Display Settings:
- `displayStyle`: `'standard' | 'pills' | 'arrows' | 'underline'` - The visual style of the breadcrumbs. Default: `'standard'`
- `separatorType`: `'slash' | 'arrow' | 'chevron' | 'dot' | 'pipe' | 'dash' | 'custom'` - The type of separator between items. Default: `'slash'`
- `customSeparator`: `string` - Custom separator text or HTML/SVG when separatorType is 'custom'. Default: `''`
- `collapse`: `boolean` - Whether to collapse the breadcrumbs. Default: `false`

Styling - Colors:
- `linkColor`: `string` - The color of breadcrumb links. Default: `'#0066cc'`
- `activeColor`: `string` - The color of the active/current breadcrumb item. Default: `'#333333'`
- `separatorColor`: `string` - The color of the separators between breadcrumb items. Default: `'#999999'`
- `iconColor`: `string` - The color of icons in breadcrumb items. Default: `'#666666'`
- `pillBackgroundColor`: `string` - The background color of pill-style breadcrumb items. Default: `'#f0f0f0'`
- `activePillBackgroundColor`: `string` - The background color of the active pill-style breadcrumb item. Default: `'#e0e0e0'`
- `arrowBackgroundColor`: `string` - The background color of arrow-style breadcrumb items. Default: `'#f0f0f0'`

Styling - Typography:
- `fontSize`: `string` - The font size for breadcrumb text. Default: `'14px'`
- `activeItemFontWeight`: `'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'` - The font weight for the active/current breadcrumb item. Default: `'bold'`
- `hoverDecoration`: `'none' | 'underline' | 'overline' | 'line-through'` - The text decoration for breadcrumb links on hover. Default: `'underline'`

Styling - Layout:
- `itemSpacing`: `string` - The spacing between breadcrumb items. Default: `'4px'`
- `separatorSpacing`: `string` - The spacing around separators. Default: `'8px'`
- `separatorSize`: `string` - The font size of separators. Default: `'14px'`
- `borderRadius`: `string` - The border radius of the breadcrumbs container. Default: `'0px'`

Children:
- `iconElement`: ww-icon - The icon element for each breadcrumb item. (Forced prop : color, icon)
- `textElement`: ww-text - The text element for each breadcrumb item. (Forced prop : text, link)
- `textElement`: ww-div - This is a wrapper element for the text element & icon.
SPECIAL: Each of these children are unique, but in the UI it will reuse the same element for all breadcrumb items. The purpose of those is to add style to the element.
Note : Icon is on the left, text is on the right. You should add spacing between them.

Events:
- `click`: {value: item, index: number} - Triggered when a breadcrumb item is clicked
- `change`: {value: item} - Triggered when the selected breadcrumb item changes
- `initValueChange`: {value: item} - Triggered when the initial value changes

Actions:
- `setSelectedItem`: Sets the selected breadcrumb item. Args: item (object)

Variables:
- `selectedItem`: object - The currently selected breadcrumb item


Example :
<elements>
{"uid":0,"tag":"ww-breadcrumb","props":{"default":{"mode":"manual","items":[{"link":{"href":"/","type":"external","targetBlank":false},"icon":"lucide/house","label":"Home"},{"icon":"lucide/layout-grid","label":"Products"},{"icon":"lucide/shopping-cart","link":{"type":"internal","pageId":"7f87c9a5-cd97-4365-a46c-255a47e04cc5","targetBlank":false},"label":"Category"},{"icon":"lucide/package","link":"/products/category/item","label":"Current Page"}],"fontSize":"14px","iconColor":"#6366F1","linkColor":"#4B5563","fontWeight":"500","activeColor":"#312E81","itemSpacing":"4px","borderRadius":"8px","displayStyle":"standard","showHomeIcon":true,"separatorSize":"14px","separatorType":"chevron","separatorColor":"#9CA3AF","customSeparator":"","hoverDecoration":"none","urlPropertyPath":"link","verticalPadding":"16px","iconPropertyPath":"icon","separatorSpacing":"8px","horizontalPadding":"24px","labelPropertyPath":"label","collapse":false,"pillBackgroundColor":"#f0f0f0","activeItemFontWeight":"600","arrowBackgroundColor":"#f0f0f0","activePillBackgroundColor":"#e0e0e0"}},"children":{"iconElement":{"uid":1},"linkElement":{"uid":2},"textElement":{"uid":3}}}
{"uid":1,"tag":"ww-icon"}
{"uid":2,"tag":"ww-div","styles":{"default":{"display":"flex","alignItems":"center"}}}
{"uid":3,"tag":"ww-text","props":{"default":{"tag":"p","text":"New text"}},"styles":{"default":{"margin":"0 10px"}}}
</elements>
