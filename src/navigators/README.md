# Navigation

### [Back to main README](../../README.md)

The navigation work as described in the diagram below.

<img src="../../assets/doc-images/Pelops_navigation_back.png"/>

When adding a new screen, don't forget to register its type in the [Navigator types](./navigator.types.tsx).

## App navigator

[App navigator](https://github.com/Kaherdin/pelops-mobile/blob/develop/src/navigators/app-navigator.tsx) is the main navigator of the application. It contains the [bottom navigator](https://github.com/Kaherdin/pelops-mobile/blob/develop/src/navigators/README.md#bottom-navigation) as well as screens that are to be displayed above it such as the activity information screen and activity creation screen.

## Bottom navigation

All the screens that are to be acessed from the bottom navigator are contained in the file [bottom-tabs.tsx](https://github.com/Kaherdin/pelops-mobile/blob/develop/src/navigators/bottom-menu/bottom-tabs.ts).
[bottom-menu.tsx](https://github.com/Kaherdin/pelops-mobile/blob/develop/src/navigators/bottom-menu/bottom-menu.tsx) is a mapping of those so any addition is to be made to the first file. The last file, [bottom-tab-btn](https://github.com/Kaherdin/pelops-mobile/blob/develop/src/navigators/bottom-menu/bottom-tab-btn.tsx) handles the styling for the custom tabs used for the bottom tabs navigator.
