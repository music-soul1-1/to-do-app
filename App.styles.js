import { StyleSheet } from 'react-native';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme
} from 'react-native-paper';


const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  // default color:
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
  // custom:
  customColors: {
    "primary": "rgb(120, 69, 172)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(240, 219, 255)",
    "onPrimaryContainer": "rgb(44, 0, 81)",
    "secondary": "rgb(102, 90, 111)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(237, 221, 246)",
    "onSecondaryContainer": "rgb(33, 24, 42)",
    "tertiary": "rgb(128, 81, 88)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 217, 221)",
    "onTertiaryContainer": "rgb(50, 16, 23)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(29, 27, 30)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(29, 27, 30)",
    "surfaceVariant": "rgb(233, 223, 235)",
    "onSurfaceVariant": "rgb(74, 69, 78)",
    "outline": "rgb(124, 117, 126)",
    "outlineVariant": "rgb(204, 196, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(50, 47, 51)",
    "inverseOnSurface": "rgb(245, 239, 244)",
    "inversePrimary": "rgb(220, 184, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(248, 242, 251)",
      "level2": "rgb(244, 236, 248)",
      "level3": "rgb(240, 231, 246)",
      "level4": "rgb(239, 229, 245)",
      "level5": "rgb(236, 226, 243)"
    },
    "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
    "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
    "backdrop": "rgba(51, 47, 55, 0.4)"
  }
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  // default color:
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
  // custom:
  customColors: {
    "primary": "rgb(220, 184, 255)",
    "onPrimary": "rgb(71, 12, 122)",
    "primaryContainer": "rgb(95, 43, 146)",
    "onPrimaryContainer": "rgb(240, 219, 255)",
    "secondary": "rgb(208, 193, 218)",
    "onSecondary": "rgb(54, 44, 63)",
    "secondaryContainer": "rgb(77, 67, 87)",
    "onSecondaryContainer": "rgb(237, 221, 246)",
    "tertiary": "rgb(243, 183, 190)",
    "onTertiary": "rgb(75, 37, 43)",
    "tertiaryContainer": "rgb(101, 58, 65)",
    "onTertiaryContainer": "rgb(255, 217, 221)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(29, 27, 30)",
    "onBackground": "rgb(231, 225, 229)",
    "surface": "rgb(29, 27, 30)",
    "onSurface": "rgb(231, 225, 229)",
    "surfaceVariant": "rgb(74, 69, 78)",
    "onSurfaceVariant": "rgb(204, 196, 206)",
    "outline": "rgb(150, 142, 152)",
    "outlineVariant": "rgb(74, 69, 78)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(231, 225, 229)",
    "inverseOnSurface": "rgb(50, 47, 51)",
    "inversePrimary": "rgb(120, 69, 172)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(39, 35, 41)",
      "level2": "rgb(44, 40, 48)",
      "level3": "rgb(50, 44, 55)",
      "level4": "rgb(52, 46, 57)",
      "level5": "rgb(56, 49, 62)"
    },
    "surfaceDisabled": "rgba(231, 225, 229, 0.12)",
    "onSurfaceDisabled": "rgba(231, 225, 229, 0.38)",
    "backdrop": "rgba(51, 47, 55, 0.4)"
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    color: CombinedDefaultTheme.colors.primary,
  },
  darkIcon: {
    color: CombinedDarkTheme.colors.primary
  },
  tabBar: {
    height: 70,
    borderTopRightRadius: 10,
  },
  button: {
    light: {
      backgroundColor: CombinedDefaultTheme.colors.background
    },
    dark: {
      backgroundColor: CombinedDarkTheme.colors.background,
    },
  },
  labelStyle: {
    //color: "#fff",
  },
  text: {
    color: CombinedDefaultTheme.colors.primary,
  },
  textInput: {
    //position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: 300,
  },
  fab: {
    //position: 'absolute',
    right: 0,
    marginLeft: 15,
    bottom: 0,
  },
  addTaskContainer: {
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
    margin: 15,
    bottom: 0,
    right: 0,
  },
  flatList: {
    marginBottom: 90,
  },
  textField: {
    width: 300,
  },
  textFieldLight: {
    color: CombinedDefaultTheme.colors.text,
  },
  textFieldDark: {
    color: CombinedDarkTheme.colors.text,
  },
  comletedTask: {
    width: 260,
    light: {
      textDecorationLine: 'line-through',
      color: CombinedDefaultTheme.colors.border,
    },
    dark: {
      textDecorationLine: 'line-through',
      color: CombinedDarkTheme.colors.border,
    },
  },
  taskTextInput: {
    maxWidth: 280,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    light: {
      backgroundColor: CombinedDefaultTheme.colors.background,
    },
    dark: {
      backgroundColor: CombinedDarkTheme.colors.background,
    },
    backgroundColor: "transparent",
  },
  tasksContainer: {
    flexDirection: 'row',
      padding: 15,
      paddingRight: 5,
      alignItems: 'center',
      margin: 15,
      bottom: 0,
      borderRadius: 16,

    light: {
      backgroundColor: CombinedDefaultTheme.colors.card,
    },
    dark: {
      backgroundColor: CombinedDarkTheme.colors.backdrop,
    }
    
  },
});

export { styles }