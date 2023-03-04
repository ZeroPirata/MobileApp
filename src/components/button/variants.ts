/* XML XX X P S */
/* Botão Cheio*/
/* Botão OutLine */
/* Botão Transparente */
/* Botão apenas com icone */

import { RFValue } from "react-native-responsive-fontsize";
import themes from "../../styles/themes";

interface ButtonStyle {
  button: {
    backgroundGradiant?: string;
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    width?: number;
    height?: number;
  };

  title: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
  };
  icon: {
    color?: string;
    size?: number;
  };
}

export interface ButtonVariant {
  enabled: ButtonStyle;
  disabled: ButtonStyle;
}

const LargeButtonGoldBorded: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD2,
      borderColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      borderWidth: RFValue(5),
      height: RFValue(90),
      width: RFValue(350),
    },
    title: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(50),
    },
    icon: {
      color: themes.COLORS.BLACK,
      size: RFValue(35),
    },
  },
  disabled: {
    button: {
      backgroundColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD2,
      borderColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      borderWidth: RFValue(5),
      height: RFValue(90),
      width: RFValue(350),
    },
    title: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(50),
    },
    icon: {
      color: themes.COLORS.BLACK,
      size: RFValue(45),
    },
  },
};
const MediumButtonGoldBorded: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD2,
      borderColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      borderWidth: RFValue(5),
      width: RFValue(300),
      height: RFValue(80),
    },
    icon: {
      color: themes.COLORS.BLACK,
      size: RFValue(45),
    },
    title: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(45),
    },
  },
  disabled: {
    button: {
      backgroundColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD2,
      borderColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      borderWidth: RFValue(5),
      width: RFValue(300),
      height: RFValue(80),
    },
    icon: {
      color: themes.COLORS.BLACK,
      size: RFValue(45),
    },
    title: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(45),
    },
  },
};
const NormalButtonGoldBorded: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD2,
      borderColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      borderWidth: RFValue(5),
      width: RFValue(250),
      height: RFValue(75),
    },
    icon: {
      color: themes.COLORS.BLACK,
      size: RFValue(40),
    },
    title: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(40),
    },
  },
  disabled: {
    button: {
      backgroundColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD2,
      borderColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      borderWidth: RFValue(5),
      width: RFValue(250),
      height: RFValue(75),
    },
    icon: {
      color: themes.COLORS.BLACK,
      size: RFValue(40),
    },
    title: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(40),
    },
  },
};
const SmallButtonGoldBorded: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD2,
      borderColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      borderWidth: RFValue(4),
      width: RFValue(200),
      height: RFValue(65),
    },
    icon: { color: themes.COLORS.BLACK, size: RFValue(35) },
    title: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(35),
    },
  },
  disabled: {
    button: {
      backgroundColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD2,
      borderColor: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      borderWidth: RFValue(4),
      width: RFValue(200),
      height: RFValue(65),
    },
    icon: { color: themes.COLORS.BLACK, size: RFValue(35) },
    title: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(35),
    },
  },
};

const LargeIconButton: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      width: RFValue(120),
      height: RFValue(100),
    },
    title: {},
    icon: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      size: RFValue(100),
    },
  },
  disabled: {
    button: {},
    title: {},
    icon: {},
  },
};
const MediumIconButton: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      width: RFValue(100),
      height: RFValue(80),
    },
    icon: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      size: RFValue(80),
    },
    title: {},
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      width: RFValue(100),
      height: RFValue(80),
    },
    icon: {
      color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5,
      size: RFValue(80),
    },
    title: {},
  },
};
const NormalIconButton: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      width: RFValue(80),
      height: RFValue(60),
    },
    icon: { color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5, size: RFValue(60) },
    title: {},
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      width: RFValue(80),
      height: RFValue(60),
    },
    icon: { color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5, size: RFValue(60) },
    title: {},
  },
};
const SmallIconButton: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      width: RFValue(60),
      height: RFValue(40),
    },
    icon: { color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5, size: RFValue(40) },
    title: {},
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      width: RFValue(60),
      height: RFValue(40),
    },
    icon: { color: themes.COLORS.TEXT_and_BACKGROUND.GRAY5, size: RFValue(40) },
    title: {},
  },
};

const LargeButtonOutLine: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      borderWidth: RFValue(3),
      height: RFValue(90),
      width: RFValue(350),
    },
    title: {
      color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(50),
    },
    icon: { color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3, size: RFValue(50) },
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      borderWidth: RFValue(3),
      height: RFValue(90),
      width: RFValue(350),
    },
    title: {
      color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(50),
    },
    icon: { color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3, size: RFValue(50) },
  },
};
const MediumButtonOutLine: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      borderWidth: RFValue(3),
      height: RFValue(80),
      width: RFValue(250),
    },
    title: {
      color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(45),
    },
    icon: { color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3, size: RFValue(45) },
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      borderWidth: RFValue(5),
      height: RFValue(90),
      width: RFValue(250),
    },
    title: {
      color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(45),
    },
    icon: { color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3, size: RFValue(45) },
  },
};
const NormalButtonOutLine: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      borderWidth: RFValue(3),
      height: RFValue(75),
      width: RFValue(200),
    },
    title: {
      color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(40),
    },
    icon: { color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3, size: RFValue(40) },
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      borderWidth: RFValue(5),
      height: RFValue(75),
      width: RFValue(200),
    },
    title: {
      color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(40),
    },
    icon: { color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3, size: RFValue(40) },
  },
};
const SmallButtonOutLine: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      borderWidth: RFValue(3),
      height: RFValue(65),
      width: RFValue(150),
    },
    title: {
      color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(35),
    },
    icon: { color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3, size: RFValue(35) },
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      borderColor: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      borderWidth: RFValue(5),
      height: RFValue(90),
      width: RFValue(350),
    },
    title: {
      color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3,
      fontFamily: themes.FONTS.SignikaNegative_700Bold,
      fontSize: RFValue(50),
    },
    icon: { color: themes.COLORS.HEXTECH_METAL_GOLD.GOLD3, size: RFValue(50) },
  },
};

const none = {
  enabled: {
    button: {},
    title: {},
    icon: {},
  },
  disabled: {
    button: {},
    title: {},
    icon: {},
  },
};

export const variants = {
  LargeButtonGoldBorded: LargeButtonGoldBorded,
  NormalButtonGoldBorded: NormalButtonGoldBorded,
  MediumButtonGoldBorded: MediumButtonGoldBorded,
  SmallButtonGoldBorded: SmallButtonGoldBorded,
  NormalIconButton: NormalIconButton,
  MediumIconButton: MediumIconButton,
  SmallIconButton: SmallIconButton,
  LargeIconButton: LargeIconButton,
  LargeButtonOutLine: LargeButtonOutLine,
  NormalButtonOutLine: NormalButtonOutLine,
  MediumButtonOutLine: MediumButtonOutLine,
  SmallButtonOutLine: SmallButtonOutLine,
  none: none,
};
export { ButtonStyle }