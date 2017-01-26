# Reasons

*Reasons* is a web-based argument mapping tool designed to work in all modern (HTML5) browsers.  Once you add *Reasons* to any web page, you will be able to generate a HTML5 argument map from premises and conclusions highlighted in the page text.

See the [example](example) *Reasons* in action


## Mapper UX

*Reasons* is currently in early prototyping and not yet ready for prime time :(

The basic functionality can be broken down into three key parts

### Highlighter

  - [x] embed as a library in any web page
  - [x] highlight text on the page
  - [x] create tool tip menu on highlight
  - [] decide which icon-actions should be available
  - [x] add text to session storage on icon click 
  - [x] remove tool tip from highligher once clicked
  - [x] option to generate argument map then appears

### Mapper

  - [x] create reasons from session data
  - [x] provide map & session reset button
  - [x] dynamically size reason based on text length
  - [x] allocate reasons to default position
  - [x] double click canvas to create a reason
  - [] right click to create a reason
  - [] click a reason to edit it
  - [] right click a reason edit it
  - [x] reason:hover indication
  - [x] drag reason to create relation
  - [] decide on what types of relations should be included
  - [] click a relation to edit it
  - [] relation:hover indication
  - [] automatically reposition reasons after event

### Scaffolder

  - [] add navigation to generate essay outline 
  - [] generate essay outline based on reasons

### Other

  - [] extract styles into separate CSS
  - [] add tests once concept is stable